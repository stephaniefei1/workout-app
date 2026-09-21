/* Lift Log is intentionally dependency-free: your training data stays in this browser. */
const app = document.querySelector("#app");
const STORE = "lift-log-fat-loss-v1";
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WARMUP = [
  ["Banded groin circles", "https://youtu.be/QNZWsRTTRgM"],
  ["Frog slide", "https://youtu.be/mDU6Sku0cEM"],
  ["Frog up-and-down", "https://youtu.be/oNnb04degNU"],
  ["Straight leg slides", "https://youtu.be/1DdRWyLT4vk"],
  ["Straight leg thread the needle", "https://www.youtube.com/watch?v=8c44yrtDnfA"],
  ["Wall slides", "https://youtu.be/jsBPJCFe9Lk"],
  ["Overhead band rolls", "https://youtu.be/u_KtP6wbHSI"],
  ["Walkout plank", "https://youtu.be/igbGkvz-bWA"]
].map(([name, video]) => ({ name, video }));

const base = (name, sets, reps, tempo, video, note = "") => ({ name, sets, reps, tempo, video, note });
const EARLY = [
  [
    base("Deadstop hip thrust", 4, "8-10", "31X2", "https://www.youtube.com/shorts/v-NyVbFBkRM", "Reset the bar after each rep. Keep chin tucked."),
    base("Glute kickbacks", 3, "12-15 / side", "20X1", "https://www.youtube.com/shorts/TS8RDPQh0Qk", "Keep upright; slightly kick outwards with the working leg."),
    base("Chin ups", 4, "8-10", "3111", "https://www.youtube.com/shorts/fmlnDPVrlDQ", "Assisted reps are fine with a band or machine."),
    base("Hyperextension", 3, "10-12", "2012", "https://www.youtube.com/shorts/C7ttA1hr6sw", "Slightly round the upper back to keep tension on glutes and hamstrings."),
    base("Cable row", 3, "12-15", "3111", "https://www.youtube.com/shorts/8NyYXVM0cqg", "Palms in, knees slightly bent, elbows close to body."),
    base("Face pulls", 3, "12-15", "2112", "https://www.youtube.com/shorts/1IPWas2pB9s", "Overhand grip; lean back slightly and pull hands toward ears.")
  ],
  [
    base("Bulgarian split squat", 4, "8-10 / side", "20X1", "https://www.youtube.com/shorts/ZP9vFw0OTxI", "Quad focus: upright torso and a closer stance."),
    base("Leg press", 4, "8, 10, 12, 15", "30X1", "https://www.youtube.com/shorts/KYqCHYqRLA8", "Keep your back on the pad; do not lock knees at the top."),
    base("Seated dumbbell press", 4, "8-10", "2010", "https://www.youtube.com/shorts/HRmKvW_0LeI", "Palms forward, elbows slightly tucked, push into the bench."),
    base("Leg extension", 3, "10-12", "30X2", "https://www.youtube.com/shorts/F8m3JvKq8a0", "Control the negative, stay back on the pad, chest up."),
    base("Seated lateral raises", 3, "12-15", "2011", "https://www.youtube.com/shorts/3a18hUJgUPA", "Lead with the elbows; no swinging."),
    base("Push ups", 3, "8-10", "20X0", "https://www.youtube.com/shorts/T5YQVFnXVLE", "Elbows tucked and a strong plank; kneeling push ups are an alternative.")
  ],
  [
    base("Barbell RDL", 4, "8-10", "3121", "https://www.youtube.com/shorts/KXb4nKHAjbg", "Retract shoulder blades and bend at the hips to initiate."),
    base("Hip abduction", 3, "12-15", "2112", "https://www.youtube.com/shorts/KXy75hsWUBs", "Limit range to keep tension on glutes; reverse slowly."),
    base("V-grip pulldown", 4, "8-10", "20X1", "https://www.youtube.com/shorts/fFZC7_zkFYg", "Palms face each other, torso upright; pull the bar toward chest."),
    base("Seated leg curl", 3, "10-12", "3111", "https://www.youtube.com/shorts/2lEhbQiPSD8", "Maintain a neutral spine and keep your back flat to the pad."),
    base("Single-arm dumbbell row", 3, "10-12 / side", "21X1", "https://www.youtube.com/shorts/p8CsZAGJ_XY", "Keep lower back straight and torso still. Start with the weaker side."),
    base("Rear delt fly", 3, "12-15", "2012", "https://www.youtube.com/shorts/WWd9C9xeykw", "Keep the torso stationary and focus on bringing the weights out.")
  ],
  [
    base("Hack squat", 4, "8-10", "30X1", "https://www.youtube.com/shorts/V3SYOt670_g", "Stay back on the pad and brace the core."),
    base("Walking lunges", 3, "12 / side", "20X0", "https://www.youtube.com/shorts/mYAAWmmbk28", "Chest up, core and glutes engaged; knees stay in line with toes."),
    base("Seated Arnold press", 4, "8-10", "2020", "https://www.youtube.com/shorts/hbiIOcbXGoU", "Upright torso, arms move in a straight line; externally rotate as you press."),
    base("Goblet squat", 3, "10-12", "20X0", "https://www.youtube.com/shorts/tS7F88AhGCU", "Chest up; sit hips back and down, pushing knees in line with toes."),
    base("Cable lateral raises", 3, "12-15 / side", "20X2", "https://www.youtube.com/shorts/lxOyFoVdZiw", "Keep a slight elbow bend and avoid swinging; slight lean increases range."),
    base("Diamond push up", 3, "8-10", "20X0", "https://www.youtube.com/shorts/dvu0twaVeZE", "Elbows tucked and plank strong; kneeling diamond push ups are an alternative.")
  ]
];
const LATE = [
  [
    base("Barbell RDL", 4, "6-8", "3121", "https://www.youtube.com/shorts/KXb4nKHAjbg", "Retract shoulder blades and bend at the hips to initiate."),
    base("Step up", 3, "10-12 / side", "4121", "https://www.youtube.com/shorts/6kazGO2B9pU", "Push through the heel to lift; keep your leg close to the platform."),
    base("Straight-arm pulldown", 4, "6-8", "3121", "https://www.youtube.com/shorts/VFwPXQAdfUM", "Pull weight down toward your chest; elbows face straight down and squeeze lats."),
    base("Continuous hip thrust", 4, "8-10", "2011", "https://www.youtube.com/shorts/v-NyVbFBkRM", "Keep the bar off the ground during reps and keep chin tucked."),
    base("Barbell row", 3, "10-12", "2111", "https://www.youtube.com/shorts/r88HR-mHMB4", "Feet shoulder width, knees slightly bent, neutral spine and still torso."),
    base("Bent-over rear delt fly", 3, "12-15", "2011", "https://www.youtube.com/shorts/Nilql9g_xuI", "Neutral spine; bring elbows to the sides and back.")
  ],
  [
    base("Squat", 4, "6-8", "21X1", "https://www.youtube.com/shorts/lm9J-Tpzb-I", "Chest up, knees track with toes, core braced throughout."),
    base("Split squat", 3, "12-15 / side", "21X1", "https://www.youtube.com/shorts/R5gKd9jFD6k", "Can be performed in a Smith machine to help with balance."),
    base("Seated Arnold press", 4, "6-8", "2020", "https://www.youtube.com/shorts/hbiIOcbXGoU", "Upright torso, arms move in a straight line; externally rotate as you press."),
    base("Leg extension", 3, "12-15", "30X2", "https://www.youtube.com/shorts/F8m3JvKq8a0", "Control the negative, stay back on the pad, chest up."),
    base("Seated front raises", 3, "10-12", "2111", "https://www.youtube.com/shorts/JWI1FageDIU", "Engage your core and lift the weight to chin level."),
    base("60-degree incline neutral press", 3, "10-12", "2111", "https://www.youtube.com/shorts/gt9Ojn7jXoY", "Set bench at 60 degrees and use a neutral grip.")
  ],
  [
    base("Glute bridge", 4, "6-8", "21X2", "https://www.youtube.com/shorts/u5zXFK7g8Tc", "Drive through heels, avoid overextending at top, and squeeze glutes."),
    base("Smith machine sumo squat", 3, "10-12", "3110", "https://www.youtube.com/shorts/AFXdqaIRk-4", "Wide Smith-machine stance, knees in line with toes, push through heels."),
    base("Lat pulldown", 4, "6-8", "31X1", "https://www.youtube.com/shorts/xsC3uMWH7TE", "Shoulders retracted and chest up; slow down the eccentric."),
    base("Seated leg curl", 3, "12-15", "30X1", "https://www.youtube.com/shorts/2lEhbQiPSD8", "Maintain neutral spine and keep your back flat against the pad."),
    base("Single-arm dumbbell row", 3, "10-12 / side", "20X1", "https://www.youtube.com/shorts/p8CsZAGJ_XY", "Keep lower back straight and torso still. Start with the weaker side."),
    base("Face pulls", 3, "10-12", "20X1", "https://www.youtube.com/shorts/1IPWas2pB9s", "Overhand grip; lean back slightly and pull hands toward ears.")
  ],
  [
    base("Leg press", 4, "6-8", "30X1", "https://www.youtube.com/shorts/KYqCHYqRLA8", "Back stays on the pad; do not lock knees and keep feet flat."),
    base("Lateral squat", 3, "10-12 / side", "2011", "https://www.youtube.com/shorts/P9asyr4VEIk", "Feet wider than hips; shift weight to the side while pushing hips back."),
    base("Overhead press", 4, "6-8", "21X1", "https://www.youtube.com/shorts/Lay0Ce1tS8A", "Hands slightly wider than shoulders; press the bar in a straight line."),
    base("Leg extension", 3, "12-15", "30X2", "https://www.youtube.com/shorts/F8m3JvKq8a0", "Control the negative, stay back on the pad, chest up."),
    base("Seated lateral raises", 3, "10-12", "20X1", "https://www.youtube.com/shorts/3a18hUJgUPA", "Straight back, core engaged. Lead with elbows and do not swing."),
    base("Incline dumbbell press", 3, "10-12", "20X1", "https://www.youtube.com/watch?v=eOh9DMDw3pc", "Keep elbows in and chest up.")
  ]
];

