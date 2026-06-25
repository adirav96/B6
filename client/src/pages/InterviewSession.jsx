'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import ChatBubble from '@/components/ChatBubble';
import { useApp } from '@/context/AppContext';
import { getProblemById } from '@/data/problemsData';
import { runCode } from '@/services/codeRunner';
import { getInitialMessage, getAiResponse } from '@/services/aiChat';
import { DIFFICULTY_MAP } from '@/data/fakeData';

export default function InterviewSession() {
  const { problemId } = useParams();
  const router = useRouter();
  const problem = getProblemById(parseInt(problemId));
  const {
    session,
    startSession,
    updateSessionCode,
    addChatMessage,
    revealHint,
    setTestResults,
    submitSolution,
    resetSession,
  } = useApp();

  const [activeTab, setActiveTab] = useState('problem');
  const [elapsed, setElapsed] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const chatEndRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!problem || initializedRef.current) return;
    initializedRef.current = true;
    const initialMsg = [{ role: 'ai', content: getInitialMessage(problem) }];
    startSession(problem.id, problem.starterCode.python, initialMsg);
  }, [problem]);

  useEffect(() => {
    if (!session?.startTime) return;
    const tick = () => setElapsed(Math.floor((Date.now() - session.startTime) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session?.startTime]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.chatMessages?.length]);

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
        <i className="fas fa-exclamation-triangle text-amber-500 text-4xl"></i>
        <h2 className="text-xl font-bold text-gray-900">השאלה לא נמצאה</h2>
        <Link href="/problems" className="text-primary hover:underline">חזרה לרשימת השאלות</Link>
      </div>
    );
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const diff = DIFFICULTY_MAP[problem.difficulty];
  const code = session?.code ?? problem.starterCode.python;

  const handleSendMessage = async () => {
    const text = chatInput.trim();
    if (!text || aiLoading) return;
    setChatInput('');
    addChatMessage('user', text);
    setAiLoading(true);
    try {
      const response = await getAiResponse(
        problem,
        text,
        session.code,
        session.hintsRevealed,
        session.chatMessages
      );
      addChatMessage('ai', response);
    } catch {
      addChatMessage('ai', 'מצטער, קרתה שגיאה. נסה שוב.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleRun = async () => {
    setRunLoading(true);
    try {
      const result = await runCode(session.code, problem.testCases, problem.functionName);
      setTestResults({
        results: result.results,
        allPassed: result.results.every((r) => r.passed),
      });
    } catch {
      setTestResults({ results: [], allPassed: false });
    } finally {
      setRunLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    try {
      const result = await runCode(session.code, problem.testCases, problem.functionName);
      const testResults = {
        results: result.results,
        allPassed: result.results.every((r) => r.passed),
      };
      setTestResults(testResults);

      const testsPassed = result.results.filter((r) => r.passed).length;
      const totalTests = result.results.length;
      const timeSpent = Math.floor((Date.now() - session.startTime) / 1000);
      const timeMinutes = timeSpent / 60;
      const timeBonus = Math.max(0, 30 - Math.floor(timeMinutes));
      const hintPenalty = (session.hintsRevealed?.length || 0) * 5;
      const score = Math.max(0, Math.min(100, Math.round((testsPassed / totalTests) * 70 + timeBonus - hintPenalty)));

      submitSolution({
        score,
        timeSpent,
        testsPassed,
        totalTests,
        hintsUsed: session.hintsRevealed?.length || 0,
      });
      router.push(`/results/${problem.id}`);
    } catch {
      setTestResults({ results: [], allPassed: false });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = () => {
    resetSession(problem.starterCode.python);
  };

  const tabClass = (tab) =>
    `flex-1 py-3 text-sm font-medium transition-colors ${
      activeTab === tab
        ? 'text-primary border-b-2 border-primary bg-primary/5'
        : 'text-gray-500 hover:text-gray-700'
    }`;

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="w-full lg:w-2/5 flex flex-col border-l border-gray-200 bg-white">
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('problem')} className={tabClass('problem')}>
            <i className="fas fa-file-alt ml-1"></i> שאלה
          </button>
          <button onClick={() => setActiveTab('chat')} className={tabClass('chat')}>
            <i className="fas fa-comments ml-1"></i> מראיין AI
          </button>
          <button onClick={() => setActiveTab('hints')} className={tabClass('hints')}>
            <i className="fas fa-lightbulb ml-1"></i> רמזים
          </button>
        </div>

        {activeTab === 'problem' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff.class}`}>{diff.label}</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{problem.topic}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{problem.titleHe}</h2>
            <div className="text-gray-700 space-y-4 text-sm">
              <p>{problem.descriptionHe}</p>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">דוגמה {idx + 1}:</h4>
                  <p className="font-mono text-sm">
                    <strong>Input:</strong> {ex.input}<br />
                    <strong>Output:</strong> {ex.output}
                    {ex.explanation && (<><br /><strong>Explanation:</strong> {ex.explanation}</>)}
                  </p>
                </div>
              ))}
              {problem.constraints && problem.constraints.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">אילוצים:</h4>
                  <ul className="text-sm text-blue-800 space-y-1 list-disc pr-4">
                    {problem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {(session?.chatMessages || []).map((msg, idx) => (
                <ChatBubble key={idx} message={msg} />
              ))}
              {aiLoading && (
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-robot text-primary text-sm"></i>
                  </div>
                  <div className="chat-bubble bg-gray-100 rounded-2xl rounded-tr-sm p-4">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="שאלו את המראיין..."
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={aiLoading}
                />
                <button
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  onClick={handleSendMessage}
                  disabled={aiLoading || !chatInput.trim()}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hints' && (
          <div className="flex-1 overflow-y-auto p-6">
            <h3 className="font-bold text-gray-900 mb-4">רמזים</h3>
            <div className="space-y-3">
              {(problem.hints || []).map((hint, idx) => (
                <HintItem
                  key={idx}
                  hint={hint}
                  index={idx}
                  revealed={session?.hintsRevealed?.includes(idx)}
                  onReveal={() => revealHint(idx)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col bg-gray-900">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <select className="bg-gray-700 text-gray-200 text-sm rounded-lg px-3 py-1.5 border-none focus:ring-2 focus:ring-primary">
              <option>Python 3</option>
            </select>
            <span className="text-gray-500 text-xs">|</span>
            <span className="text-gray-400 text-xs"><i className="fas fa-clock ml-1"></i> {formatTime(elapsed)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-undo ml-1"></i> איפוס
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <SimpleCodeEditor
            value={code}
            onValueChange={updateSessionCode}
            highlight={(c) => Prism.highlight(c, Prism.languages.python, 'python')}
            padding={24}
            spellCheck={false}
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 14,
              lineHeight: 1.6,
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              minHeight: '100%',
              direction: 'ltr',
            }}
          />
        </div>

        <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={handleRun}
                disabled={runLoading || submitLoading}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {runLoading ? (
                  <><i className="fas fa-spinner fa-spin ml-1 text-green-400"></i> מריץ...</>
                ) : (
                  <><i className="fas fa-play ml-1 text-green-400"></i> הרצה</>
                )}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitLoading || runLoading}
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
              >
                {submitLoading ? (
                  <><i className="fas fa-spinner fa-spin ml-1"></i> מגיש...</>
                ) : (
                  <><i className="fas fa-paper-plane ml-1"></i> הגשה</>
                )}
              </button>
            </div>
          </div>

          {session?.testResults && (
            <div className="mt-3 bg-gray-900 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-400 mb-2">תוצאות בדיקה:</div>
              <div className="space-y-1.5 text-xs font-mono" dir="ltr">
                {session.testResults.results.map((r, idx) => (
                  <div key={idx} className={`flex items-center gap-2 ${r.passed ? 'text-green-400' : 'text-red-400'}`}>
                    <i className={`fas ${r.passed ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                    <span>
                      Test {idx + 1}: {r.inputs ? JSON.stringify(r.inputs) : ''} → {r.passed ? JSON.stringify(r.expected) + ' ✓' : `expected ${JSON.stringify(r.expected)}, got ${JSON.stringify(r.actual)}`}
                      {r.error && ` (${r.error})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HintItem({ hint, index, revealed, onReveal }) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!revealed) {
      onReveal();
    }
    setOpen(!open);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button onClick={handleClick} className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors">
        <span className="font-medium text-sm text-gray-700">
          {revealed ? hint.title : <><i className="fas fa-lock ml-1 text-gray-400"></i> רמז {index + 1}</>}
        </span>
        {revealed ? (
          <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}></i>
        ) : (
          <span className="text-xs text-primary font-medium">לחץ לחשיפה</span>
        )}
      </button>
      {revealed && open && <div className="p-4 text-sm text-gray-600">{hint.content}</div>}
    </div>
  );
}
