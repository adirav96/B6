import { spawn } from 'child_process';
import os from 'os';

const JUDGE0_URL = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const PYTHON3_LANGUAGE_ID = 71;
const EXECUTION_TIMEOUT_MS = 10000;
const MAX_OUTPUT_BYTES = 1024 * 1024; // kill runaway print loops before they eat server memory
const RESULTS_MARKER = '__TEST_RESULTS__';

// user code must not see the server's secrets (Firebase creds, JWT secret,
// API keys) — hand the interpreter only what it needs to start
function safeEnv() {
  const env = {
    PATH: process.env.PATH,
    SYSTEMROOT: process.env.SYSTEMROOT || process.env.SystemRoot,
    TEMP: process.env.TEMP,
    TMP: process.env.TMP,
    PYTHONIOENCODING: 'utf-8',
  };
  return Object.fromEntries(Object.entries(env).filter(([, v]) => v !== undefined));
}

// test cases travel as base64 so no combination of quotes/backslashes in the
// data can break out of the Python string literal
function buildHarness(code, testCases, functionName) {
  const encodedTests = Buffer.from(JSON.stringify(testCases), 'utf8').toString('base64');
  return `from __future__ import annotations
${code}

import json as _json
import base64 as _b64
_test_cases = _json.loads(_b64.b64decode("${encodedTests}").decode("utf-8"))
_results = []
for _i, _tc in enumerate(_test_cases):
    try:
        _result = ${functionName}(*_tc["inputs"])
        _passed = _result == _tc["expected"]
        _results.append({"id": _i, "passed": _passed, "actual": repr(_result), "expected": repr(_tc["expected"]), "inputs": repr(_tc["inputs"])})
    except Exception as _e:
        _results.append({"id": _i, "passed": False, "error": str(_e), "expected": repr(_tc["expected"]), "inputs": repr(_tc["inputs"])})
print("${RESULTS_MARKER}" + _json.dumps(_results))
`;
}

function parseResults(stdout, stderr) {
  // lastIndexOf so user code can't spoof results by printing the marker itself
  const markerIndex = stdout.lastIndexOf(RESULTS_MARKER);

  if (markerIndex === -1) {
    return {
      success: false,
      results: [],
      stdout,
      stderr: stderr || 'No test results produced. The code may contain a syntax error.',
    };
  }

  try {
    const jsonStr = stdout.substring(markerIndex + RESULTS_MARKER.length).trim();
    const userOutput = stdout.substring(0, markerIndex).trim();
    const results = JSON.parse(jsonStr);
    return { success: results.every((r) => r.passed), results, stdout: userOutput, stderr };
  } catch {
    return { success: false, results: [], stdout, stderr: stderr || 'Failed to parse test results.' };
  }
}

function runPython(command, wrappedCode) {
  return new Promise((resolve, reject) => {
    // -I = isolated mode: ignores PYTHON* env vars, user site-packages, and
    // doesn't put the script dir on sys.path. cwd is the OS temp dir so
    // relative reads like open('.env') can't reach the server's files.
    const child = spawn(command, ['-I', '-c', wrappedCode], {
      cwd: os.tmpdir(),
      env: safeEnv(),
      windowsHide: true,
    });
    let stdout = '';
    let stderr = '';
    let settled = false;

    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      fn(value);
    };

    const timer = setTimeout(() => {
      child.kill('SIGKILL');
      const err = new Error('Execution timed out');
      err.code = 'TIMEOUT';
      finish(reject, err);
    }, EXECUTION_TIMEOUT_MS);

    child.stdout.on('data', (d) => {
      stdout += d.toString();
      if (stdout.length > MAX_OUTPUT_BYTES) child.kill('SIGKILL');
    });
    child.stderr.on('data', (d) => {
      stderr += d.toString();
      if (stderr.length > MAX_OUTPUT_BYTES) child.kill('SIGKILL');
    });
    child.on('error', (err) => finish(reject, err));
    child.on('close', () => finish(resolve, { stdout, stderr }));
  });
}

// fallback when no python interpreter exists on the host
async function runJudge0(wrappedCode) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(JUDGE0_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source_code: wrappedCode, language_id: PYTHON3_LANGUAGE_ID }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Judge0 returned ${response.status}`);

    const data = await response.json();
    const stdout = data.stdout || '';
    const stderr = data.stderr || data.compile_output || '';

    // status id 3 = Accepted (ran to completion)
    if (data.status?.id !== 3 && !stdout) {
      return {
        success: false,
        results: [],
        stdout: '',
        stderr: stderr || data.status?.description || 'Execution error',
      };
    }
    return parseResults(stdout, stderr);
  } finally {
    clearTimeout(timeoutId);
  }
}

export function isValidFunctionName(functionName) {
  return typeof functionName === 'string' && /^[A-Za-z_][A-Za-z0-9_]*$/.test(functionName);
}

/**
 * Run user code against test cases: local python, then python3, then Judge0.
 * Resolves to { success, results, stdout, stderr }.
 * Rejects with err.code 'TIMEOUT' or 'UNAVAILABLE'.
 */
export async function executeTests(code, testCases, functionName) {
  const wrappedCode = buildHarness(code, testCases, functionName);

  for (const command of ['python', 'python3']) {
    try {
      const { stdout, stderr } = await runPython(command, wrappedCode);
      return parseResults(stdout, stderr);
    } catch (err) {
      if (err.code === 'TIMEOUT') throw err;
      if (err.code !== 'ENOENT') throw err;
      // interpreter not found under this name — try the next option
    }
  }

  try {
    return await runJudge0(wrappedCode);
  } catch (judgeErr) {
    console.error('Judge0 fallback error:', judgeErr.message);
    const err = new Error('Code execution is unavailable right now — please try again later');
    err.code = 'UNAVAILABLE';
    throw err;
  }
}
