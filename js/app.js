/** ניווט ורינדור — MyInterviewBot */
let currentInterviewId = 1;
let sessionUser = null;

const AUTH_SCREENS = ['home', 'login', 'register'];

function getUserName() {
  if (sessionUser && sessionUser.name) return sessionUser.name;
  return typeof FAKE_USER !== 'undefined' && FAKE_USER.name ? FAKE_USER.name : 'אורח';
}

function go(screen) {
  try {
    document.querySelectorAll('[data-screen]').forEach((el) => el.classList.remove('active'));
    const target = document.querySelector(`[data-screen="${screen}"]`);
    if (!target) {
      console.error('מסך לא נמצא:', screen);
      return;
    }
    target.classList.add('active');

    const showNav = !AUTH_SCREENS.includes(screen);
    const nav = document.getElementById('app-nav');
    if (nav) nav.classList.toggle('hidden', !showNav);

    const navUser = document.getElementById('nav-user');
    if (navUser) navUser.textContent = showNav ? getUserName() : '';

    if (screen === 'register') showRegisterError('');
    if (screen === 'dashboard') renderDashboard();
    if (screen === 'catalog') renderCatalog();
    if (screen === 'room') renderRoom();
    if (screen === 'feedback') renderFeedback();
    if (screen === 'profile') renderProfile();

    window.scrollTo(0, 0);
  } catch (err) {
    console.error('שגיאה במעבר למסך', screen, err);
    alert('אירעה שגיאה בטעינת המסך. פתחו את הקונסול (F12) לפרטים.');
  }
}

function handleLogin(event) {
  if (event) event.preventDefault();
  go('dashboard');
  return false;
}

function showRegisterError(message) {
  const el = document.getElementById('register-error');
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.classList.remove('hidden');
  } else {
    el.textContent = '';
    el.classList.add('hidden');
  }
}

function handleRegister(event) {
  if (event) event.preventDefault();

  const firstName = document.getElementById('register-first-name')?.value.trim() || '';
  const lastName = document.getElementById('register-last-name')?.value.trim() || '';
  const email = document.getElementById('register-email')?.value.trim() || '';
  const password = document.getElementById('register-password')?.value || '';
  const semester = document.getElementById('register-semester')?.value || '';

  if (!firstName || !lastName) {
    showRegisterError('נא למלא שם פרטי ושם משפחה.');
    return false;
  }
  if (!email || !email.includes('@')) {
    showRegisterError('נא להזין כתובת אימייל תקינה.');
    return false;
  }
  if (password.length < 6) {
    showRegisterError('הסיסמה חייבת להכיל לפחות 6 תווים.');
    return false;
  }
  const semesterNum = Number(semester);
  if (!semester || semesterNum < 1 || semesterNum > 8) {
    showRegisterError('נא לבחור סמסטר בין 1 ל-8.');
    return false;
  }

  showRegisterError('');

  sessionUser = {
    name: `${firstName} ${lastName}`,
    email,
    semester: semesterNum,
  };

  if (typeof FAKE_USER !== 'undefined') {
    FAKE_USER.name = sessionUser.name;
    FAKE_USER.email = sessionUser.email;
    FAKE_USER.semester = sessionUser.semester;
  }

  go('dashboard');
  return false;
}

function renderDashboard() {
  const dashName = document.getElementById('dash-name');
  if (dashName) dashName.textContent = getUserName().split(' ')[0];

  const statsGrid = document.getElementById('stats-grid');
  if (statsGrid && typeof FAKE_STATS !== 'undefined') {
    statsGrid.innerHTML = FAKE_STATS.map(
      (s) => `
      <div class="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
        <span class="text-2xl">${s.icon}</span>
        <div>
          <p class="text-2xl font-bold">${s.value}</p>
          <p class="text-xs text-slate-500">${s.label}</p>
        </div>
      </div>`
    ).join('');
  }

  const recentSessions = document.getElementById('recent-sessions');
  if (recentSessions && typeof FAKE_RECENT !== 'undefined') {
    recentSessions.innerHTML = FAKE_RECENT.map(
      (r) => `
      <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50">
        <div>
          <p class="font-medium text-sm">${r.title}</p>
          <p class="text-xs text-slate-500">${r.topic} · ${r.date}</p>
        </div>
        <span class="text-sm font-semibold text-brand-600">${r.score}%</span>
      </div>`
    ).join('');
  }

  const mentorTip = document.getElementById('mentor-tip');
  if (mentorTip && typeof FAKE_MENTOR_TIP !== 'undefined') {
    mentorTip.textContent = FAKE_MENTOR_TIP;
  }
}

