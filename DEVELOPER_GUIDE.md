# CodeInterview — תיק מתכנת

## תוכן עניינים
1. [סקירת המערכת](#סקירת-המערכת)
2. [ארכיטקטורה](#ארכיטקטורה)
3. [סביבות ותלויות](#סביבות-ותלויות)
4. [משתני סביבה](#משתני-סביבה)
5. [חיבור למסד הנתונים](#חיבור-למסד-הנתונים)
6. [API Endpoints](#api-endpoints)
7. [פונקציות מרכזיות](#פונקציות-מרכזיות)
8. [קטעי קוד מיוחדים](#קטעי-קוד-מיוחדים)
9. [פרומפטים ל-AI](#פרומפטים-ל-ai)
10. [גישה לאתר](#גישה-לאתר)

---

## סקירת המערכת

**CodeInterview** היא פלטפורמה להכנה לראיונות טכניים בפייתון. המשתמש פותר שאלות קידוד בזמן אמת, מנהל שיחה עם מראיין AI שמנחה אותו, ומקבל ציון על הפתרון שלו.

**כתובת Frontend:** https://b6-ten.vercel.app

**כתובת Backend:** https://b6-production.up.railway.app

---

## ארכיטקטורה

```
┌─────────────────────┐         ┌─────────────────────┐
│   Frontend (Vercel) │ ──────▶ │  Backend (Railway)  │
│   Next.js 15 (React)│  HTTP   │  Express.js (Node)  │
└─────────────────────┘         └──────────┬──────────┘
                                           │
                              ┌────────────┼────────────┐
                              │            │            │
                    ┌─────────▼──┐  ┌──────▼─────┐  ┌──▼──────────┐
                    │  Firebase  │  │ Anthropic  │  │   Judge0    │
                    │ Firestore  │  │ Claude API │  │ (Code Run)  │
                    └────────────┘  └────────────┘  └─────────────┘
```

**מבנה תיקיות:**
```
/
├── client/                  # Next.js Frontend
│   └── src/
│       ├── app/             # App Router pages
│       ├── views/           # Page components (Auth, Dashboard, etc.)
│       ├── components/      # UI components
│       ├── context/         # AppContext - ניהול state גלובלי
│       ├── services/        # API calls, AI chat, Code runner
│       └── data/            # נתוני שאלות (problemsData.js)
└── server/                  # Express Backend
    ├── routes/              # auth, chat, solutions, activity, run
    ├── db/                  # Firebase DB operations
    ├── middleware/          # auth, rateLimiter, logger, errorHandler
    ├── config/              # constants, firebase config
    └── utils/               # validators, security, response helpers
```

---

## סביבות ותלויות

### Backend
| חבילה | גרסה | שימוש |
|-------|------|-------|
| `express` | ^5.1.0 | שרת HTTP |
| `firebase-admin` | ^13.4.0 | חיבור ל-Firestore |
| `@anthropic-ai/sdk` | ^0.105.0 | Claude AI API |
| `jsonwebtoken` | ^9.0.2 | אימות JWT |
| `bcryptjs` | ^3.0.2 | הצפנת סיסמאות |
| `express-rate-limit` | ^7.1.5 | הגנה מ-DDoS |
| `cors` | ^2.8.5 | Cross-Origin headers |
| `morgan` | ^1.10.0 | Request logging |
| `dotenv` | ^16.5.0 | משתני סביבה |

### Frontend
| חבילה | גרסה | שימוש |
|-------|------|-------|
| `next` | ^15.3.3 | React Framework |
| `react` | ^19.2.6 | UI Library |
| `firebase` | ^11.10.0 | Firebase Client (Analytics) |
| `tailwindcss` | ^4.3.0 | עיצוב |
| `prismjs` | ^1.30.0 | Syntax highlighting לקוד |
| `react-simple-code-editor` | ^0.14.1 | עורך קוד |

### APIs חיצוניים
- **Anthropic Claude** — מראיין AI (claude-haiku-4-5-20251001)
- **Judge0** — הרצת קוד Python כ-fallback (`https://ce.judge0.com`)
- **Firebase Firestore** — מסד נתונים

---

## משתני סביבה

### Backend (`server/.env`)
```env
PORT=5000                          # Railway מגדיר אוטומטית
ANTHROPIC_API_KEY=sk-ant-...       # מפתח Claude API
JWT_SECRET=...                     # סוד לחתימת טוקנים
FIREBASE_PROJECT_ID=...            # מזהה פרויקט Firebase
FIREBASE_CLIENT_EMAIL=...          # כתובת Service Account
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
FRONTEND_URL=https://b6-ten.vercel.app
NODE_ENV=production
```

### Frontend (`client/.env.local`)
```env
API_URL=https://b6-production.up.railway.app   # לפרוקסי ב-next.config.mjs
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

---

## חיבור למסד הנתונים

**Firebase Firestore** — NoSQL Document Database.

### אתחול (`server/firebase.js`)
```js
export function initFirebase() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  db = admin.firestore();
}
```

תומך ב-3 אסטרטגיות חיבור:
1. `FIREBASE_SERVICE_ACCOUNT_PATH` — נתיב לקובץ JSON
2. `FIREBASE_SERVICE_ACCOUNT_JSON` — JSON כ-string
3. `FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY` — (ב-production)

### מבנה Collections ב-Firestore
```
users/
  {userId}/
    name, email, passwordHash, university, createdAt

solutions/
  {userId}_{problemId}/
    userId, problemId, score, timeSpent, code,
    testsPassed, totalTests, hintsUsed, date

activity/
  {userId}_{date}/
    userId, date, count
```

---

## API Endpoints

Base URL: `https://b6-production.up.railway.app`

### Auth
| Method | Endpoint | Auth | תיאור |
|--------|----------|------|-------|
| POST | `/api/auth/register` | ✗ | הרשמת משתמש חדש |
| POST | `/api/auth/login` | ✗ | התחברות |
| GET | `/api/auth/me` | ✓ | פרטי המשתמש המחובר |
| GET | `/api/health` | ✗ | בדיקת תקינות השרת |

**POST /api/auth/register**
```json
// Request
{ "name": "ישראל ישראלי", "email": "user@example.com", "password": "Pass1234", "university": "TAU" }
// Response 201
{ "token": "eyJ...", "user": { "id": "...", "name": "...", "email": "..." } }
```

**POST /api/auth/login**
```json
// Request
{ "email": "user@example.com", "password": "Pass1234" }
// Response 200
{ "token": "eyJ...", "user": { "id": "...", "name": "...", "email": "..." } }
```

### Solutions
| Method | Endpoint | Auth | תיאור |
|--------|----------|------|-------|
| GET | `/api/solutions` | ✓ | כל הפתרונות של המשתמש |
| POST | `/api/solutions/:problemId` | ✓ | שמירה/עדכון פתרון |

**POST /api/solutions/:problemId**
```json
// Request
{ "score": 85, "timeSpent": 420, "code": "def solution(n): ...", "testsPassed": 4, "totalTests": 5, "hintsUsed": 1 }
// Response 200
{ "problemId": 1, "score": 85, "timeSpent": 420, "date": "2026-06-26T..." }
```

### Activity
| Method | Endpoint | Auth | תיאור |
|--------|----------|------|-------|
| GET | `/api/activity` | ✓ | לוג פעילות יומית |
| POST | `/api/activity` | ✓ | רישום פעילות ליום |

**POST /api/activity**
```json
// Request
{ "date": "2026-06-26" }
// Response 200
{ "userId": "...", "date": "2026-06-26", "count": 1 }
```

### Chat (AI Interviewer)
| Method | Endpoint | Auth | תיאור |
|--------|----------|------|-------|
| POST | `/api/chat` | ✓ | שליחת הודעה למראיין AI |

**POST /api/chat**
```json
// Request
{
  "problem": { "title": "Two Sum", "titleHe": "...", "difficulty": "easy", "topic": "arrays", "descriptionHe": "..." },
  "messages": [{ "role": "user", "content": "אני חושב להשתמש ב-hash map" }],
  "code": "def twoSum(nums, target):\n    pass",
  "hintsRevealed": []
}
// Response 200
{ "reply": "מעולה! איך בדיוק תשתמש ב-hash map? מה תאחסן כמפתח ומה כערך?" }
```

### Code Runner
| Method | Endpoint | Auth | תיאור |
|--------|----------|------|-------|
| POST | `/api/run` | ✓ | הרצת קוד Python עם test cases |

**POST /api/run**
```json
// Request
{
  "code": "def twoSum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target-n], i]\n        seen[n] = i",
  "testCases": [{ "inputs": [[2,7,11,15], 9], "expected": [0,1] }],
  "functionName": "twoSum"
}
// Response 200
{ "success": true, "results": [{ "id": 0, "passed": true, "actual": "[0, 1]", "expected": "[0, 1]" }] }
```

---

## פונקציות מרכזיות

### Backend

#### `signToken(userId)` — `server/routes/auth.js`
יוצר JWT שתקף ל-7 ימים.
```js
function signToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}
```

#### `initFirebase()` — `server/firebase.js`
מאתחל את Firebase Admin SDK עם credentials מהסביבה.

#### `getDb()` — `server/firebase.js`
מחזיר את instance של Firestore. זורק שגיאה אם לא אותחל.

#### Rate Limiters — `server/middleware/rateLimiter.js`
- `loginLimiter` — 5 ניסיונות לכל 15 דקות
- `registerLimiter` — 3 הרשמות לכל שעה
- `chatLimiter` — 30 הודעות לדקה

### Frontend

#### `request(path, options, retries)` — `client/src/services/api.js`
פונקציית HTTP בסיסית עם:
- הוספת JWT token אוטומטית
- Retry עד 2 פעמים עם backoff (0s, 1s, 2s)
- טיפול ב-401 (ניקוי token)

#### `runCode(code, testCases, functionName)` — `client/src/services/codeRunner.js`
מריץ קוד Python עם מנגנון fallback:
1. **ניסיון ראשון** — שרת Express מקומי (`/api/run`)
2. **אם נכשל** — Judge0 Public API

#### `getAiResponse(problem, userMessage, code, hintsRevealed, history)` — `client/src/services/aiChat.js`
שולח הודעה ל-Claude API דרך ה-backend.

#### `AppProvider` / `useApp()` — `client/src/context/AppContext.jsx`
ניהול state גלובלי באמצעות `useReducer`:
- `isLoggedIn`, `user`, `solutions`, `activityLog`, `session`
- Actions: `AUTH_READY`, `LOGOUT`, `START_SESSION`, `SUBMIT_SOLUTION`, ועוד
- מספק: `login`, `register`, `logout`, `startSession`, `submitSolution`, `getStats`, `getTopicMastery`

---

## קטעי קוד מיוחדים

### Python Test Harness
הלב של מנגנון ריצת הקוד — משמש גם ב-backend וגם ב-Judge0 fallback. מריץ את הפונקציה של המשתמש על כל test case ואוסף תוצאות:

```python
from __future__ import annotations
{user_code}

import json as _json
_test_cases = _json.loads("""{test_cases_json}""")
_results = []
for _i, _tc in enumerate(_test_cases):
    try:
        _result = {function_name}(*_tc["inputs"])
        _passed = _result == _tc["expected"]
        _results.append({
            "id": _i, "passed": _passed,
            "actual": repr(_result), "expected": repr(_tc["expected"]),
            "inputs": repr(_tc["inputs"])
        })
    except Exception as _e:
        _results.append({
            "id": _i, "passed": False,
            "error": str(_e), "expected": repr(_tc["expected"]),
            "inputs": repr(_tc["inputs"])
        })
print("__TEST_RESULTS__" + _json.dumps(_results))
```

> ה-marker `__TEST_RESULTS__` משמש להפרדה בין פלט המשתמש לתוצאות הטסטים. נעשה שימוש ב-`lastIndexOf` כדי למנוע זיוף תוצאות.

### Next.js Proxy לBackend (`client/next.config.mjs`)
כל בקשה ל-`/api/*` מה-frontend מועברת אוטומטית לbackend:
```js
async rewrites() {
  return [{
    source: '/api/:path*',
    destination: `${process.env.API_URL || 'http://localhost:5000'}/api/:path*`,
  }];
}
```

### Firebase Credential Loading (`server/firebase.js`)
```js
function loadServiceAccount() {
  // אסטרטגיה 1: קובץ JSON
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) { ... }
  // אסטרטגיה 2: JSON כ-string
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) { ... }
  // אסטרטגיה 3: משתנים נפרדים (Production)
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
  return {
    project_id: FIREBASE_PROJECT_ID,
    client_email: FIREBASE_CLIENT_EMAIL,
    private_key: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // שחזור newlines
  };
}
```

---

## פרומפטים ל-AI

### System Prompt — מראיין טכני
הפרומפט נשלח ל-Claude עם כל הודעה בצ'אט:

```
אתה מראיין טכני בעברית לתפקיד מפתח תוכנה. אתה מנהל ראיון קידוד על הבעיה הבאה:

שם הבעיה: {title} ({titleHe})
רמת קושי: {difficulty}
נושא: {topic}
תיאור: {descriptionHe}
דוגמאות: [...]
אילוצים: [...]

הנחיות:
- דבר אך ורק בעברית
- אל תיתן את הפתרון ישירות - הנחה את המשתמש להגיע אליו בעצמו
- שאל שאלות בוחנות על סיבוכיות זמן ומקום
- עודד חשיבה על edge cases
- כשהמשתמש תקוע, תן רמז קטן בלבד
- היה מעודד אך מקצועי
- אם המשתמש כבר קיבל רמזים, אל תחזור עליהם - המשך מהם קדימה

רמזים שהמשתמש כבר קיבל: [...]
הקוד הנוכחי של המשתמש: [...]
```

### הודעת פתיחה (Initial Message)
```
שלום! אני המראיין שלך היום. נעבוד יחד על "{title}" – {titleHe}.
קח רגע לקרוא את השאלה ואז ספר לי על הגישה שאתה חושב לנקוט.
אל תקפוץ ישר לקוד – אני רוצה לשמוע את תהליך החשיבה שלך.
```

**מודל:** `claude-haiku-4-5-20251001` | **Max Tokens:** 400

---

## גישה לאתר

**כתובת:** https://b6-ten.vercel.app

| שדה | ערך |
|-----|-----|
| אימייל | adirav96@hotmail.com |
| סיסמה | 123456 |
