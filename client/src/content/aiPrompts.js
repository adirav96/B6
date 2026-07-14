export function getInitialInterviewMessage(problem) {
  return (
    `שלום! אני המראיין שלך היום. נעבוד יחד על "${problem.title}" – ${problem.titleHe}. ` +
    'קח רגע לקרוא את השאלה ואז ספר לי על הגישה שאתה חושב לנקוט. ' +
    'אל תקפוץ ישר לקוד – אני רוצה לשמוע את תהליך החשיבה שלך.'
  );
}