function renderCatalog() {
  const levelEl = document.getElementById('filter-level');
  const topicEl = document.getElementById('filter-topic');
  const cardsEl = document.getElementById('interview-cards');
  if (!cardsEl || typeof FAKE_INTERVIEWS === 'undefined') return;

  const level = levelEl ? levelEl.value : 'all';
  const topic = topicEl ? topicEl.value : 'all';
  const filtered = FAKE_INTERVIEWS.filter(
    (i) => (level === 'all' || i.level === level) && (topic === 'all' || i.topic === topic)
  );

  cardsEl.innerHTML = filtered
    .map(
      (i) => `
    <article class="bg-white rounded-2xl border border-slate-200 p-5 hover:border-brand-300 transition flex flex-col">
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs px-2 py-0.5 rounded-full ${
          i.level === 'junior' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
        }">${i.level}</span>
        ${i.done ? '<span class="text-xs text-green-600">✓ הושלם</span>' : ''}
      </div>
      <h3 class="font-semibold text-lg mb-1">${i.title}</h3>
      <p class="text-sm text-slate-500 mb-4">${i.topicHe} · ${i.difficulty} · ${i.duration} דק׳</p>
      <button type="button" onclick="startInterview(${i.id})" class="mt-auto py-2 bg-brand-600 text-white rounded-lg text-sm font-medium hover:bg-brand-700">
        ${i.done ? 'תרגל שוב' : 'התחל ראיון'}
      </button>
    </article>`
    )
    .join('');
}

function startInterview(id) {
  currentInterviewId = id;
  if (typeof FAKE_INTERVIEWS !== 'undefined' && typeof FAKE_PROBLEM !== 'undefined') {
    const item = FAKE_INTERVIEWS.find((x) => x.id === id);
    if (item) FAKE_PROBLEM.title = item.title;
  }
  go('room');
}

function renderRoom() {
  if (typeof FAKE_INTERVIEWS === 'undefined' || typeof FAKE_PROBLEM === 'undefined') return;

  const item = FAKE_INTERVIEWS.find((x) => x.id === currentInterviewId) || FAKE_INTERVIEWS[0];

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('room-title', FAKE_PROBLEM.title);
  setText('room-meta', `${item.topicHe} · ${item.difficulty}`);
  setText('problem-title', FAKE_PROBLEM.title);
  setText('problem-desc', FAKE_PROBLEM.description);
  setText('problem-examples', FAKE_PROBLEM.examples);
  setText('code-editor', FAKE_PROBLEM.starterCode);

  const chatEl = document.getElementById('chat-messages');
  if (chatEl && typeof FAKE_CHAT !== 'undefined') {
    chatEl.innerHTML = FAKE_CHAT.map(
      (m) => `
      <div class="flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}">
        <div class="max-w-[85%] px-3 py-2 rounded-2xl text-sm ${
          m.role === 'user' ? 'bg-white border border-slate-200' : 'bg-brand-600 text-white'
        }">${m.text}</div>
      </div>`
    ).join('');
  }
}

function renderFeedback() {
  if (typeof FAKE_FEEDBACK === 'undefined') return;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('feedback-subtitle', `${FAKE_FEEDBACK.title} · 18.05.2026`);
  setText('score-overall', `${FAKE_FEEDBACK.overall}%`);
  setText('score-time', String(FAKE_FEEDBACK.minutes));
  setText('score-hints', String(FAKE_FEEDBACK.hints));

  const bulletsEl = document.getElementById('feedback-bullets');
  if (bulletsEl) {
    bulletsEl.innerHTML = FAKE_FEEDBACK.bullets
      .map((b) => `<li class="flex gap-2"><span class="text-brand-600">•</span>${b}</li>`)
      .join('');
  }
}

function renderProfile() {
  const skillsEl = document.getElementById('skills-bars');
  if (skillsEl && typeof FAKE_SKILLS !== 'undefined') {
    skillsEl.innerHTML = FAKE_SKILLS.map(
      (s) => `
      <div>
        <div class="flex justify-between text-sm mb-1">
          <span>${s.name}</span>
          <span class="text-slate-500">${s.pct}%</span>
        </div>
        <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-brand-600 rounded-full" style="width:${s.pct}%"></div>
        </div>
      </div>`
    ).join('');
  }

  const badgesEl = document.getElementById('badges');
  if (badgesEl && typeof FAKE_BADGES !== 'undefined') {
    badgesEl.innerHTML = FAKE_BADGES.map(
      (b) => `<span class="px-3 py-1.5 bg-brand-50 text-brand-800 rounded-full text-sm">${b}</span>`
    ).join('');
  }
}

function initApp() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  const filterLevel = document.getElementById('filter-level');
  if (filterLevel) filterLevel.addEventListener('change', renderCatalog);

  const filterTopic = document.getElementById('filter-topic');
  if (filterTopic) filterTopic.addEventListener('change', renderCatalog);

  const chatSend = document.getElementById('chat-send');
  if (chatSend) {
    chatSend.addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      if (!input || typeof FAKE_CHAT === 'undefined' || typeof FAKE_AI_HINT === 'undefined') return;
      const text = input.value.trim();
      if (!text) return;
      FAKE_CHAT.push({ role: 'user', text });
      FAKE_CHAT.push({ role: 'ai', text: FAKE_AI_HINT });
      input.value = '';
      renderRoom();
    });
  }

  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('chat-send')?.click();
      }
    });
  }

  if (typeof FAKE_USER === 'undefined') {
    console.warn('fake-data.js לא נטען — בדקו שהקובץ js/fake-data.js קיים באותה תיקייה');
  }

  go('home');
}

window.go = go;
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.startInterview = startInterview;

document.addEventListener('DOMContentLoaded', initApp);
