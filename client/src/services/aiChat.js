export function getInitialMessage(problem) {
  return (
    `שלום! אני המראיין שלך היום. נעבוד יחד על "${problem.title}" – ${problem.titleHe}. ` +
    `קח רגע לקרוא את השאלה ואז ספר לי על הגישה שאתה חושב לנקוט. ` +
    `אל תקפוץ ישר לקוד – אני רוצה לשמוע את תהליך החשיבה שלך.`
  );
}

export async function getAiResponse(problem, userMessage, code, hintsRevealed, history = []) {
  const messages = [
    ...history,
    { role: 'user', content: userMessage },
  ];

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ problem, messages, code, hintsRevealed }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'שגיאת שרת');
  return data.reply;
}
