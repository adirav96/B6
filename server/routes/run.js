import express from 'express';
import { spawn } from 'child_process';
import authMiddleware from '../middleware/auth.js';
import * as problemsDb from '../db/problems.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { code, testCases, functionName, problemId } = req.body;
  if (!code || !functionName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let activeTestCases = testCases;
  if ((!activeTestCases || activeTestCases.length === 0) && problemId) {
    const problem = await problemsDb.findById(problemId);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    activeTestCases = problem.testCases || [];
  }

  if (!activeTestCases || activeTestCases.length === 0) {
    return res.status(400).json({ error: 'Missing test cases' });
  }

  const testCasesJson = JSON.stringify(activeTestCases).replace(/\\/g, '\\\\').replace(/"""/g, '\\"\\\"\\"');

  // same harness as the client-side codeRunner — keeps behavior identical
  const wrappedCode = `from __future__ import annotations
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

  let stdout = '';
  let stderr = '';

  // try 'python' first (Windows), fall back handled by error event
  const python = spawn('python', ['-c', wrappedCode]);

  python.stdout.on('data', (d) => { stdout += d.toString(); });
  python.stderr.on('data', (d) => { stderr += d.toString(); });

  // kill if it runs longer than 10 seconds
  const timer = setTimeout(() => {
    python.kill();
    res.status(408).json({ error: 'Execution timed out (10s)' });
  }, 10000);

  python.on('error', (err) => {
    clearTimeout(timer);
    // python not found — caller should fall back to Judge0
    res.status(503).json({ error: 'Python not available on server: ' + err.message });
  });

  python.on('close', () => {
    clearTimeout(timer);
    if (res.headersSent) return;

    const marker = '__TEST_RESULTS__';
    const markerIndex = stdout.lastIndexOf(marker);

    if (markerIndex === -1) {
      return res.status(200).json({
        success: false,
        results: [],
        stdout,
        stderr: stderr || 'No test results produced.',
      });
    }

    try {
      const jsonStr = stdout.substring(markerIndex + marker.length).trim();
      const userOutput = stdout.substring(0, markerIndex).trim();
      const results = JSON.parse(jsonStr);
      res.json({ success: results.every((r) => r.passed), results, stdout: userOutput, stderr });
    } catch {
      res.status(500).json({ error: 'Failed to parse test results', stdout, stderr });
    }
  });
});

export default router;
