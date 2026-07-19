const CIRC = 603.2;
const STORAGE_KEY = 'cozyCatFocus_v2';
const LENGTH_OPTIONS = { focus: [10, 15, 25, 45], short: [3, 5, 10], long: [10, 15, 20] };
const DEFAULT_LENGTHS = { focus: 25, short: 5, long: 15 };
const BREAK_IDEAS = [
  'stretch like a cat', 'get a glass of water', 'dance for 10 seconds',
  'look out a window', 'doodle something silly', 'do 5 jumping jacks',
  'pet something soft', 'breathe deeply 3 times', 'tidy one small spot',
  'hum your favorite song',
];

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      lengths: { ...DEFAULT_LENGTHS, ...(raw.lengths || {}) },
      soundOn: raw.soundOn !== false,
      tasks: Array.isArray(raw.tasks) ? raw.tasks : [],
      currentIndex: typeof raw.currentIndex === 'number' ? raw.currentIndex : -1,
      stats: raw.stats || { date: '', todayCount: 0, streak: 0, lastStreakDate: '' },
    };
  } catch {
    return { lengths: { ...DEFAULT_LENGTHS }, soundOn: true, tasks: [], currentIndex: -1, stats: { date: '', todayCount: 0, streak: 0, lastStreakDate: '' } };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lengths, soundOn, tasks, currentIndex, stats }));
  } catch { /* localStorage unavailable (e.g. private browsing) - state just won't persist */ }
}

const state = loadState();
let { lengths, soundOn, tasks, currentIndex, stats } = state;

let modeKey = 'focus';
let total = lengths[modeKey] * 60;
let remaining = total;
let running = false;
let interval = null;
let sessions = 0;

const disp = document.getElementById('disp');
const arc = document.getElementById('arc');
const startBtn = document.getElementById('startbtn');
const toastEl = document.getElementById('toast');
const dotsEl = document.getElementById('dots');
const taskIn = document.getElementById('task-in');
const taskList = document.getElementById('task-list');
const catSvg = document.getElementById('cat-svg');
const sparkleLayer = document.getElementById('sparkle-layer');
const lengthRow = document.getElementById('length-row');
const breakCard = document.getElementById('break-card');
const breakIdeaEl = document.getElementById('break-idea');
const soundBtn = document.getElementById('sound-btn');
const currentStepEl = document.getElementById('current-step');
const nextStepBtn = document.getElementById('next-step-btn');
const stepCountEl = document.getElementById('step-count');
const streakLbl = document.getElementById('streak-lbl');
const todayLbl = document.getElementById('today-lbl');

function fmt(s) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }
function updateArc() { arc.style.strokeDashoffset = CIRC * (1 - remaining / total); }
function showToast(msg, color = '#D4537E') {
  toastEl.textContent = msg; toastEl.style.background = color;
  toastEl.classList.add('show'); setTimeout(() => toastEl.classList.remove('show'), 1800);
}
function renderDots() {
  dotsEl.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i < sessions ? ' done' : '');
    dotsEl.appendChild(d);
  }
}

function playChime() {
  if (!soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [660, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.18;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.15, start + 0.05);
      gain.gain.linearRampToValueAtTime(0, start + 0.32);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(start); osc.stop(start + 0.35);
    });
  } catch { /* Web Audio unsupported - silently skip the chime */ }
}

function spawnSparkles() {
  for (let i = 0; i < 6; i++) {
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = '✦';
    s.style.left = `${10 + Math.random() * 80}%`;
    s.style.top = `${20 + Math.random() * 40}%`;
    s.style.animationDelay = `${Math.random() * 0.2}s`;
    sparkleLayer.appendChild(s);
    setTimeout(() => s.remove(), 1100);
  }
}

function celebrate() {
  catSvg.classList.add('state-celebrate');
  spawnSparkles();
  playChime();
  setTimeout(() => {
    catSvg.classList.remove('state-celebrate');
    catSvg.setAttribute('class', modeKey === 'focus' ? 'state-focus' : 'state-break');
  }, 1200);
}

function todayStr() { return new Date().toISOString().slice(0, 10); }

function recordSessionCompletion() {
  const today = todayStr();
  if (stats.date !== today) { stats.date = today; stats.todayCount = 0; }
  stats.todayCount++;
  if (stats.lastStreakDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    stats.streak = stats.lastStreakDate === yesterday ? (stats.streak || 0) + 1 : 1;
    stats.lastStreakDate = today;
  }
  saveState();
  renderStats();
}

function renderStats() {
  const today = todayStr();
  const todayCount = stats.date === today ? stats.todayCount : 0;
  streakLbl.textContent = `🔥 ${stats.streak || 0} day streak`;
  todayLbl.textContent = `${todayCount} session${todayCount === 1 ? '' : 's'} today`;
}

function newBreakIdea() {
  breakIdeaEl.textContent = BREAK_IDEAS[Math.floor(Math.random() * BREAK_IDEAS.length)];
}

function renderLengthChips() {
  lengthRow.innerHTML = '';
  LENGTH_OPTIONS[modeKey].forEach((mins) => {
    const chip = document.createElement('button');
    chip.className = 'len-chip' + (mins === lengths[modeKey] ? ' active' : '') + (running ? ' disabled' : '');
    chip.textContent = `${mins}m`;
    chip.onclick = () => {
      if (running) { showToast('pause first to change length', '#534AB7'); return; }
      lengths[modeKey] = mins;
      saveState();
      setMode(modeKey);
    };
    lengthRow.appendChild(chip);
  });
}

