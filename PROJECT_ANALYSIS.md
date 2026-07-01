# CodeInterview — דוח סיכום וניתוח קוד

> פרויקט גמר | קורס פיתוח Web מתקדם | שנה ד' הנדסת תוכנה

---

## 1. מיפוי נושאי הקורס לקוד

### ✅ HTML
**היכן:** כל קובץ JSX הוא למעשה HTML מורחב. הממשק כולו בנוי בתחביר JSX.
- `client/src/views/InterviewSession.jsx` — מבנה ה-layout המורכב: פאנל שמאל (שאלה/צ'אט/רמזים) + עורך קוד + פאנל תוצאות
- `client/src/views/Auth.jsx` — טופס login/register
- `client/src/app/layout.jsx` — מבנה HTML ראשי עם `<html lang="he" dir="rtl">`

---

### ✅ Tailwind CSS
**היכן:** כל הסגנון במערכת מבוסס Tailwind בלבד, ללא קובץ CSS ייעודי (מלבד `globals.css`).
- `client/src/views/InterviewSession.jsx` — layout מורכב: `flex flex-col lg:flex-row`, responsive breakpoints, dark mode (`dark:bg-gray-800`)
- `client/src/views/Dashboard.jsx` — grid cards: `grid grid-cols-1 md:grid-cols-4 gap-6`
- `client/src/components/Navbar.jsx` — sticky navbar עם `fixed top-0`
- Tailwind v4 (PostCSS plugin) מוגדר ב-`client/postcss.config.mjs`

---

### ✅ JavaScript (ES Modules)
**היכן:** כל הפרויקט כתוב ב-JavaScript מודרני (ES2022+).
- `server/server.js` — שרת Express עם `import/export` (type: module ב-package.json)
- `client/src/services/api.js` — async/await, closure, retry logic
- `client/src/services/codeRunner.js` — Promise chaining, try/catch fallback pattern
- `client/src/context/AppContext.jsx` — `useReducer`, `useCallback`, closures

---

### ❌ TypeScript
**לא מומש.** הפרויקט כולו ב-JavaScript רגיל. ראו סעיף פערים.

---

### ✅ Dynamic Web Pages
**היכן:** הדפים הם דינמיים לחלוטין — תוכן משתנה לפי state, משתמש ונתונים מה-API.
- `client/src/views/Dashboard.jsx` — כל הנתונים (ציון ממוצע, שאלות שנפתרו, נושאים חלשים) מחושבים דינמית מה-state
- `client/src/views/InterviewSession.jsx` — הטיימר מתעדכן כל שנייה, תוצאות הטסטים מופיעות בזמן אמת, הצ'אט מתעדכן באופן אסינכרוני
- `client/src/app/layout.jsx` — Next.js App Router עם Server/Client Components

---

### ✅ React
**היכן:** כל ה-Frontend בנוי על React 19 עם Next.js 15.
- כל קובץ ב-`client/src/views/` ו-`client/src/components/` הוא React component
- `client/src/components/Providers.jsx` — עטיפת ה-App ב-AppProvider + AppShell
- `client/src/context/AppContext.jsx` — Context API לניהול state גלובלי

---

### ✅ React Hooks
**היכן:** שימוש נרחב ב-hooks מובנים ומותאמים אישית:

| Hook | קובץ | שימוש |
|------|------|-------|
| `useState` | `InterviewSession.jsx` | `activeTab`, `chatInput`, `aiLoading`, `runLoading`, `submitLoading`, `elapsed`, `simTimeLeft` |
| `useEffect` | `InterviewSession.jsx` | אתחול session, טיימר, גלילה אוטומטית לתחתית הצ'אט, simulation mode |
| `useReducer` | `AppContext.jsx` | ניהול state מורכב עם 12+ action types |
| `useContext` | `AppContext.jsx` | דרך `useApp()` בכל component שצריך state גלובלי |
| `useCallback` | `AppContext.jsx` | אופטימיזציה של פונקציות: `login`, `register`, `submitSolution` |
| `useMemo` | `Dashboard.jsx` | חישוב `weakTopics` ו-`weeklyCount` רק כשה-solutions משתנות |
| `useRef` | `InterviewSession.jsx` | `chatEndRef` לגלילה, `initializedRef` למניעת double-init |
| `useParams` | `InterviewSession.jsx` | קריאת `problemId` מה-URL |
| `useRouter` | `InterviewSession.jsx`, `Dashboard.jsx` | ניווט פרוגרמטי |
| `usePathname` | `AppShell.jsx` | הסתרת Navbar בדפי Landing/Login |

**Custom Hooks:**
- `useDarkMode()` — `client/src/hooks/useDarkMode.js` — ניהול מצב dark mode עם localStorage
- `useLogout()` — `client/src/hooks/useLogout.js` — ניקוי token וניתוב

---

### ✅ Architecture
**היכן:** הפרויקט מיישם ארכיטקטורת Client-Server מלאה עם הפרדה ברורה:

```
Frontend (Next.js/Vercel)  →  Backend (Express/Railway)  →  Firebase Firestore
                                      ↓
                               Anthropic Claude API
                                      ↓
                                Judge0 API (fallback)
```

- **MVC-like בשרת:** routes (`/routes/*.js`) = Controller, DB (`/db/*.js`) = Model
- **Provider Pattern בלקוח:** `AppContext.jsx` = single source of truth
- **Middleware Chain:** `auth.js` → `rateLimiter.js` → route handler → `errorHandler.js`
- **Proxy Pattern:** Next.js מפנה `/api/*` לשרת דרך `next.config.mjs`

---

### ✅ API
**שני סוגי API:**

**REST API (עצמי):**
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/solutions`, `POST /api/solutions/:problemId`
- `GET /api/activity`, `POST /api/activity`
- `POST /api/chat`, `POST /api/run`, `GET /api/health`

**APIs חיצוניים:**
- **Anthropic Claude** (`@anthropic-ai/sdk`) — `server/routes/chat.js`
- **Judge0 Public API** — `client/src/services/codeRunner.js` (fallback)
- **Firebase Admin SDK** — `server/firebase.js`

---

### ✅ Gen AI
**היכן:** שילוב Claude AI כ"מראיין טכני" חכם.
- `server/routes/chat.js` — קריאה ל-`client.messages.create()` עם Anthropic SDK
- `server/config/constants.js` — מודל: `claude-haiku-4-5-20251001`, max_tokens: 400
- `client/src/services/aiChat.js` — `getAiResponse()`, `getInitialMessage()`
- System prompt דינמי: מותאם לכל שאלה, כולל קוד המשתמש ורמזים שנחשפו

---

### ❌ MongoDB
**לא מומש.** הפרויקט משתמש ב-**Firebase Firestore** במקום. ראו סעיף פערים.

---

### ✅ Express
**היכן:** כל ה-Backend בנוי על Express.js 5.
- `server/server.js` — אתחול האפליקציה, middlewares, routes
- `server/routes/*.js` — 5 routers: auth, solutions, activity, chat, run
- `server/middleware/` — auth JWT, rate limiting, error handler, logger

---

### ❌ FastAPI / NestJS
**לא מומשו.** הפרויקט בחר ב-Express בלבד. ראו סעיף פערים.

---

### ❌ WebSocket
**לא מומש.** הצ'אט עובד ב-HTTP request/response רגיל. ראו סעיף פערים.

---

### ❌ P2P
**לא מומש** — לא רלוונטי לפונקציונליות הנוכחית.

---

## 2. קשר בין UI לקוד — 4 אלמנטים מרכזיים

### 🗨️ אלמנט 1: חלונית הצ'אט עם מראיין AI

**קובץ:** `client/src/views/InterviewSession.jsx` (שורות 287–330)
**קומפוננטה עזר:** `client/src/components/ChatBubble.jsx`

**לוגיקה עסקית:**
```
משתמש מקליד הודעה
    → handleSendMessage()
    → addChatMessage('user', text)  [מעדכן AppContext state]
    → getAiResponse(problem, text, code, hints, history)  [aiChat.js]
        → POST /api/chat
            → Claude API [chat.js בשרת]
                → system prompt דינמי
    → addChatMessage('ai', response)  [מעדכן state]
    → useEffect גורם לגלילה אוטומטית [chatEndRef]
```

**Hooks בשימוש:**
- `useState` — `chatInput`, `aiLoading`
- `useRef` — `chatEndRef` לגלילה אוטומטית (`scrollIntoView`)
- `useEffect` — מאזין ל-`session.chatMessages.length` וגולל למטה
- `useApp()` — `addChatMessage`, `session.chatMessages`, `session.hintsRevealed`

**אנימציית loading:** שלושה נקודות קופצות (CSS `animate-bounce` עם `animationDelay`)

---

### ✏️ אלמנט 2: עורך הקוד

**קובץ:** `client/src/views/InterviewSession.jsx` (שורות 369–389)
**ספרייה:** `react-simple-code-editor` + `prismjs`

**לוגיקה עסקית:**
```
משתמש מקליד קוד
    → onValueChange={updateSessionCode}
        → dispatch({ type: 'UPDATE_SESSION_CODE', payload: code })  [AppContext]
            → state.session.code מתעדכן
```

**Syntax Highlighting:**
```js
highlight={(c) => Prism.highlight(c, Prism.languages.python, 'python')}
```
PrismJS מחזיר HTML עם `<span>` לצבעים, והעורך מרנדר אותו.

**חיבור לשרת:** הקוד מהstate נשלח ב:
- `handleRun()` → `runCode(session.code, ...)` → `POST /api/run`
- `handleSendMessage()` → נשלח ל-Claude כ-context
- `handleSubmit()` → `runCode()` + חישוב ציון + `submitSolution()`

**Hooks בשימוש:**
- `useApp()` — `session.code` (קריאה), `updateSessionCode` (כתיבה)

---

### ⏱️ אלמנט 3: הטיימר

**קובץ:** `client/src/views/InterviewSession.jsx`

**שני טיימרים מקבילים:**

**טיימר אישי** (זמן שהמשתמש השקיע בשאלה):
```js
useEffect(() => {
  if (!session?.startTime) return;
  const tick = () => setElapsed(Math.floor((Date.now() - session.startTime) / 1000));
  tick();
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);   // cleanup למניעת memory leak
}, [session?.startTime]);
```
הזמן מוצג: `formatTime(elapsed)` → `MM:SS`
משמש בחישוב הציון: `timeBonus = Math.max(0, 30 - Math.floor(timeMinutes))`

**טיימר סימולציה** (countdown 45 דקות):
```js
useEffect(() => {
  if (!simSession) return;
  const id = setInterval(() => {
    const el = Math.floor((Date.now() - simSession.startTime) / 1000);
    setSimTimeLeft(Math.max(0, 45 * 60 - el));
  }, 1000);
  return () => clearInterval(id);
}, [simSession]);
```
כשנשארות פחות מ-5 דקות: `simUrgent = simTimeLeft < 300` → הטיימר הופך לאדום ומהבהב (`animate-pulse`)

**sessionStorage** משמש לשמירת מצב הסימולציה בין דפים.

---

### 🏃 אלמנט 4: כפתור הרצה + ציון אוטומטי

**קובץ:** `client/src/views/InterviewSession.jsx` (שורות 127–174)
**שירות:** `client/src/services/codeRunner.js`

**זרימת הרצה:**
```
לחיצה על "הרצה"
    → handleRun()
    → runCode(code, testCases, functionName)  [codeRunner.js]
        1. runLocal() → POST /api/run → Python subprocess בשרת
           אם נכשל (503):
        2. runJudge0() → https://ce.judge0.com/submissions
    → setTestResults(results)  [AppContext]
    → UI מציג ✓/✗ לכל test case
```

**חישוב ציון בהגשה:**
```js
// 70% מהטסטים + בונוס מהירות עד 30 נק' - 5 נק' לכל רמז
const timeBonus = Math.max(0, 30 - Math.floor(timeMinutes));
const hintPenalty = (session.hintsRevealed?.length || 0) * 5;
const score = Math.max(0, Math.min(100,
  Math.round((testsPassed / totalTests) * 70 + timeBonus - hintPenalty)
));
```

**Python Test Harness** (גם בשרת וגם ב-Judge0):
```python
print("__TEST_RESULTS__" + json.dumps(results))
```
ה-marker `__TEST_RESULTS__` מבדיל בין פלט המשתמש לתוצאות הטסטים. `lastIndexOf` מונע זיוף.

---

## 3. נושאי קורס קריטיים בקוד

### 🔐 מנגנוני אבטחה

**JWT Authentication** (`server/middleware/auth.js`, `server/routes/auth.js`):
- Token נחתם עם `JWT_SECRET` ותקף ל-7 ימים
- כל route מוגן עם `auth` middleware חוץ מ-`/register` ו-`/login`
- Token מאוחסן ב-localStorage, נשלח כ-`Authorization: Bearer ...`

**סיסמאות** (`server/db/users.js`):
- הצפנה עם `bcryptjs` — סיסמאות לא מאוחסנות בטקסט גלוי

**Rate Limiting** (`server/middleware/rateLimiter.js`):
- Login: 5 ניסיונות / 15 דקות
- Register: 3 ניסיונות / שעה
- Chat: 30 הודעות / דקה

**Prompt Injection Protection** (`server/utils/security.js`):
- `escapePromptText()` מנקה קלט משתמש לפני הכנסה ל-system prompt של Claude

**CORS** (`server/server.js`):
- whitelist של origins מותרים: `localhost:3000` + `FRONTEND_URL`

---

### 🏗️ Design Patterns

**Provider Pattern** — `AppContext.jsx`:
State גלובלי אחד שכל הקומפוננטות צורכות דרך `useApp()`. מונע prop drilling.

**Strategy Pattern** — `codeRunner.js`:
שתי אסטרטגיות הרצה (local/Judge0) עם fallback אוטומטי.

**Middleware Chain** — Express:
```
Request → auth → rateLimiter → route handler → errorHandler → Response
```

**Repository Pattern** — `server/db/*.js`:
הפרדה מוחלטת בין logic לגישה לנתונים. Routes לא מכירים את Firebase ישירות.

---

### 🔄 ניהול State מורכב

`AppContext.jsx` מנהל state מורכב עם `useReducer` — 12 action types:

```
AUTH_LOADING / AUTH_READY / LOGOUT
START_SESSION / UPDATE_SESSION_CODE / CLEAR_SESSION / RESET_SESSION
ADD_CHAT_MESSAGE / REVEAL_HINT / SET_TEST_RESULTS / SUBMIT_SOLUTION
SET_SOLUTIONS / SET_ACTIVITY / ADD_SOLUTION
```

**ניהול Session בין דפים:**
- `AppContext` שומר את session ב-memory (לא נאבד בניווט בין דפים)
- Simulation state נשמר ב-`sessionStorage` (נמחק כשהטאב נסגר)
- Authentication token נשמר ב-`localStorage` (פרסיסטנטי)

---

### ⚡ החלטות ארכיטקטוניות

**Next.js Proxy** (`client/next.config.mjs`):
Frontend לא מדבר ישירות לשרת. כל `/api/*` עובר דרך Next.js rewrite.
יתרון: CORS פשוט, URL אחיד, קל להחליף backend.

**Firebase credentials בשרת בלבד:**
ה-client משתמש ב-Firebase SDK רק ל-Analytics. כל הגישה לנתונים עוברת דרך ה-Express API עם JWT. פרטי Firebase Admin לא נחשפים ל-browser.

**Retry Logic בAPI client** (`client/src/services/api.js`):
```js
async function request(path, options = {}, retries = 2) {
  // ...
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, 1000 * attempt));
    // ...
  }
}
```
מטפל ב-cold start של Firebase בשרת (עיכוב ~1 שניה בקריאה ראשונה).

---

## 4. פערים וטכנולוגיות חלופיות

### ❌ TypeScript — לא מומש
**סיבה:** הצוות בחר לעבוד מהר יותר עם JavaScript. TypeScript דורש הגדרת types לכל ממשק, מה שמאט פיתוח ראשוני.
**מה היה משתפר:** type safety ב-AppContext (כל action), ב-API responses, ובdata/problemsData.js שמכיל ~100 שאלות.

---

### ❌ MongoDB → Firebase Firestore
**סיבה:** Firebase Firestore הוצע כפתרון מהיר לפריסה ללא הגדרת שרת DB נפרד. אין צורך ב-connection string, scaling אוטומטי, ו-free tier נדיב.
**מה שהפסדנו:** אין תמיכה מלאה ב-aggregation queries (SUM, AVG, GROUP BY). חישובי סטטיסטיקה (`getStats`, `getTopicMastery`) נעשים ב-JavaScript בצד לקוח ולא ב-DB.

---

### ❌ WebSocket → HTTP Request/Response
**סיבה:** הצ'אט עובד ב-Request/Response רגיל — המשתמש שולח הודעה, מחכה לתשובה, ממשיך. זה מספיק כי Claude מגיב תוך ~1-3 שניות ואין צורך ב-streaming דו-כיווני.
**מה היה משתפר עם WebSocket:** Streaming של תשובת Claude token-by-token (כמו ChatGPT), תחושה חיה יותר. כרגע יש loading spinner עד שהתשובה מגיעה כולה.

---

### ❌ FastAPI / NestJS — לא מומשו
**סיבה:** Express 5 כיסה את כל הצרכים. FastAPI מתאים ל-Python microservices; NestJS מתאים לפרויקטים גדולים עם dependency injection. הוספת אחד מהם הייתה overkill.

---

### ❌ P2P — לא מומש
**סיבה:** אין use case ל-P2P בפרויקט זה. כל התקשורת היא Client ↔ Server.

---

## 5. סיכום Hooks בפרויקט

| Hook | כמות שימושים | קבצים עיקריים |
|------|-------------|--------------|
| `useState` | ~15 | `InterviewSession.jsx`, `Auth.jsx`, `HintItem`, `Navbar.jsx` |
| `useEffect` | ~8 | `InterviewSession.jsx` (5 עצמאיים!), `AppContext.jsx`, `useDarkMode.js` |
| `useReducer` | 1 | `AppContext.jsx` |
| `useContext` | 1 (דרך `useApp()`) | כל קומפוננטה שצריכה state |
| `useCallback` | ~10 | `AppContext.jsx` — כל הפונקציות |
| `useMemo` | 2 | `Dashboard.jsx` |
| `useRef` | 2 | `InterviewSession.jsx` |
| `useParams` | 1 | `InterviewSession.jsx` |
| `useRouter` | 3 | `InterviewSession.jsx`, `Dashboard.jsx`, `Auth.jsx` |
| `usePathname` | 1 | `AppShell.jsx` |
| Custom: `useDarkMode` | 1 | `Navbar.jsx` |
| Custom: `useLogout` | 1 | `Navbar.jsx` |

---

## טבלת סיכום נושאי הקורס

| נושא | סטטוס | קבצים מרכזיים |
|------|--------|--------------|
| HTML | ✅ מלא | כל קבצי JSX |
| Tailwind CSS | ✅ מלא | כל קבצי views/ ו-components/ |
| JavaScript | ✅ מלא | כל הפרויקט |
| TypeScript | ❌ לא מומש | — |
| Dynamic Web Pages | ✅ מלא | InterviewSession, Dashboard |
| React | ✅ מלא | כל ה-Frontend |
| React Hooks | ✅ מלא | AppContext, InterviewSession, Dashboard |
| Architecture | ✅ מלא | server.js, AppContext, next.config.mjs |
| API | ✅ מלא | routes/*.js, services/api.js |
| Gen AI | ✅ מלא | routes/chat.js, services/aiChat.js |
| MongoDB | ❌ Firebase במקום | server/firebase.js, server/db/*.js |
| Express | ✅ מלא | server/ |
| FastAPI | ❌ לא מומש | — |
| NestJS | ❌ לא מומש | — |
| WebSocket | ❌ HTTP במקום | services/aiChat.js |
| P2P | ❌ לא רלוונטי | — |
