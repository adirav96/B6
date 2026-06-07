import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Problems from './pages/Problems';
import InterviewSession from './pages/InterviewSession';
import Results from './pages/Results';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useApp();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <i className="fas fa-spinner fa-spin text-primary text-3xl"></i>
      </div>
    );
  }
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
        <Route path="/session/:problemId" element={<ProtectedRoute><InterviewSession /></ProtectedRoute>} />
        <Route path="/results/:problemId" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