function setMode(key) {
  clearInterval(interval); running = false; startBtn.textContent = 'start';
  modeKey = key; total = lengths[key] * 60; remaining = total;
  disp.textContent = fmt(remaining); arc.style.strokeDashoffset = 0;
  document.getElementById('phase-lbl').textContent = key === 'focus' ? 'focus time' : key === 'short' ? 'short break' : 'long break';
  catSvg.setAttribute('class', key === 'focus' ? 'state-focus' : 'state-break');
  document.querySelectorAll('.mtab').forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  const activeTab = document.getElementById('tab-' + key);
  activeTab.classList.add('active'); activeTab.setAttribute('aria-selected', 'true');
  breakCard.hidden = key === 'focus';
  if (key !== 'focus') newBreakIdea();
  renderLengthChips();
}

function toggle() {
  if (!running) {
    running = true; startBtn.textContent = 'pause'; renderLengthChips();
    interval = setInterval(() => {
      remaining--; disp.textContent = fmt(remaining); updateArc();
      if (remaining <= 0) {
        clearInterval(interval); running = false; startBtn.textContent = 'start'; renderLengthChips();
        if (modeKey === 'focus') {
          sessions = Math.min(4, sessions + 1); renderDots();
          recordSessionCompletion();
          celebrate();
          showToast(sessions === 4 ? '4 done! time for a long break' : 'session done! great work');
          if (sessions === 4) sessions = 0;
        } else {
          showToast('break over! back to it', '#534AB7');
        }
      }
    }, 1000);
  } else {
    running = false; startBtn.textContent = 'resume'; clearInterval(interval); renderLengthChips();
  }
}

function reset() {
  clearInterval(interval); running = false; startBtn.textContent = 'start';
  remaining = total; disp.textContent = fmt(remaining); arc.style.strokeDashoffset = 0;
  renderLengthChips();
}

function skip() {
  if (modeKey === 'focus') { sessions = Math.min(4, sessions + 1); renderDots(); }
  reset(); showToast('skipped!', '#1D9E75');
}

function nudge(deltaMin) {
  const deltaSec = deltaMin * 60;
  remaining = Math.max(0, remaining + deltaSec);
  total = Math.max(60, total + deltaSec);
  disp.textContent = fmt(remaining); updateArc();
}

function addTask() {
  const val = taskIn.value.trim(); if (!val) return;
  tasks.push({ text: val, done: false });
  if (currentIndex === -1) currentIndex = tasks.length - 1;
  taskIn.value = ''; saveState(); renderTasks(); renderCurrentStep();
}

function toggleTask(i) { tasks[i].done = !tasks[i].done; saveState(); renderTasks(); renderCurrentStep(); }

function findNextIncomplete(fromIndex) {
  for (let i = fromIndex + 1; i < tasks.length; i++) if (!tasks[i].done) return i;
  for (let i = 0; i < tasks.length; i++) if (!tasks[i].done) return i;
  return -1;
}

function nextStep() {
  if (currentIndex === -1 || !tasks[currentIndex]) return;
  tasks[currentIndex].done = true;
  currentIndex = findNextIncomplete(currentIndex);
  saveState(); renderTasks(); renderCurrentStep();
  showToast('step done! nice work', '#1D9E75');
}

function renderCurrentStep() {
  if (tasks.length === 0) {
    currentStepEl.textContent = 'nothing set yet — add a step below';
    nextStepBtn.hidden = true;
  } else if (currentIndex !== -1 && tasks[currentIndex]) {
    currentStepEl.textContent = tasks[currentIndex].text;
    nextStepBtn.hidden = false;
  } else {
    currentStepEl.textContent = 'all steps done! 🎉';
    nextStepBtn.hidden = true;
  }
}

function renderTasks() {
  stepCountEl.textContent = tasks.length;
  taskList.innerHTML = '';
  tasks.forEach((t, i) => {
    const item = document.createElement('div');
    item.className = 'task-item' + (t.done ? ' done-task' : '') + (i === currentIndex ? ' current' : '');
    item.onclick = () => toggleTask(i);
    const check = document.createElement('div');
    check.className = 'check';
    if (t.done) check.innerHTML = '<svg width="11" height="11" viewBox="0 0 11 11"><polyline points="1.5,5.5 4.5,8.5 9.5,2.5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const label = document.createElement('span');
    label.textContent = t.text;
    item.appendChild(check); item.appendChild(label); taskList.appendChild(item);
  });
}

function toggleSound() {
  soundOn = !soundOn;
  soundBtn.textContent = soundOn ? '🔔' : '🔕';
  saveState();
}

document.getElementById('startbtn').addEventListener('click', toggle);
document.getElementById('resetbtn').addEventListener('click', reset);
document.getElementById('skipbtn').addEventListener('click', skip);
document.getElementById('minus-btn').addEventListener('click', () => nudge(-1));
document.getElementById('plus-btn').addEventListener('click', () => nudge(1));
document.getElementById('tab-focus').addEventListener('click', () => setMode('focus'));
document.getElementById('tab-short').addEventListener('click', () => setMode('short'));
document.getElementById('tab-long').addEventListener('click', () => setMode('long'));
document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('next-step-btn').addEventListener('click', nextStep);
document.getElementById('shuffle-btn').addEventListener('click', newBreakIdea);
soundBtn.addEventListener('click', toggleSound);
taskIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });

soundBtn.textContent = soundOn ? '🔔' : '🔕';
renderDots();
renderStats();
renderTasks();
renderCurrentStep();
setMode('focus');
