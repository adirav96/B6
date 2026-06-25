export const DIFFICULTY_MAP = {
  easy: { label: "קל", class: "difficulty-easy" },
  medium: { label: "בינוני", class: "difficulty-medium" },
  hard: { label: "קשה", class: "difficulty-hard" },
};

export const STATUS_MAP = {
  completed: { icon: "fas fa-check-circle text-green-500", label: "הושלם" },
  "in-progress": { icon: "fas fa-clock text-amber-500", label: "בתהליך" },
  "not-started": { icon: "far fa-circle text-gray-400 dark:text-gray-500", label: "" },
  failed: { icon: "fas fa-times-circle text-red-400", label: "לא עבר" },
};

export function getAchievements(solutions, activityLog) {
  const solArr = Object.values(solutions || {});
  const totalSolved = solArr.length;

  let streak = 0;
  const check = new Date();
  check.setHours(0, 0, 0, 0);
  while (true) {
    const ds = check.toISOString().split('T')[0];
    if ((activityLog || []).some((a) => a.date === ds)) {
      streak++;
      check.setDate(check.getDate() - 1);
    } else {
      break;
    }
  }

  const hasFullScore = solArr.some((s) => s.testsPassed === s.totalTests && s.hintsUsed === 0);
  const hasFastSolve = solArr.some((s) => s.timeSpent < 300);

  return [
    { emoji: "🎯", title: "First Try", bg: "bg-green-50", border: "border-green-200", locked: !hasFullScore, desc: "פתרון מושלם ללא רמזים" },
    { emoji: "⚡", title: "Speed Demon", bg: "bg-blue-50", border: "border-blue-200", locked: !hasFastSolve, desc: "פתרון תוך פחות מ-5 דקות" },
    { emoji: "🔥", title: "7 ימים ברצף", bg: "bg-amber-50", border: "border-amber-200", locked: streak < 7, desc: "רצף פעילות של 7 ימים" },
    { emoji: "📚", title: "50 שאלות", bg: "bg-purple-50", border: "border-purple-200", locked: totalSolved < 50, desc: `${totalSolved}/50 שאלות` },
    { emoji: "🏆", title: "100 שאלות", bg: "bg-yellow-50", border: "border-yellow-200", locked: totalSolved < 100, desc: `${totalSolved}/100 שאלות` },
    { emoji: "💎", title: "DP Master", bg: "bg-cyan-50", border: "border-cyan-200", locked: totalSolved < 5, desc: `${Math.min(totalSolved, 5)}/5 שאלות לפתיחה` },
  ];
}
