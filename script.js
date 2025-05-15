// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  html.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light");
});

// Clock
function updateClock() {
  const now = new Date();
  document.getElementById("date").textContent = now.toLocaleDateString();
  document.getElementById("time").textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Timer Variables
let timer;
let duration = 25 * 60;
let remaining = duration;
let isRunning = false;

const timerDisplay = document.getElementById("timer");

function updateTimerDisplay() {
  const minutes = Math.floor(remaining / 60).toString().padStart(2, "0");
  const seconds = (remaining % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${minutes}:${seconds}`;
}

// Timer Controls
document.getElementById("start").addEventListener("click", () => {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Time's up!");
    }
  }, 1000);
});

document.getElementById("pause").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  remaining = duration;
  updateTimerDisplay();
});

// Mode Toggle
document.getElementById("pomodoro").addEventListener("click", () => {
  setMode(25 * 60, "pomodoro");
});
document.getElementById("short").addEventListener("click", () => {
  setMode(5 * 60, "short");
});
document.getElementById("long").addEventListener("click", () => {
  setMode(15 * 60, "long");
});

function setMode(newDuration, mode) {
  clearInterval(timer);
  isRunning = false;
  duration = newDuration;
  remaining = duration;
  updateTimerDisplay();

  // Button styling
  document.querySelectorAll(".mode-toggle button").forEach(btn => {
    btn.classList.remove("active");
  });
  document.getElementById(mode).classList.add("active");
}

// Initial display
updateTimerDisplay();
setMode(25 * 60, "pomodoro");

// Task Adding Logic
function addTask(inputId, listId) {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  const text = input.value.trim();
  if (text !== "") {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
    input.value = "";
  }
}

document.getElementById("addCollegeTask").addEventListener("click", () => {
  addTask("collegeInput", "collegeList");
});
document.getElementById("addSkillTask").addEventListener("click", () => {
  addTask("skillInput", "skillList");
});
document.getElementById("addProjectTask").addEventListener("click", () => {
  addTask("projectInput", "projectList");
});
