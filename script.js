const CIRC = 603.2;
const STORAGE_KEY = 'cozyCatFocus_v2';
const LENGTH_OPTIONS = { focus: [10, 15, 25, 45], short: [3, 5, 10], long: [10, 15, 20] };
const DEFAULT_LENGTHS = { focus: 25, short: 5, long: 15 };
const BREAK_IDEAS = [
  { text: 'stretch like a cat', cat: 'movement' },
  { text: 'do 5 jumping jacks', cat: 'movement' },
  { text: 'dance for 10 seconds', cat: 'movement' },
  { text: 'walk to another room and back', cat: 'movement' },
  { text: 'shake out your hands', cat: 'movement' },
  { text: 'get a glass of water', cat: 'rest' },
  { text: 'breathe deeply 3 times', cat: 'rest' },
  { text: 'close your eyes for 10 seconds', cat: 'rest' },
  { text: 'lie down for a minute', cat: 'rest' },
  { text: 'look out a window', cat: 'sensory' },
  { text: 'pet something soft', cat: 'sensory' },
  { text: 'hum your favorite song', cat: 'sensory' },
  { text: 'doodle something silly', cat: 'sensory' },
  { text: 'tidy one small spot', cat: 'sensory' },
  { text: 'smell something nice', cat: 'sensory' },
];

const PET_SVGS = {
  catBlack: `
    <path id="tail" d="M205 233 Q246 213 233 164" stroke="url(#gradCatBlack)" stroke-width="11" fill="none" stroke-linecap="round" style="transform-origin:205px 233px"></path>
    <ellipse cx="165" cy="230" rx="48" ry="34" fill="url(#gradCatBlack)"></ellipse>
    <ellipse cx="165" cy="247" rx="22" ry="15" fill="var(--cat-belly)"></ellipse>
    <rect class="blanket" x="108" y="230" width="114" height="27" rx="13" fill="var(--blanket)"></rect>
    <circle cx="165" cy="186" r="34" fill="url(#gradCatBlack)"></circle>
    <path d="M138 166 L130 133 L158 161 Z" fill="url(#gradCatBlack)"></path>
    <path d="M192 166 L200 133 L172 161 Z" fill="url(#gradCatBlack)"></path>
    <path d="M142 158 L137 140 L152 156 Z" fill="var(--rose)"></path>
    <path d="M188 158 L193 140 L178 156 Z" fill="var(--rose)"></path>
    <g id="eyes-open">
      <ellipse cx="152" cy="186" rx="4" ry="6" fill="var(--cream)"></ellipse>
      <ellipse cx="178" cy="186" rx="4" ry="6" fill="var(--cream)"></ellipse>
    </g>
    <g id="eyes-closed">
      <path d="M146 186 Q152 193 158 186" stroke="var(--cream)" stroke-width="3" fill="none" stroke-linecap="round"></path>
      <path d="M172 186 Q178 193 184 186" stroke="var(--cream)" stroke-width="3" fill="none" stroke-linecap="round"></path>
    </g>
    <path d="M160 198 L170 198 L165 204 Z" fill="var(--rose)"></path>
    <path d="M165 204 Q158 210 149 206" stroke="var(--cream)" stroke-width="2.5" fill="none" stroke-linecap="round"></path>
    <path d="M165 204 Q172 210 181 206" stroke="var(--cream)" stroke-width="2.5" fill="none" stroke-linecap="round"></path>
    <text id="zzz" x="222" y="140" font-size="18" fill="var(--zzz)">z z z</text>
  `,
  catWhite: `
    <path id="tail" d="M205 233 Q246 213 233 164" stroke="url(#gradCatWhite)" stroke-width="11" fill="none" stroke-linecap="round" style="transform-origin:205px 233px"></path>
    <ellipse cx="165" cy="230" rx="48" ry="34" fill="url(#gradCatWhite)"></ellipse>
    <ellipse cx="165" cy="249" rx="20" ry="13" fill="#e7ded0"></ellipse>
    <rect class="blanket" x="108" y="230" width="114" height="27" rx="13" fill="var(--blanket)"></rect>
    <circle cx="165" cy="186" r="34" fill="url(#gradCatWhite)"></circle>
    <path d="M138 166 L130 133 L158 161 Z" fill="url(#gradCatWhite)"></path>
    <path d="M192 166 L200 133 L172 161 Z" fill="url(#gradCatWhite)"></path>
    <path d="M142 158 L137 140 L152 156 Z" fill="var(--rose)"></path>
    <path d="M188 158 L193 140 L178 156 Z" fill="var(--rose)"></path>
    <g id="eyes-open">
      <ellipse cx="152" cy="186" rx="4" ry="6" fill="var(--ink)"></ellipse>
      <ellipse cx="178" cy="186" rx="4" ry="6" fill="var(--ink)"></ellipse>
    </g>
    <g id="eyes-closed">
      <path d="M146 186 Q152 193 158 186" stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"></path>
      <path d="M172 186 Q178 193 184 186" stroke="var(--ink)" stroke-width="3" fill="none" stroke-linecap="round"></path>
    </g>
    <path d="M160 198 L170 198 L165 204 Z" fill="var(--rose)"></path>
    <path d="M165 204 Q158 210 149 206" stroke="var(--ink)" stroke-width="2.5" fill="none" stroke-linecap="round"></path>
    <path d="M165 204 Q172 210 181 206" stroke="var(--ink)" stroke-width="2.5" fill="none" stroke-linecap="round"></path>
    <text id="zzz" x="222" y="140" font-size="18" fill="var(--zzz)">z z z</text>
  `,
  dachshund: `
    <path id="tail" d="M92 235 Q65 225 70 205" stroke="url(#gradDog)" stroke-width="8" fill="none" stroke-linecap="round" style="transform-origin:92px 235px"></path>
    <rect x="115" y="248" width="10" height="16" rx="4" fill="url(#gradDog)"></rect>
    <ellipse cx="155" cy="238" rx="68" ry="20" fill="url(#gradDog)"></ellipse>
    <ellipse cx="155" cy="228" rx="58" ry="8" fill="var(--leather-darker)" opacity="0.3"></ellipse>
    <ellipse cx="150" cy="250" rx="30" ry="10" fill="var(--cat-belly)"></ellipse>
    <rect class="blanket" x="108" y="228" width="110" height="22" rx="11" fill="var(--blanket)"></rect>
    <rect x="222" y="248" width="10" height="16" rx="4" fill="url(#gradDog)"></rect>
    <circle cx="222" cy="222" r="19" fill="url(#gradDog)"></circle>
    <rect x="234" y="216" width="26" height="14" rx="7" fill="url(#gradDog)"></rect>
    <ellipse cx="258" cy="223" rx="4" ry="3" fill="var(--ink)"></ellipse>
    <path d="M212 210 Q200 224 208 244 Q218 238 216 214 Z" fill="var(--leather-darker)"></path>
    <g id="eyes-open">
      <ellipse cx="228" cy="216" rx="3" ry="4" fill="var(--ink)"></ellipse>
    </g>
    <g id="eyes-closed">
      <path d="M224 216 Q228 220 232 216" stroke="var(--ink)" stroke-width="2.5" fill="none" stroke-linecap="round"></path>
    </g>
    <text id="zzz" x="248" y="195" font-size="18" fill="var(--zzz)">z z z</text>
  `,
};
const PET_KEYS = Object.keys(PET_SVGS);

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      lengths: { ...DEFAULT_LENGTHS, ...(raw.lengths || {}) },
      soundOn: raw.soundOn !== false,
      tasks: Array.isArray(raw.tasks) ? raw.tasks : [],
      currentIndex: typeof raw.currentIndex === 'number' ? raw.currentIndex : -1,
      stats: raw.stats || { date: '', todayCount: 0, streak: 0, lastStreakDate: '' },
      pet: PET_KEYS.includes(raw.pet) ? raw.pet : 'catBlack',
    };
  } catch {
    return { lengths: { ...DEFAULT_LENGTHS }, soundOn: true, tasks: [], currentIndex: -1, stats: { date: '', todayCount: 0, streak: 0, lastStreakDate: '' }, pet: 'catBlack' };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lengths, soundOn, tasks, currentIndex, stats, pet }));
  } catch { /* localStorage unavailable (e.g. private browsing) - state just won't persist */ }
}

