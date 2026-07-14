'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import SimpleCodeEditor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import ChatBubble from '@/components/ChatBubble';
import { useApp } from '@/context/AppContext';
import { runCode } from '@/services/codeRunner';
import { getInitialMessage, getAiResponse } from '@/services/aiChat';
import { DIFFICULTY_MAP } from '@/data/fakeData';
import { INTERVIEW_SESSION_CONTENT } from '@/content/interviewSessionContent';

export default function InterviewSession() {
  const { problemId } = useParams();
  const router = useRouter();
  const numericProblemId = parseInt(problemId, 10);
  const {
    problems,
    getProblemById,
    session,
    solutions,
    startSession,
    updateSessionCode,
    addChatMessage,
    revealHint,
    setTestResults,
    submitSolution,
    resetSession,
  } = useApp();
  const problem = getProblemById(numericProblemId);

  const [activeTab, setActiveTab] = useState('problem');
  const [elapsed, setElapsed] = useState(0);

  // Simulation mode
  const [simSession, setSimSession] = useState(null);
  const [simTimeLeft, setSimTimeLeft] = useState(0);

  useEffect(() => {
    try {
      // Restore simulation context when user jumps between question routes.
      const raw = sessionStorage.getItem('simulation_session');
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.problemIds.includes(numericProblemId)) {
        setSimSession(s);
        const elapsed = Math.floor((Date.now() - s.startTime) / 1000);
        setSimTimeLeft(Math.max(0, 45 * 60 - elapsed));
      }
    } catch {}
  }, [numericProblemId]);

  useEffect(() => {
    if (!simSession) return;
    const id = setInterval(() => {
      const el = Math.floor((Date.now() - simSession.startTime) / 1000);
      setSimTimeLeft(Math.max(0, 45 * 60 - el));
    }, 1000);
    return () => clearInterval(id);
  }, [simSession]);
  const [chatInput, setChatInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const chatEndRef = useRef(null);
  const initializedRef = useRef(null);

  useEffect(() => {
    // track the initialized problem id (not a boolean) so jumping straight to
    // another problem's route (simulation mode) starts a fresh session
    if (!problem || initializedRef.current === problem.id) return;
    initializedRef.current = problem.id;
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

  if (!problem && problems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
        <h2 className="text-xl font-bold text-gray-900">{INTERVIEW_SESSION_CONTENT.editor.runLoading}</h2>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
        <i className="fas fa-exclamation-triangle text-amber-500 text-4xl"></i>
        <h2 className="text-xl font-bold text-gray-900">{INTERVIEW_SESSION_CONTENT.notFound.title}</h2>
        <Link href="/problems" className="text-primary hover:underline">{INTERVIEW_SESSION_CONTENT.notFound.backToList}</Link>
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
    if (!text || aiLoading || !session) return;
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
      addChatMessage('ai', INTERVIEW_SESSION_CONTENT.aiError);
    } finally {
      setAiLoading(false);
    }
  };

  const handleRun = async () => {
    setRunLoading(true);
    try {
      // "Run" only executes tests and stores result; it does not submit.
      const result = await runCode(session.code, problem.id, problem.functionName);
      setTestResults({
        results: result.results,
        allPassed: result.success === true,
        error: result.results.length === 0 ? result.stderr : null,
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
      // the server runs the tests and computes the score — we only report
      // how long the session took and how many hints were opened
      const timeSpent = Math.floor((Date.now() - session.startTime) / 1000);
      const hintsUsed = session.hintsRevealed?.length || 0;

      const result = await submitSolution({ timeSpent, hintsUsed });
      if (!result.success) {
        setTestResults({ results: [], allPassed: false, error: result.error });
        return;
      }
      router.push(`/results/${problem.id}`);
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
        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
    }`;

  const simUrgent = simTimeLeft < 300;
  const simMinutes = String(Math.floor(simTimeLeft / 60)).padStart(2, '0');
  const simSeconds = String(simTimeLeft % 60).padStart(2, '0');

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full overflow-x-hidden">

      {/* Simulation bar */}
      {simSession && (
        <div className="flex flex-wrap items-center bg-gray-900 border-b border-gray-700 px-3 sm:px-4 py-2 flex-shrink-0 gap-2 sm:gap-3">
          {/* Timer */}
          <div className={`flex items-center gap-2 font-mono font-bold text-sm tabular-nums flex-shrink-0 ${simUrgent ? 'text-red-400 animate-pulse' : 'text-primary'}`}>
            <i className={`fas fa-clock text-xs ${simUrgent ? 'text-red-400' : 'text-primary'}`}></i>
            {simMinutes}:{simSeconds}
          </div>

          {/* Problem tabs */}
          <div className="order-3 sm:order-none basis-full sm:basis-auto flex gap-1.5 overflow-x-auto">
            {simSession.problemIds.map((id, idx) => {
              const p = getProblemById(id);
              const solved = solutions[id]?.score >= 50;
              const isCurrent = id === numericProblemId;
              return (
                <button
                  key={id}
                  onClick={() => router.push(`/session/${id}`)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isCurrent
                      ? 'bg-primary text-white'
                      : solved
                      ? 'bg-emerald-700 text-white hover:bg-emerald-600'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {solved && <i className="fas fa-check ml-1 text-[10px]"></i>}
                  {idx + 1}. {p?.titleHe || INTERVIEW_SESSION_CONTENT.sim.fallbackQuestion(idx)}
                </button>
              );
            })}
          </div>

          {/* Back to simulation */}
          <button
            onClick={() => router.push('/simulation')}
            className="text-gray-400 hover:text-white text-xs flex items-center gap-1 flex-shrink-0 transition-colors ml-auto sm:ml-0"
          >
            <i className="fas fa-th-large text-[10px]"></i>
            {INTERVIEW_SESSION_CONTENT.sim.backToSimulation}
          </button>
        </div>
      )}

    <div className="flex flex-col lg:flex-row flex-1 min-h-0 min-w-0">
      <div className="w-full lg:w-2/5 flex flex-col border-b lg:border-b-0 lg:border-l border-purple-200 dark:border-gray-700 bg-purple-50 dark:bg-gray-800 min-h-0 min-w-0 h-[50vh] md:h-[45vh] lg:h-auto lg:flex-shrink-0">
        <div className="flex border-b border-purple-200 dark:border-gray-700">
          <button onClick={() => setActiveTab('problem')} className={tabClass('problem')}>
            <i className="fas fa-file-alt ml-1"></i> {INTERVIEW_SESSION_CONTENT.tabs.problem}
          </button>
          <button onClick={() => setActiveTab('chat')} className={tabClass('chat')}>
            <i className="fas fa-comments ml-1"></i> {INTERVIEW_SESSION_CONTENT.tabs.chat}
          </button>
          <button onClick={() => setActiveTab('hints')} className={tabClass('hints')}>
            <i className="fas fa-lightbulb ml-1"></i> {INTERVIEW_SESSION_CONTENT.tabs.hints}
          </button>
        </div>

        {activeTab === 'problem' && (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${diff.class}`}>{diff.label}</span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs text-gray-500">{problem.topic}</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{problem.titleHe}</h2>
            <div className="text-gray-700 dark:text-gray-200 space-y-4 text-sm">
              <p>{problem.descriptionHe}</p>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold text-gray-900 mb-2">{INTERVIEW_SESSION_CONTENT.problem.example(idx)}</h4>
                  <p className="font-mono text-sm">
                    <strong>{INTERVIEW_SESSION_CONTENT.problem.inputLabel}</strong> {ex.input}<br />
                    <strong>{INTERVIEW_SESSION_CONTENT.problem.outputLabel}</strong> {ex.output}
                    {ex.explanation && (<><br /><strong>{INTERVIEW_SESSION_CONTENT.problem.explanationLabel}</strong> {ex.explanation}</>)}
                  </p>
                </div>
              ))}
              {problem.constraints && problem.constraints.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-900 mb-2">{INTERVIEW_SESSION_CONTENT.problem.constraints}</h4>
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
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
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
            <div className="p-4 border-t border-purple-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={INTERVIEW_SESSION_CONTENT.chat.placeholder}
                  className="flex-1 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">{INTERVIEW_SESSION_CONTENT.hints.title}</h3>
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

      <div className="flex-1 flex flex-col bg-gray-900 min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between px-3 sm:px-4 py-3 bg-gray-800 border-b border-gray-700 flex-shrink-0 gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <select className="bg-gray-700 text-gray-200 text-sm rounded-lg px-3 py-1.5 border-none focus:ring-2 focus:ring-primary">
              <option>{INTERVIEW_SESSION_CONTENT.editor.language}</option>
            </select>
            <span className="text-gray-500 text-xs">|</span>
            <span className="text-gray-400 text-xs"><i className="fas fa-clock ml-1"></i> {formatTime(elapsed)}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-undo ml-1"></i> {INTERVIEW_SESSION_CONTENT.editor.reset}
            </button>
          </div>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 overflow-auto" dir="ltr">
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
                minWidth: '100%',
                direction: 'ltr',
              }}
            />
          </div>
        </div>

        <div className="bg-gray-800 border-t border-gray-700 px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 sm:flex-none gap-2">
              <button
                onClick={handleRun}
                disabled={runLoading || submitLoading}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors disabled:opacity-50 flex-1 sm:flex-none"
              >
                {runLoading ? (
                  <><i className="fas fa-spinner fa-spin ml-1 text-green-400"></i> {INTERVIEW_SESSION_CONTENT.editor.runLoading}</>
                ) : (
                  <><i className="fas fa-play ml-1 text-green-400"></i> {INTERVIEW_SESSION_CONTENT.editor.run}</>
                )}
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitLoading || runLoading}
                className="bg-green-600 hover:bg-green-500 text-white text-sm font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors disabled:opacity-50 flex-1 sm:flex-none"
              >
                {submitLoading ? (
                  <><i className="fas fa-spinner fa-spin ml-1"></i> {INTERVIEW_SESSION_CONTENT.editor.submitLoading}</>
                ) : (
                  <><i className="fas fa-paper-plane ml-1"></i> {INTERVIEW_SESSION_CONTENT.editor.submit}</>
                )}
              </button>
            </div>
          </div>

          {session?.testResults && (
            <div className="mt-3 bg-gray-900 rounded-lg p-3">
              <div className="text-xs font-medium text-gray-400 mb-2">{INTERVIEW_SESSION_CONTENT.editor.testResults}</div>
              <div className="space-y-1.5 text-xs font-mono overflow-x-auto" dir="ltr">
                {session.testResults.error && (
                  <div className="text-red-400 whitespace-pre-wrap">{session.testResults.error}</div>
                )}
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
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
      <button onClick={handleClick} className="w-full text-right p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between transition-colors">
        <span className="font-medium text-sm text-gray-700 dark:text-gray-200">
          {revealed ? hint.title : <><i className="fas fa-lock ml-1 text-gray-400"></i> {INTERVIEW_SESSION_CONTENT.hints.locked(index)}</>}
        </span>
        {revealed ? (
          <i className={`fas fa-chevron-down text-gray-400 text-xs transition-transform ${open ? 'rotate-180' : ''}`}></i>
        ) : (
          <span className="text-xs text-primary font-medium">{INTERVIEW_SESSION_CONTENT.hints.reveal}</span>
        )}
      </button>
      {revealed && open && <div className="p-4 text-sm text-gray-600 dark:text-gray-300">{hint.content}</div>}
    </div>
  );
}