const WEEK_INFO = [
  { steps: "6,000", cardio: [20, 20] }, { steps: "8,000", cardio: [25, 25] }, { steps: "10,000", cardio: [30, 30] },
  { steps: "10,000-12,000", cardio: [35, 35] }, { steps: "11,000-12,000", cardio: [40, 40] }, { steps: "12,000", cardio: [45, 40] }
];

function iso(date) { return date.toISOString().slice(0, 10); }
function monday(date = new Date()) { const d = new Date(date); d.setHours(12, 0, 0, 0); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return d; }
function defaultState() { return { startDate: iso(monday()), selectedWeek: 1, selectedDay: 0, page: "today", unit: "lb", records: {}, installTipSeen: false }; }
function load() { try { return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORE) || "{}") }; } catch { return defaultState(); } }
let state = load();
function save() { localStorage.setItem(STORE, JSON.stringify(state)); }
function key(week = state.selectedWeek, day = state.selectedDay) { return `w${week}d${day}`; }
function record(week = state.selectedWeek, day = state.selectedDay) { const k = key(week, day); return (state.records[k] ||= {}); }
function dayDate(week, day) { const d = new Date(`${state.startDate}T12:00:00`); d.setDate(d.getDate() + (week - 1) * 7 + day); return d; }
function labelDate(date) { return date.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" }); }
function taskFor(week, day) { if (day === 2 || day === 3) return { type: "cardio", minutes: WEEK_INFO[week - 1].cardio[day - 2] }; if (day === 6) return { type: "rest" }; return { type: "lift", workout: day < 2 ? day : day - 2, exercises: (week < 4 ? EARLY : LATE)[day < 2 ? day : day - 2] }; }
function currentProgramDay() { const diff = Math.floor((monday(new Date()) - monday(new Date(`${state.startDate}T12:00:00`))) / 86400000); return Math.max(0, Math.min(41, diff)); }
function selectedTask() { return taskFor(state.selectedWeek, state.selectedDay); }
function escapeHtml(value) { return String(value).replace(/[&<>"]/g, (char) => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" })[char]); }
function pct(done, all) { return all ? Math.round((done / all) * 100) : 0; }
function workoutDone(rec, exercises) { return exercises.filter((_, i) => rec.exercises?.[i]?.complete).length; }
function isDayComplete(week, day) { const r = state.records[key(week, day)] || {}; const task = taskFor(week, day); return task.type === "lift" ? workoutDone(r, task.exercises) === task.exercises.length : task.type === "cardio" ? !!r.complete : day === 6 ? !!r.complete : false; }
function toast(message) { const node = document.createElement("div"); node.className = "toast"; node.textContent = message; document.body.append(node); setTimeout(() => node.remove(), 2300); }

