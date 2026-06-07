const JUDGE0_URL = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const PYTHON3_LANGUAGE_ID = 71;

export async function runCode(code, testCases, functionName) {
  const testCasesJson = JSON.stringify(testCases);

  const wrappedCode = `${code}

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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(JUDGE0_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: wrappedCode,
        language_id: PYTHON3_LANGUAGE_ID,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    const stdout = data.stdout || '';
    const stderr = data.stderr || data.compile_output || '';

    if (data.status?.id !== 3 && !stdout) {
      const errorMsg = data.status?.description || 'Execution error';
      return {
        success: false,
        results: testCases.map((tc, i) => ({
          id: i,
          passed: false,
          error: stderr || errorMsg,
          expected: String(tc.expected),
          inputs: String(tc.inputs),
        })),
        stdout: '',
        stderr: stderr || errorMsg,
      };
    }

    const marker = '__TEST_RESULTS__';
    const markerIndex = stdout.indexOf(marker);

    if (markerIndex === -1) {
      return {
        success: false,
        results: [],
        stdout,
        stderr: stderr || 'No test results produced. The code may contain a syntax error.',
      };
    }

    const jsonStr = stdout.substring(markerIndex + marker.length).trim();
    const otherOutput = stdout.substring(0, markerIndex).trim();
    const results = JSON.parse(jsonStr);
    const allPassed = results.every((r) => r.passed);

    return { success: allPassed, results, stdout: otherOutput, stderr };
  } catch (error) {
    const isTimeout = error.name === 'AbortError';
    const message = isTimeout
      ? 'חריגה מזמן ריצה (15 שניות)'
      : `שגיאה: ${error.message}`;

    return {
      success: false,
      results: testCases.map((tc, i) => ({
        id: i,
        passed: false,
        error: message,
        expected: String(tc.expected),
        inputs: String(tc.inputs),
      })),
      stdout: '',
      stderr: message,
    };
  }
}