const state = loadState();
let { lengths, soundOn, tasks, currentIndex, stats, pet } = state;

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
const breakTagEl = document.getElementById('break-tag');
const currentStepEl = document.getElementById('current-step');
const nextStepBtn = document.getElementById('next-step-btn');
const stepCountEl = document.getElementById('step-count');
const streakLbl = document.getElementById('streak-lbl');
const todayLbl = document.getElementById('today-lbl');
const settingsBtn = document.getElementById('settings-btn');
const settingsOverlay = document.getElementById('settings-overlay');
const settingsClose = document.getElementById('settings-close');
const settingsSoundBtn = document.getElementById('settings-sound-btn');
const settingsSoundState = document.getElementById('settings-sound-state');
const petPicker = document.getElementById('pet-picker');

function fmt(s) { return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; }
function updateArc() { arc.style.strokeDashoffset = CIRC * (1 - remaining / total); }
function showToast(msg, color = '#b8392f') {
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

function renderPet(key) {
  pet = PET_KEYS.includes(key) ? key : 'catBlack';
  catSvg.innerHTML = PET_SVGS[pet];
  saveState();
  updatePetPickerUI();
}

function updatePetPickerUI() {
  document.querySelectorAll('.pet-option').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.pet === pet);
  });
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
  const idea = BREAK_IDEAS[Math.floor(Math.random() * BREAK_IDEAS.length)];
  breakIdeaEl.textContent = idea.text;
  breakTagEl.textContent = idea.cat;
}

function renderLengthChips() {
  lengthRow.innerHTML = '';
  LENGTH_OPTIONS[modeKey].forEach((mins) => {
    const chip = document.createElement('button');
    chip.className = 'len-chip' + (mins === lengths[modeKey] ? ' active' : '') + (running ? ' disabled' : '');
    chip.textContent = `${mins}m`;
    chip.onclick = () => {
      if (running) { showToast('pause first to change length', '#5a6b45'); return; }
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
          showToast('break over! back to it', '#5a6b45');
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
  reset(); showToast('skipped!', '#3d5230');
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
  showToast('step done! nice work', '#3d5230');
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
  settingsSoundState.textContent = soundOn ? 'on' : 'off';
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
taskIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });

settingsBtn.addEventListener('click', () => { settingsOverlay.hidden = false; });
settingsClose.addEventListener('click', () => { settingsOverlay.hidden = true; });
settingsOverlay.addEventListener('click', (e) => { if (e.target === settingsOverlay) settingsOverlay.hidden = true; });
settingsSoundBtn.addEventListener('click', toggleSound);
document.querySelectorAll('.pet-option').forEach((btn) => {
  btn.addEventListener('click', () => renderPet(btn.dataset.pet));
});

settingsSoundState.textContent = soundOn ? 'on' : 'off';
renderPet(pet);
renderDots();
renderStats();
renderTasks();
renderCurrentStep();
setMode('focus');