function header() { return `<header class="app-header"><div><span class="eyebrow">6 week program</span><h1>Lift Log</h1></div><button class="icon-btn" data-action="settings" aria-label="Open settings">⚙</button></header>`; }
function nav() { return `<nav class="bottom-nav" aria-label="App navigation">${[["today","⌂","Today"],["plan","▦","Plan"],["progress","↗","Progress"]].map(([id,icon,label]) => `<button class="tab ${state.page === id ? "active" : ""}" data-action="page" data-page="${id}"><strong>${icon}</strong>${label}</button>`).join("")}</nav>`; }
function weekPicker() { return `<div class="week-picker" aria-label="Select program week">${WEEK_INFO.map((info, i) => `<button class="week ${state.selectedWeek === i + 1 ? "active" : ""}" data-action="week" data-week="${i + 1}">Week ${i + 1}<small>${info.steps} steps</small></button>`).join("")}</div>`; }

function todayView() {
  const task = selectedTask(); const date = dayDate(state.selectedWeek, state.selectedDay); const rec = record();
  const title = task.type === "lift" ? `Full Body ${task.workout + 1}` : task.type === "cardio" ? "Low-intensity cardio" : "Rest & reset";
  const subtitle = `Week ${state.selectedWeek} · ${DAY_NAMES[state.selectedDay]} · ${labelDate(date)}`;
  const hero = `<section class="hero"><p class="date">${subtitle}</p><h2>${title}</h2><div class="hero-meta"><span class="pill lime">${WEEK_INFO[state.selectedWeek - 1].steps} step target</span>${task.type === "lift" ? `<span class="pill">60-90 sec rest</span>` : task.type === "cardio" ? `<span class="pill">${task.minutes} min</span>` : ""}</div></section>`;
  let body = task.type === "lift" ? liftView(task, rec) : task.type === "cardio" ? cardioView(task, rec) : restView(rec);
  return `${header()}${hero}${body}${nav()}`;
}
function liftView(task, rec) {
  const exercisesDone = workoutDone(rec, task.exercises); const warmDone = WARMUP.filter((_, i) => rec.warmup?.[i]).length;
  return `<section class="section-heading"><div><span class="eyebrow">Before you lift</span><h2>Warm-up</h2></div><span class="caption">${warmDone}/${WARMUP.length} complete</span></section>
  <section class="card tight"><p class="caption">5-10 min low-intensity cardio, then 2 rounds of 10 reps per side.</p><div class="warm-list">${WARMUP.map((item, i) => `<label class="warm-row"><input class="check" type="checkbox" data-warmup="${i}" ${rec.warmup?.[i] ? "checked" : ""}/><span>${item.name}</span><a href="${item.video}" target="_blank" rel="noopener" aria-label="Watch ${item.name} demo">↗</a></label>`).join("")}</div></section>
  <section class="section-heading"><div><span class="eyebrow">Main session</span><h2>Workout ${task.workout + 1}</h2></div><span class="caption">${exercisesDone}/${task.exercises.length} exercises</span></section>
  <div class="progress-track"><span style="width:${pct(exercisesDone, task.exercises.length)}%"></span></div>
  <div class="stack">${task.exercises.map((exercise, index) => exerciseCard(exercise, index, rec)).join("")}</div>
  <button class="primary finish" data-action="finish-lift">${exercisesDone === task.exercises.length ? "Workout complete ✓" : "Finish workout"}</button>`;
}
function exerciseCard(exercise, index, rec) {
  const logged = rec.exercises?.[index] || {}; const values = logged.weights || [];
  return `<article class="card exercise ${logged.complete ? "done" : ""}"><div class="exercise-head"><input class="check" aria-label="Mark ${escapeHtml(exercise.name)} complete" type="checkbox" data-exercise="${index}" ${logged.complete ? "checked" : ""}/><div class="exercise-title"><h3>${exercise.name}</h3><p class="prescription">${exercise.sets} sets × ${exercise.reps} reps · tempo ${exercise.tempo}</p></div><a class="video" href="${exercise.video}" target="_blank" rel="noopener" aria-label="Watch ${escapeHtml(exercise.name)} demo">▶</a></div><div class="sets">${Array.from({length: exercise.sets}, (_, set) => `<div class="set-row"><span class="set-label">Set ${set + 1}</span><label>${exercise.reps}<input class="weight" type="number" inputmode="decimal" min="0" step="0.5" placeholder="Weight" value="${escapeHtml(values[set] ?? "")}" data-weight="${index}" data-set="${set}" aria-label="${exercise.name}, set ${set + 1}, weight in ${state.unit}" /></label><span class="caption">${state.unit}</span></div>`).join("")}</div><p class="detail">${exercise.note} Enter a weight to fill later blank sets; edit each set anytime.</p></article>`;
}
function cardioView(task, rec) { const remaining = rec.timerSeconds ?? task.minutes * 60; return `<section class="card cardio"><span class="eyebrow">Today’s session</span><h2>${task.minutes} minutes easy cardio</h2><p class="caption">The guide suggests a walk or incline walk at 5 km/h / 3 mph. Keep it conversational.</p><div class="timer" data-timer-display>${formatTimer(remaining)}</div><div class="inline-actions"><button class="primary" data-action="timer">${rec.timerRunning ? "Pause timer" : "Start timer"}</button><button class="secondary" data-action="reset-timer">Reset</button><label class="warm-row" style="border:0;padding:4px 0"><input class="check" type="checkbox" data-cardio-complete ${rec.complete ? "checked" : ""}/><span>Cardio complete</span></label></div></section>${stepsCard(rec)}`; }
function restView(rec) { return `<section class="card"><span class="eyebrow">Recovery day</span><h2>Rest, walk, and recharge</h2><p class="caption" style="margin-top:8px">There is no scheduled resistance session today. Your step target still counts.</p><div class="inline-actions"><label class="warm-row" style="border:0;padding:4px 0"><input class="check" type="checkbox" data-rest-complete ${rec.complete ? "checked" : ""}/><span>Mark recovery day complete</span></label></div></section>${stepsCard(rec)}`; }
function stepsCard(rec) { return `<section class="section-heading"><div><span class="eyebrow">Daily activity</span><h2>Steps</h2></div><span class="caption">Goal: ${WEEK_INFO[state.selectedWeek - 1].steps}</span></section><section class="card tight"><p class="caption">Log the total from your phone or watch. This does not connect to Health automatically.</p><div class="steps"><input class="weight" type="number" inputmode="numeric" min="0" placeholder="Today’s steps" value="${escapeHtml(rec.steps ?? "")}" data-steps /><button class="secondary" data-action="save-steps">Save</button></div></section>`; }
function planView() { const todayIndex = currentProgramDay(); return `${header()}<section class="section-heading"><div><span class="eyebrow">Your schedule</span><h2>6-week plan</h2></div></section>${weekPicker()}<section class="card tight"><div class="days">${DAY_NAMES.map((name, day) => { const task = taskFor(state.selectedWeek, day); const d = dayDate(state.selectedWeek, day); const selected = state.selectedDay === day; const complete = isDayComplete(state.selectedWeek, day); const title = task.type === "lift" ? `Lift ${task.workout + 1}` : task.type === "cardio" ? `${task.minutes}m cardio` : "Rest"; const actual = (state.selectedWeek - 1) * 7 + day === todayIndex; return `<button class="day ${selected ? "selected" : ""} ${complete ? "complete" : ""} ${task.type === "rest" ? "rest" : ""}" data-action="day" data-day="${day}" aria-label="${name}, ${title}"><span>${name}</span><span class="day-num">${d.getDate()}</span><span class="dot" title="${actual ? "Today" : complete ? "Complete" : title}"></span><span>${title}</span></button>`; }).join("")}</div></section><section class="card" style="margin-top:15px"><span class="eyebrow">Week ${state.selectedWeek}</span><h2>${WEEK_INFO[state.selectedWeek - 1].steps} daily steps</h2><p class="caption" style="margin-top:8px">Four full-body lifts, two low-intensity cardio sessions, and one rest day. You can select any day above to log it.</p><button class="primary finish" data-action="page" data-page="today">Open selected day</button></section>${nav()}`; }
function progressView() { const allDays = Array.from({ length: 42 }, (_, n) => ({ week: Math.floor(n / 7) + 1, day: n % 7, date: dayDate(Math.floor(n / 7) + 1, n % 7) })); const complete = allDays.filter(({week,day}) => isDayComplete(week,day)); const lifts = allDays.filter(({week,day}) => taskFor(week,day).type === "lift" && isDayComplete(week,day)); const steps = allDays.map(({week,day}) => state.records[key(week,day)]?.steps).filter(Boolean).map(Number); const avgSteps = steps.length ? Math.round(steps.reduce((a,b) => a+b, 0) / steps.length).toLocaleString() : "-"; const recent = allDays.filter(({week,day}) => state.records[key(week,day)]).sort((a,b) => b.date - a.date).slice(0, 7); return `${header()}<section class="hero"><p class="date">Your consistency</p><h2>Progress at a glance</h2><div class="hero-meta"><span class="pill lime">${complete.length}/42 days checked off</span></div></section><section class="section-heading"><div><span class="eyebrow">Program totals</span><h2>Keep stacking sessions</h2></div></section><section class="card"><div class="stat-grid"><div class="stat"><strong>${lifts.length}</strong><span>Lifts complete</span></div><div class="stat"><strong>${complete.length}</strong><span>Days complete</span></div><div class="stat"><strong>${avgSteps}</strong><span>Average steps</span></div></div><div class="progress-track"><span style="width:${pct(complete.length,42)}%"></span></div><p class="caption">${pct(complete.length,42)}% of the six-week schedule logged.</p></section><section class="section-heading"><div><span class="eyebrow">Recent activity</span><h2>Your log</h2></div></section><section class="card">${recent.length ? `<div class="list-summary">${recent.map(({week,day,date}) => { const task = taskFor(week,day); const r = state.records[key(week,day)]; const name = task.type === "lift" ? `Week ${week} · Workout ${task.workout + 1}` : task.type === "cardio" ? `Week ${week} · ${task.minutes} min cardio` : `Week ${week} · Recovery`; const detail = r.steps ? `${Number(r.steps).toLocaleString()} steps` : isDayComplete(week,day) ? "Complete" : "In progress"; return `<button class="summary-row" data-action="jump" data-week="${week}" data-day="${day}"><span>${name}<br><small class="caption">${labelDate(date)}</small></span><span>${detail} →</span></button>`; }).join("")}</div>` : `<div class="empty">Your completed workouts and step logs will appear here.</div>`}</section>${nav()}`; }
function render() { save(); app.innerHTML = state.page === "plan" ? planView() : state.page === "progress" ? progressView() : todayView(); }
function formatTimer(seconds) { const m = Math.floor(seconds / 60); const s = seconds % 60; return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`; }
let timerId;
function runTimer() { clearInterval(timerId); const rec = record(); if (!rec.timerRunning) return; timerId = setInterval(() => { const r = record(); if (!r.timerRunning) return clearInterval(timerId); r.timerSeconds = Math.max(0, (r.timerSeconds ?? selectedTask().minutes * 60) - 1); if (r.timerSeconds === 0) { r.timerRunning = false; clearInterval(timerId); toast("Cardio timer complete!"); } save(); const display = document.querySelector("[data-timer-display]"); if (display) display.textContent = formatTimer(r.timerSeconds); }, 1000); }
function openSettings() { const modal = document.createElement("section"); modal.className = "modal"; modal.innerHTML = `<div><span class="eyebrow">Your private tracker</span><h2>Settings</h2><p>Logs are saved in this browser only. Export a backup before changing phones or clearing browser data.</p><div class="setup-row"><span>Program starts</span><input class="date-input" type="date" value="${state.startDate}" data-start-date /></div><div class="setup-row"><span>Weight unit</span><button class="secondary" data-action="unit">${state.unit === "lb" ? "lb → kg" : "kg → lb"}</button></div><div class="setup-row"><button class="secondary" data-action="export">Export backup</button><label class="secondary file-label">Import backup<input type="file" accept="application/json" data-import /></label></div><div class="setup-row"><button class="secondary danger" data-action="clear-data">Clear all logs</button><button class="primary" data-action="close-modal">Done</button></div><p class="caption" style="margin-top:14px">To install on iPhone: open the published site in Safari, then Share → Add to Home Screen.</p></div>`; document.body.append(modal); }

document.addEventListener("click", (event) => {
  const el = event.target.closest("[data-action]"); if (!el) return; const action = el.dataset.action;
  if (action === "settings") return openSettings();
  if (action === "close-modal") return event.target.closest(".modal")?.remove();
  if (action === "page") { state.page = el.dataset.page; render(); return; }
  if (action === "week") { state.selectedWeek = Number(el.dataset.week); render(); return; }
  if (action === "day") { state.selectedDay = Number(el.dataset.day); render(); return; }
  if (action === "jump") { state.selectedWeek = Number(el.dataset.week); state.selectedDay = Number(el.dataset.day); state.page = "today"; render(); return; }
  if (action === "finish-lift") { const r = record(); const exerciseCount = selectedTask().exercises.length; r.exercises ||= {}; for(let i=0;i<exerciseCount;i++) r.exercises[i] = { ...(r.exercises[i] || {}), complete:true }; render(); toast("Workout marked complete"); return; }
  if (action === "timer") { const r = record(); r.timerRunning = !r.timerRunning; if (r.timerSeconds == null) r.timerSeconds = selectedTask().minutes * 60; render(); runTimer(); return; }
  if (action === "reset-timer") { const r = record(); r.timerRunning = false; r.timerSeconds = selectedTask().minutes * 60; clearInterval(timerId); render(); return; }
  if (action === "save-steps") { toast("Steps saved"); save(); return; }
  if (action === "unit") { state.unit = state.unit === "lb" ? "kg" : "lb"; render(); document.querySelector(".modal")?.remove(); openSettings(); return; }
  if (action === "export") { const blob = new Blob([JSON.stringify(state, null, 2)], {type:"application/json"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `lift-log-backup-${iso(new Date())}.json`; a.click(); URL.revokeObjectURL(url); return; }
  if (action === "clear-data") { if (confirm("Clear all workout logs from this browser? This cannot be undone unless you exported a backup.")) { state = defaultState(); clearInterval(timerId); event.target.closest(".modal")?.remove(); render(); toast("All logs cleared"); } return; }
});
function saveWeight(target) {
  if (!target.matches("[data-weight]")) return;
  const r = record(); r.exercises ||= {};
  const exerciseIndex = target.dataset.weight;
  const setIndex = Number(target.dataset.set);
  r.exercises[exerciseIndex] ||= {}; r.exercises[exerciseIndex].weights ||= [];
  const weights = r.exercises[exerciseIndex].weights;
  weights[setIndex] = target.value;

  // A weight is a convenient starting point for later sets, never an overwrite.
  if (target.value !== "") {
    document.querySelectorAll(`[data-weight="${exerciseIndex}"]`).forEach((input) => {
      const otherSet = Number(input.dataset.set);
      if (otherSet > setIndex && !weights[otherSet]) {
        weights[otherSet] = target.value;
        input.value = target.value;
      }
    });
  }
  save();
}

document.addEventListener("change", (event) => {
  const target = event.target; const r = record();
  if (target.matches("[data-warmup]")) { r.warmup ||= {}; r.warmup[target.dataset.warmup] = target.checked; render(); }
  if (target.matches("[data-exercise]")) { r.exercises ||= {}; const i = target.dataset.exercise; r.exercises[i] = { ...(r.exercises[i] || {}), complete:target.checked }; render(); }
  if (target.matches("[data-cardio-complete], [data-rest-complete]")) { r.complete = target.checked; render(); }
  if (target.matches("[data-steps]")) { r.steps = target.value; save(); }
  if (target.matches("[data-start-date]")) { state.startDate = target.value; save(); render(); event.target.closest(".modal")?.remove(); toast("Program dates updated"); }
  if (target.matches("[data-import]")) { const file = target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const incoming = JSON.parse(reader.result); if (!incoming || typeof incoming !== "object") throw Error(); state = { ...defaultState(), ...incoming }; save(); event.target.closest(".modal")?.remove(); render(); toast("Backup restored"); } catch { toast("That backup could not be read"); } }; reader.readAsText(file); }
  saveWeight(target);
});
document.addEventListener("input", (event) => saveWeight(event.target));

if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
render();
