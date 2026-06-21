'use client';

import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import {
  apiLogin,
  apiRegister,
  apiGetMe,
  apiGetSolutions,
  apiSaveSolution,
  apiGetActivity,
  apiSaveActivity,
  setToken,
  hasToken,
} from '../services/api';

const AppContext = createContext(null);

function getInitialState() {
  return {
    isLoggedIn: false,
    loading: true,
    user: null,
    solutions: {},
    activityLog: [],
    session: null,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'AUTH_LOADING':
      return { ...state, loading: true };

    case 'AUTH_READY':
      return {
        ...state,
        loading: false,
        isLoggedIn: !!action.payload.user,
        user: action.payload.user || null,
        solutions: action.payload.solutions || {},
        activityLog: action.payload.activityLog || [],
      };

    case 'LOGOUT':
      return { ...getInitialState(), loading: false };

    case 'SET_SOLUTIONS':
      return { ...state, solutions: action.payload };

    case 'ADD_SOLUTION':
      return {
        ...state,
        solutions: { ...state.solutions, [action.payload.problemId]: action.payload.data },
      };

    case 'SET_ACTIVITY':
      return { ...state, activityLog: action.payload };

    case 'START_SESSION': {
      if (state.session && state.session.problemId === action.payload.problemId) {
        return state;
      }
      return {
        ...state,
        session: {
          problemId: action.payload.problemId,
          startTime: Date.now(),
          code: action.payload.starterCode || '',
          chatMessages: action.payload.initialMessages || [],
          hintsRevealed: [],
          testResults: null,
        },
      };
    }

    case 'UPDATE_SESSION_CODE':
      if (!state.session) return state;
      return { ...state, session: { ...state.session, code: action.payload } };

    case 'ADD_CHAT_MESSAGE':
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          chatMessages: [
            ...state.session.chatMessages,
            { role: action.payload.role, content: action.payload.content },
          ],
        },
      };

    case 'REVEAL_HINT':
      if (!state.session) return state;
      if (state.session.hintsRevealed.includes(action.payload)) return state;
      return {
        ...state,
        session: {
          ...state.session,
          hintsRevealed: [...state.session.hintsRevealed, action.payload],
        },
      };

    case 'SET_TEST_RESULTS':
      if (!state.session) return state;
      return { ...state, session: { ...state.session, testResults: action.payload } };

    case 'SUBMIT_SOLUTION': {
      if (!state.session) return state;
      const { problemId } = state.session;
      const solData = action.payload;
      return {
        ...state,
        solutions: {
          ...state.solutions,
          [problemId]: {
            score: solData.score,
            timeSpent: solData.timeSpent,
            code: solData.code,
            testsPassed: solData.testsPassed,
            totalTests: solData.totalTests,
            hintsUsed: solData.hintsUsed,
            date: solData.date || new Date().toISOString(),
          },
        },
        session: null,
      };
    }

    case 'RESET_SESSION':
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, code: action.payload, testResults: null },
      };

    case 'CLEAR_SESSION':
      return { ...state, session: null };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, getInitialState);
  const initRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    if (!hasToken()) {
      dispatch({ type: 'AUTH_READY', payload: {} });
      return;
    }

    (async () => {
      try {
        const [{ user }, { solutions }, { activityLog }] = await Promise.all([
          apiGetMe(),
          apiGetSolutions(),
          apiGetActivity(),
        ]);
        dispatch({ type: 'AUTH_READY', payload: { user, solutions, activityLog } });
      } catch {
        setToken(null);
        dispatch({ type: 'AUTH_READY', payload: {} });
      }
    })();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const { user } = await apiLogin(email, password);
      const [{ solutions }, { activityLog }] = await Promise.all([
        apiGetSolutions(),
        apiGetActivity(),
      ]);
      dispatch({ type: 'AUTH_READY', payload: { user, solutions, activityLog } });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const register = useCallback(async (name, email, password, university) => {
    try {
      const { user } = await apiRegister(name, email, password, university);
      dispatch({ type: 'AUTH_READY', payload: { user, solutions: {}, activityLog: [] } });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const startSession = useCallback(
    (problemId, starterCode, initialMessages) =>
      dispatch({ type: 'START_SESSION', payload: { problemId, starterCode, initialMessages } }),
    []
  );

  const updateSessionCode = useCallback(
    (code) => dispatch({ type: 'UPDATE_SESSION_CODE', payload: code }),
    []
  );

  const addChatMessage = useCallback(
    (role, content) => dispatch({ type: 'ADD_CHAT_MESSAGE', payload: { role, content } }),
    []
  );

  const revealHint = useCallback(
    (hintIndex) => dispatch({ type: 'REVEAL_HINT', payload: hintIndex }),
    []
  );

  const setTestResults = useCallback(
    (testResults) => dispatch({ type: 'SET_TEST_RESULTS', payload: testResults }),
    []
  );

  const submitSolution = useCallback(
    async (payload) => {
      const { problemId } = state.session || {};
      if (!problemId) return;

      dispatch({ type: 'SUBMIT_SOLUTION', payload: { ...payload, code: state.session.code } });

      try {
        await apiSaveSolution(problemId, {
          score: payload.score,
          timeSpent: payload.timeSpent,
          code: state.session.code,
          testsPassed: payload.testsPassed,
          totalTests: payload.totalTests,
          hintsUsed: payload.hintsUsed,
        });
        await apiSaveActivity();
      } catch (err) {
        console.error('Failed to save to server:', err);
      }
    },
    [state.session]
  );

  const resetSession = useCallback(
    (starterCode) => dispatch({ type: 'RESET_SESSION', payload: starterCode }),
    []
  );

  const clearSession = useCallback(
    () => dispatch({ type: 'CLEAR_SESSION' }),
    []
  );

  const getStats = useCallback(() => {
    const solArr = Object.values(state.solutions);
    const totalSolved = solArr.length;

    let streak = 0;
    const check = new Date();
    check.setHours(0, 0, 0, 0);
    while (true) {
      const ds = check.toISOString().split('T')[0];
      if (state.activityLog.some((a) => a.date === ds)) {
        streak++;
        check.setDate(check.getDate() - 1);
      } else {
        break;
      }
    }

    const avgSec =
      totalSolved > 0
        ? solArr.reduce((s, v) => s + v.timeSpent, 0) / totalSolved
        : 0;
    const mm = String(Math.floor(avgSec / 60)).padStart(2, '0');
    const ss = String(Math.floor(avgSec % 60)).padStart(2, '0');

    const avgScore =
      totalSolved > 0
        ? Math.round(solArr.reduce((s, v) => s + v.score, 0) / totalSolved)
        : 0;

    return { totalSolved, currentStreak: streak, avgTime: `${mm}:${ss}`, avgScore };
  }, [state.solutions, state.activityLog]);

  const getTopicMastery = useCallback(
    (problemsData) => {
      const map = {};
      problemsData.forEach((p) => {
        if (!map[p.topic]) map[p.topic] = { topic: p.topic, solved: 0, total: 0 };
        map[p.topic].total++;
        if (state.solutions[p.id]) map[p.topic].solved++;
      });
      return Object.values(map).map((t) => ({
        ...t,
        percent: t.total > 0 ? Math.round((t.solved / t.total) * 100) : 0,
      }));
    },
    [state.solutions]
  );

  const getRecentActivity = useCallback(
    (problemsData, limit = 5) => {
      return Object.entries(state.solutions)
        .map(([id, sol]) => {
          const p = problemsData.find((pr) => pr.id === Number(id));
          if (!p) return null;
          return {
            id: p.id,
            title: p.title,
            topic: p.topic,
            difficulty: p.difficulty,
            date: sol.date,
            score: sol.score,
          };
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
    },
    [state.solutions]
  );

  const getDifficultyBreakdown = useCallback(
    (problemsData) => {
      const out = {
        easy: { solved: 0, total: 0 },
        medium: { solved: 0, total: 0 },
        hard: { solved: 0, total: 0 },
      };
      problemsData.forEach((p) => {
        out[p.difficulty].total++;
        if (state.solutions[p.id]) out[p.difficulty].solved++;
      });
      return out;
    },
    [state.solutions]
  );

  const value = {
    isLoggedIn: state.isLoggedIn,
    loading: state.loading,
    user: state.user,
    solutions: state.solutions,
    session: state.session,
    activityLog: state.activityLog,
    login,
    register,
    logout,
    startSession,
    updateSessionCode,
    addChatMessage,
    revealHint,
    setTestResults,
    submitSolution,
    resetSession,
    clearSession,
    getStats,
    getTopicMastery,
    getRecentActivity,
    getDifficultyBreakdown,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}


//saves the user context when browsing between pages - keeps the user logged in.