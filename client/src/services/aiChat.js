export function getInitialMessage(problem) {
  return (
    `שלום! אני המראיין שלך היום. נעבוד יחד על "${problem.title}" – ${problem.titleHe}. ` +
    `קח רגע לקרוא את השאלה ואז ספר לי על הגישה שאתה חושב לנקוט. ` +
    `אל תקפוץ ישר לקוד – אני רוצה לשמוע את תהליך החשיבה שלך.`
  );
}

export async function getAiResponse(problem, userMessage, code, hintsRevealed, history = []) {
  // Anthropic expects 'assistant' not 'ai' — map before sending
  const messages = [
    ...history.map(({ role, content }) => ({
      role: role === 'ai' ? 'assistant' : role,
      content,
    })),
    { role: 'user', content: userMessage },
  ];

  const token = localStorage.getItem('codeinterview-token');
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ problem, messages, code, hintsRevealed }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Server error');
  return data.reply;
}
