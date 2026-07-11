'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { useProblems } from '@/hooks/useProblems';

const DURATION = 45 * 60;
const STORAGE_KEY = 'simulation_session';

// Fisher-Yates-ish shuffle then slice
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// sessionStorage so the timer survives navigation between questions
// but resets when the tab is closed
function loadSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    const elapsed = Math.floor((Date.now() - s.startTime) / 1000);
    if (elapsed >= DURATION) return null;
    return s;
  } catch {
    return null;
  }
}

function saveSession(problemIds, startTime) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ problemIds, startTime }));
}

const DIFFICULTY_LABEL = { easy: 'קל', medium: 'בינוני', hard: 'קשה' };
const DIFFICULTY_COLOR = {
  easy: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30',
  medium: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
  hard: 'text-red-600 bg-red-50 dark:bg-red-900/30',
};

export default function Simulation() {
  const router = useRouter();
  const { solutions } = useApp();
  const { problems: allProblems, loading } = useProblems();
  const [problems, setProblems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [started, setStarted] = useState(false);
  const [expired, setExpired] = useState(false);

  // Load or create session
  useEffect(() => {
    if (loading || allProblems.length === 0) return;
    const existing = loadSession();
    if (existing) {
      const probs = existing.problemIds.map((id) => allProblems.find((p) => p.id === id)).filter(Boolean);
      setProblems(probs);
      const elapsed = Math.floor((Date.now() - existing.startTime) / 1000);
      setTimeLeft(Math.max(0, DURATION - elapsed));
      setStarted(true);
    } else {
      setProblems(pickRandom(allProblems, 3));
    }
  }, [allProblems, loading]);

  // Countdown
  useEffect(() => {
    if (!started || expired) return;
    if (timeLeft <= 0) { setExpired(true); return; }
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { setExpired(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [started, expired, timeLeft]);

  const handleStart = useCallback(() => {
    const startTime = Date.now();
    saveSession(problems.map((p) => p.id), startTime);
    setStarted(true);
    setTimeLeft(DURATION);
  }, [problems]);

  const handleNewSimulation = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    const newProblems = pickRandom(allProblems, 3);
    setProblems(newProblems);
    setStarted(false);
    setExpired(false);
    setTimeLeft(DURATION);
  }, [allProblems]);

  if (loading) {
    return (
      <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
      </div>
    );
  }

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  const progress = ((DURATION - timeLeft) / DURATION) * 100;
  const timerUrgent = timeLeft < 300; // last 5 minutes

  const solvedCount = problems.filter((p) => solutions[p.id]?.score >= 50).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <i className="fas fa-briefcase"></i>
          סימולציית ראיון עבודה
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">ראיון טכני מדומה</h1>
        <p className="text-gray-500 dark:text-gray-400">
          3 שאלות אקראיות · 45 דקות · פתור כמה שיותר
        </p>
      </div>

      {/* Timer */}
      <div className={`card text-center mb-8 ${timerUrgent && started ? 'border-red-400 dark:border-red-500' : ''}`}>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">זמן שנותר</p>
        <div className={`text-6xl font-mono font-bold tabular-nums mb-4 ${!started ? 'text-gray-400' :
            timerUrgent ? 'text-red-500 animate-pulse' :
              'text-primary'
          }`}>
          {minutes}:{seconds}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-5">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timerUrgent ? 'bg-red-500' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {!started ? (
          <button onClick={handleStart} className="btn-primary px-8 py-3 text-base">
            <i className="fas fa-play ml-2"></i>
            התחל ראיון
          </button>
        ) : expired ? (
          <div className="space-y-3">
            <p className="text-red-500 font-semibold text-lg">⏰ הזמן נגמר!</p>
            <p className="text-gray-500 text-sm">פתרת {solvedCount} מתוך {problems.length} שאלות</p>
            <button onClick={handleNewSimulation} className="btn-primary px-6 py-2.5">
              <i className="fas fa-redo ml-2"></i>
              ראיון חדש
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-gray-500">
              <i className="fas fa-check-circle text-emerald-500 ml-1"></i>
              {solvedCount}/{problems.length} הושלמו
            </span>
            <button onClick={handleNewSimulation} className="btn-outline text-sm px-4 py-2">
              <i className="fas fa-shuffle ml-1"></i>
              ראיון חדש
            </button>
          </div>
        )}
      </div>

      {/* Problem cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {problems.map((problem, idx) => {
          const sol = solutions[problem.id];
          const solved = sol?.score >= 50;
          const attempted = sol && !solved;

          return (
            <div
              key={problem.id}
              className={`card flex flex-col gap-4 relative ${solved ? 'border-emerald-400' : ''}`}
            >
              {/* Badge number */}
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  שאלה {idx + 1}
                </span>
                {solved && (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <i className="fas fa-check"></i> הושלם
                  </span>
                )}
                {attempted && (
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                    נוסה
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-1">
                  {problem.titleHe}
                </h3>
                <p className="text-xs text-gray-400">{problem.title}</p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${DIFFICULTY_COLOR[problem.difficulty]}`}>
                  {DIFFICULTY_LABEL[problem.difficulty]}
                </span>
                <span className="text-xs text-gray-400">{problem.topic}</span>
              </div>

              <button
                onClick={() => router.push(`/session/${problem.id}`)}
                disabled={!started}
                className={`mt-auto w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${!started
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700'
                    : solved
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                      : 'btn-primary justify-center'
                  }`}
              >
                {!started ? 'התחל את הראיון תחילה' : solved ? 'פתור שוב' : 'פתור שאלה'}
                {started && <i className="fas fa-arrow-left mr-2"></i>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Expired overlay */}
      {expired && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="card max-w-sm w-full mx-4 text-center space-y-4">
            <div className="text-5xl">⏰</div>
            <h2 className="text-2xl font-bold text-purple-900 dark:text-white">הזמן נגמר!</h2>
            <p className="text-gray-500">
              פתרת <strong>{solvedCount}</strong> מתוך <strong>{problems.length}</strong> שאלות
            </p>
            {solvedCount > 0 && (
              <p className="text-emerald-600 font-semibold">
                {solvedCount === 3 ? '🎉 מושלם! פתרת את כולן!' : 'כל הכבוד על המאמץ!'}
              </p>
            )}
            <button onClick={handleNewSimulation} className="btn-primary w-full justify-center py-3">
              <i className="fas fa-redo ml-2"></i>
              ראיון חדש
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
