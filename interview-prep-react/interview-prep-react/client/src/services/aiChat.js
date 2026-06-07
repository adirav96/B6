export function getInitialMessage(problem) {
  return (
    `שלום! אני המראיין שלך היום. נעבוד יחד על "${problem.title}" – ${problem.titleHe}. ` +
    `קח רגע לקרוא את השאלה ואז ספר לי על הגישה שאתה חושב לנקוט. ` +
    `אל תקפוץ ישר לקוד – אני רוצה לשמוע את תהליך החשיבה שלך.`
  );
}

const PROBING_QUESTIONS = [
  'מה תהיה סיבוכיות הזמן של הגישה הזו?',
  'חשבת על edge cases? מה קורה עם קלט ריק?',
  'האם יש גישה יעילה יותר מבחינת זיכרון?',
  'איך הפתרון שלך מתמודד עם קלטים גדולים מאוד?',
  'מה יקרה אם כל הערכים זהים?',
];

const ENCOURAGEMENT = [
  'אתה בכיוון הנכון! בוא ננסה לחשוב על זה צעד נוסף.',
  'זו התחלה טובה. בוא נפרק את הבעיה לחלקים קטנים יותר.',
  'לא לדאוג, זו שאלה מאתגרת. ננסה לחשוב על המקרה הפשוט ביותר קודם.',
  'קח נשימה, אתה מתמודד יפה. בוא נחשוב על דוגמה קטנה.',
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function analyzeMessage(message) {
  const lower = message.toLowerCase();

  const patterns = {
    approach: /hash|map|sort|מיון|מערך|array|pointer|מצביע|stack|queue|tree|עץ|graph|heap|trie|bfs|dfs|רקורסי|recursion|dynamic|dp|greedy|חמדן|sliding|חלון|binary search|חיפוש בינארי/i,
    help: /עזרה|רמז|hint|help|לא יודע|מבולבל|תעזור|תסביר/i,
    stuck: /תקוע|stuck|לא מצליח|לא מבין|קשה|מסובך|אין לי מושג/i,
    complexity: /סיבוכיות|complexity|O\(|time|space|זמן|זיכרון|מקום/i,
    code: /def |return |for |while |if |class |import |print|פונקציה|לולאה|תנאי|קוד/i,
  };

  for (const [key, regex] of Object.entries(patterns)) {
    if (regex.test(lower)) return key;
  }
  return 'default';
}

function buildResponse(type, problem) {
  const topic = problem.topic.toLowerCase();

  switch (type) {
    case 'approach': {
      const followUp = pick(PROBING_QUESTIONS);
      return (
        `גישה מעניינת! ${followUp} ` +
        `נסה לחשוב גם על המקרים הקיצוניים לפני שאתה מתחיל לכתוב קוד.`
      );
    }

    case 'help':
      return (
        `בוא ננסה לחשוב על זה ביחד. מה אתה יודע על הבעיה עד כה? ` +
        `נסה לחשוב על הדוגמה הפשוטה ביותר קודם ואיך הייתה פותר אותה ידנית. ` +
        `לפעמים זה עוזר להתחיל מ-brute force ואז לשפר.`
      );

    case 'stuck': {
      const enc = pick(ENCOURAGEMENT);
      if (topic.includes('array') || topic.includes('hash')) {
        return `${enc} חשוב על מבנה נתונים שמאפשר חיפוש מהיר – מה דעתך על Hash Map?`;
      }
      if (topic.includes('pointer')) {
        return `${enc} חשוב על טכניקת שני מצביעים – אחד מכל צד, או שניהם מתחילים מאותו מקום.`;
      }
      if (topic.includes('dynamic') || topic.includes('dp')) {
        return `${enc} בבעיות DP, השאלה המרכזית היא: מהי תת-הבעיה? נסה להגדיר מה dp[i] מייצג.`;
      }
      return `${enc} נסה קודם לפתור את הבעיה על דוגמה קטנה ביד, ואז חפש תבנית.`;
    }

    case 'complexity':
      return (
        `ניתוח סיבוכיות זה חלק קריטי בראיון! ודא שאתה מבחין בין ` +
        `Time Complexity ל-Space Complexity. האם אתה בטוח בניתוח שלך? ` +
        `נסה לחשוב על הלולאות המקוננות ועל מבני הנתונים שאתה משתמש בהם.`
      );

    case 'code':
      return (
        `טוב שאתה עובר לקוד! כמה דברים לבדוק: ` +
        `האם טיפלת בכל ה-edge cases? האם שמות המשתנים ברורים? ` +
        `הרץ את הקוד על הדוגמאות בראש ותראה אם התוצאה נכונה.`
      );

    default:
      return (
        `שאלה טובה. ספר לי יותר על הגישה שאתה חושב עליה – ` +
        `איזה אלגוריתם או מבנה נתונים אתה שוקל? ` +
        `ככל שתתקשר יותר את החשיבה שלך, כך אוכל לעזור לך יותר.`
      );
  }
}

export async function getAiResponse(problem, userMessage, code, hintsRevealed) {
  const delay = 300 + Math.random() * 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const type = analyzeMessage(userMessage);
  let response = buildResponse(type, problem);

  if (hintsRevealed && hintsRevealed.length > 0 && type === 'stuck') {
    response +=
      ' שים לב שכבר גילית ' +
      hintsRevealed.length +
      ' רמזים – נסה להשתמש בהם.';
  }

  if (code && code.trim() && code.trim() !== problem.starterCode.python && type !== 'code') {
    response += ' אני רואה שכבר התחלת לכתוב קוד – יפה! אשמח לשמוע על הלוגיקה שלך.';
  }

  return response;
}
