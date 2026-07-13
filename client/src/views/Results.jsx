'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { getFeedbackSections, RESULTS_TEXT } from '@/content/resultsContent';

export default function Results() {
  const { problemId } = useParams();
  const router = useRouter();
  const { solutions, getProblemById } = useApp();
  const numericProblemId = parseInt(problemId, 10);
  const problem = getProblemById(numericProblemId);
  const solution = solutions?.[numericProblemId];

  if (!solution || !problem) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
        <i className="fas fa-exclamation-triangle text-amber-500 text-4xl"></i>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{RESULTS_TEXT.notFound}</h2>
        <Link href="/problems" className="text-primary hover:underline">{RESULTS_TEXT.backToProblems}</Link>
      </div>
    );
  }

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const score = solution.score ?? 0;
  const dashArray = `${score}, 100`;

  const feedbackSections = getFeedbackSections(score);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className={`${score >= 70 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}>
          <i className={`fas ${score >= 70 ? 'fa-check-circle text-green-600' : 'fa-exclamation-circle text-amber-600'} text-4xl`}></i>
        </div>
        <h1 className="text-2xl font-bold text-purple-900 dark:text-white">
          {RESULTS_TEXT.titleByScore(score)}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">{RESULTS_TEXT.summary}</p>
      </div>

      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 p-8 mb-8">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <svg className="w-40 h-40" viewBox="0 0 36 36">
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray={dashArray} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{score}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{RESULTS_TEXT.scoreOutOf}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: formatTime(solution.timeSpent ?? 0), label: RESULTS_TEXT.metrics.solveTime, color: 'text-primary' },
            { value: `${solution.testsPassed ?? 0}/${solution.totalTests ?? 0}`, label: RESULTS_TEXT.metrics.passedTests, color: 'text-green-600' },
            { value: score >= 70 ? RESULTS_TEXT.statusPassed : RESULTS_TEXT.statusFailed, label: RESULTS_TEXT.metrics.status, color: 'text-blue-600' },
            { value: solution.hintsUsed ?? 0, label: RESULTS_TEXT.metrics.hintsUsed, color: 'text-purple-600' },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-gray-800 rounded-xl shadow-sm border border-purple-200 dark:border-gray-700 p-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6"><i className="fas fa-robot text-primary ml-2"></i>{RESULTS_TEXT.aiFeedback}</h2>
        <div className="space-y-6">
          {feedbackSections.map((fb, idx) => <FeedbackSection key={idx} {...fb} />)}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button onClick={() => router.push('/problems')} className="flex-1 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-xl transition-colors">
            <i className="fas fa-arrow-right ml-2"></i> {RESULTS_TEXT.nextQuestion}
          </button>
          <button onClick={() => router.push(`/session/${problemId}`)} className="flex-1 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-xl transition-colors">
            <i className="fas fa-redo ml-2"></i> {RESULTS_TEXT.retry}
          </button>
        </div>
      </div>
    </div>
  );
}

function FeedbackSection({ borderColor, title, text, stars }) {
  const fullStars = Math.floor(stars);
  const hasHalf = stars % 1 !== 0;
  return (
    <div className={`border-r-4 ${borderColor} pr-4`}>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
      <div className="mt-2 flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => <i key={i} className="fas fa-star text-amber-400"></i>)}
        {hasHalf && <i className="fas fa-star-half-alt text-amber-400"></i>}
        {Array.from({ length: 5 - Math.ceil(stars) }).map((_, i) => <i key={`e${i}`} className="fas fa-star text-gray-400 dark:text-gray-600"></i>)}
      </div>
    </div>
  );
}
