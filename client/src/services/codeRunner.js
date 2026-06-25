import { getToken } from './api.js';

const JUDGE0_URL = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const PYTHON3_LANGUAGE_ID = 71;

function buildHarness(code, testCases, functionName) {
  const testCasesJson = JSON.stringify(testCases);
  return `from __future__ import annotations
${code}

import json as _json
_test_cases = _json.loads("""${testCasesJson}""")
_results = []
for _i, _tc in enumerate(_test_cases):
    try:
        _result = ${functionName}(*_tc["inputs"])
        _passed = _result == _tc["expected"]
        _results.append({"id": _i, "passed": _passed, "actual": repr(_result), "expected": repr(_tc["expected"]), "inputs": repr(_tc["inputs"])})
    except Exception as _e:
        _results.append({"id": _i, "passed": False, "error": str(_e), "expected": repr(_tc["expected"]), "inputs": repr(_tc["inputs"])})
print("__TEST_RESULTS__" + _json.dumps(_results))
`;
}

function parseResults(stdout, stderr, testCases) {
  const marker = '__TEST_RESULTS__';
  // lastIndexOf so user can't spoof results by printing the marker themselves
  const markerIndex = stdout.lastIndexOf(marker);

  if (markerIndex === -1) {
    return {
      success: false,
      results: [],
      stdout,
      stderr: stderr || 'No test results produced. The code may contain a syntax error.',
    };
  }

  const jsonStr = stdout.substring(markerIndex + marker.length).trim();
  const userOutput = stdout.substring(0, markerIndex).trim();
  const results = JSON.parse(jsonStr);
  return { success: results.every((r) => r.passed), results, stdout: userOutput, stderr };
}

// try local server first — faster, no rate limits, real CPython
async function runLocal(code, testCases, functionName) {
  const token = getToken();
  const res = await fetch('/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ code, testCases, functionName }),
  });
  if (res.status === 503) throw new Error('LOCAL_UNAVAILABLE');
  if (!res.ok) throw new Error('LOCAL_ERROR');
  return res.json();
}

// fallback: Judge0 public API
async function runJudge0(code, testCases, functionName) {
  const wrappedCode = buildHarness(code, testCases, functionName);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(JUDGE0_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source_code: wrappedCode, language_id: PYTHON3_LANGUAGE_ID }),
    signal: controller.signal,
  });
  clearTimeout(timeoutId);

  if (!response.ok) throw new Error(`Judge0 returned ${response.status}`);

  const data = await response.json();
  const stdout = data.stdout || '';
  const stderr = data.stderr || data.compile_output || '';

  if (data.status?.id !== 3 && !stdout) {
    const errorMsg = data.status?.description || 'Execution error';
    return {
      success: false,
      results: testCases.map((tc, i) => ({ id: i, passed: false, error: stderr || errorMsg, expected: String(tc.expected), inputs: String(tc.inputs) })),
      stdout: '',
      stderr: stderr || errorMsg,
    };
  }

  return parseResults(stdout, stderr, testCases);
}

export async function runCode(code, testCases, functionName) {
  try {
    // prefer local Express server — same harness, real CPython, no external dependency
    return await runLocal(code, testCases, functionName);
  } catch (localErr) {
    if (localErr.name === 'AbortError') {
      return {
        success: false,
        results: testCases.map((tc, i) => ({ id: i, passed: false, error: 'Execution timed out (10s)', expected: String(tc.expected), inputs: String(tc.inputs) })),
        stdout: '', stderr: 'Execution timed out',
      };
    }
    // LOCAL_UNAVAILABLE or network error → fall through to Judge0
  }

  try {
    return await runJudge0(code, testCases, functionName);
  } catch (error) {
    const isTimeout = error.name === 'AbortError';
    const message = isTimeout ? 'Execution timed out (15s)' : `Error: ${error.message}`;
    return {
      success: false,
      results: testCases.map((tc, i) => ({ id: i, passed: false, error: message, expected: String(tc.expected), inputs: String(tc.inputs) })),
      stdout: '', stderr: message,
    };
  }
}
