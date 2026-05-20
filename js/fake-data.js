/** נתוני דמה — MyInterviewBot */
const FAKE_USER = {
  name: 'דנה כהן',
  email: 'dana.cohen@student.ac.il',
  streak: 5,
  interviewsDone: 12,
  avgScore: 78,
  hoursPracticed: 8.5,
};

const FAKE_STATS = [
  { label: 'ראיונות השבוע', value: '4', icon: '📋' },
  { label: 'ממוצע ציון', value: '78%', icon: '⭐' },
  { label: 'רצף ימים', value: '5', icon: '🔥' },
  { label: 'שעות תרגול', value: '8.5', icon: '⏱' },
];

const FAKE_RECENT = [
  { title: 'Two Sum', topic: 'מערכים', score: 85, date: '18.05.2026' },
  { title: 'Valid Parentheses', topic: 'מחסניות', score: 72, date: '17.05.2026' },
  { title: 'Binary Tree Level Order', topic: 'עצים', score: 90, date: '15.05.2026' },
];

const FAKE_INTERVIEWS = [
  { id: 1, title: 'Two Sum', topic: 'arrays', topicHe: 'מערכים', level: 'junior', duration: 45, difficulty: 'קל', done: true },
  { id: 2, title: 'Longest Substring Without Repeating', topic: 'strings', topicHe: 'מחרוזות', level: 'mid', duration: 50, difficulty: 'בינוני', done: false },
  { id: 3, title: 'Merge Intervals', topic: 'arrays', topicHe: 'מערכים', level: 'mid', duration: 55, difficulty: 'בינוני', done: false },
  { id: 4, title: 'Invert Binary Tree', topic: 'trees', topicHe: 'עצים', level: 'junior', duration: 40, difficulty: 'קל', done: true },
  { id: 5, title: 'LRU Cache', topic: 'trees', topicHe: 'מבני נתונים', level: 'mid', duration: 60, difficulty: 'קשה', done: false },
];

const FAKE_PROBLEM = {
  title: 'Two Sum',
  description:
    'נתון מערך של מספרים שלמים nums ומספר שלם target.\n' +
    'החזירו אינדקסים של שני מספרים כך שסכומם שווה ל-target.\n' +
    'אפשר להניח שיש בדיוק פתרון אחד, ולא ניתן להשתמש באותו אלמנט פעמיים.',
  examples:
    'דוגמה:\n' +
    'Input: nums = [2,7,11,15], target = 9\n' +
    'Output: [0,1]\n\n' +
    'הסבר: nums[0] + nums[1] == 9',
  starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # כתבו את הפתרון כאן
    pass

# בדיקה מהירה
print(two_sum([2, 7, 11, 15], 9))`,
};

const FAKE_CHAT = [
  { role: 'ai', text: 'שלום! אני המראיין שלך היום ב-MyInterviewBot. נתחיל ב-Two Sum. ספרו לי בקצרה מה הגישה שלכם לפני שתכתבו קוד.' },
  { role: 'user', text: 'חשבתי על מילון — לכל מספר לשמור את ההפרש מ-target.' },
  { role: 'ai', text: 'מצוין. מה המורכבות בזמן ובזיכרון? ומה קורה אם יש כפילויות?' },
];

const FAKE_FEEDBACK = {
  title: 'Two Sum',
  overall: 85,
  minutes: 38,
  hints: 1,
  bullets: [
    'זיהיתם נכון גישת Hash Map — יעיל ל-O(n).',
    'כדאי לנסח בקול את מקרי הקצה (מערך ריק, אין פתרון) לפני הקוד.',
    'הקוד עבר את כל הבדיקות; שקלו להוסיף type hints עקביים.',
    'תקשורת טובה — עניתם על שאלות המשך בבהירות.',
  ],
};

const FAKE_SKILLS = [
  { name: 'מערכים ומחרוזות', pct: 82 },
  { name: 'מחסניות ותורים', pct: 70 },
  { name: 'עצים וגרפים', pct: 55 },
  { name: 'מורכבות וניתוח', pct: 75 },
];

const FAKE_BADGES = ['🎯 5 ראיונות', '🐍 Python Pro', '🔥 רצף שבוע', '💬 תקשורת מעולה'];

const FAKE_MENTOR_TIP =
  'המנטור ממליץ לחזק תרגול בעצים — הציון הממוצע שלך שם 55%. התחילו ב-"Invert Binary Tree" לפני מבחני חברות גדולות.';

const FAKE_AI_HINT = 'רמז: חשבו על מבנה נתונים שמאפשר חיפוש ב-O(1) לפי ערך שכבר ראיתם.';
