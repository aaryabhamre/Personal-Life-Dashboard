// Arrays to store data
let tasks = [];
let habits = [];
let transactions = [];
let meals = [];

// Update top summary numbers
function updateSummary() {
  let doneCount = 0;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].done) doneCount++;
  }
  document.getElementById('total-tasks').innerText = doneCount + "/" + tasks.length;
  let balance = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      balance += transactions[i].amount;
    } else {
      balance -= transactions[i].amount;
    }
  }
  document.getElementById('total-balance').innerText = "₹" + balance;
  let totalCals = 0;
  for (let i = 0; i < meals.length; i++) {
    totalCals += meals[i].calories;
  }
  document.getElementById('total-calories').innerText = totalCals + " kcal";
}

// --- 1. TASK MANAGER ---
document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let title = document.getElementById('task-input').value;
  let category = document.getElementById('task-category').value;
  let time = document.getElementById('task-time').value;

  tasks.push({ title: title, category: category, time: time, done: false });
  document.getElementById('task-form').reset();
  showTasks();
});
function showTasks() {
  let list = document.getElementById('task-list');
  list.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let li = document.createElement('li');
    let textClass = tasks[i].done ? "done-text" : "";
    let timeText = tasks[i].time ? " (" + tasks[i].time + ")" : "";

    li.innerHTML = `
      <span class="${textClass}" onclick="toggleTask(${i})" style="cursor:pointer;">
        [${tasks[i].category}] ${tasks[i].title}${timeText}
      </span>
      <button class="delete-btn" onclick="deleteTask(${i})">X</button>
    `;
    list.appendChild(li);
  }
  updateSummary();
}
function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  showTasks();
}
function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

// --- 2. FOCUS TIMER ---
let secondsLeft = 25 * 60;
let timer = null;
function updateTimerDisplay() {
  let mins = Math.floor(secondsLeft / 60);
  let secs = secondsLeft % 60;
  if (secs < 10) secs = "0" + secs;
  if (mins < 10) mins = "0" + mins;
  document.getElementById('timer-display').innerText = mins + ":" + secs;
}
document.getElementById('start-btn').addEventListener('click', function() {
  if (timer !== null) return;
  timer = setInterval(function() {
    if (secondsLeft > 0) {
      secondsLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      alert("Focus session finished!");
    }
  }, 1000);
});
document.getElementById('pause-btn').addEventListener('click', function() {
  clearInterval(timer);
  timer = null;
});
document.getElementById('reset-btn').addEventListener('click', function() {
  clearInterval(timer);
  timer = null;
  secondsLeft = 25 * 60;
  updateTimerDisplay();
});

// --- 3. HABIT TRACKER ---
document.getElementById('habit-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let name = document.getElementById('habit-input').value;
  habits.push({ name: name, streak: 0, done: false });
  document.getElementById('habit-form').reset();
  showHabits();
});
function showHabits() {
  let list = document.getElementById('habit-list');
  list.innerHTML = "";

  for (let i = 0; i < habits.length; i++) {
    let li = document.createElement('li');
    let btnText = habits[i].done ? "Done ✓" : "Mark Done";
    li.innerHTML = `
      <span>${habits[i].name} (Streak: ${habits[i].streak})</span>
      <button onclick="markHabit(${i})">${btnText}</button>
    `;
    list.appendChild(li);
  }
}
function markHabit(index) {
  if (!habits[index].done) {
    habits[index].done = true;
    habits[index].streak++;
  } else {
    habits[index].done = false;
    habits[index].streak--;
  }
  showHabits();
}

// --- 4. FINANCE TRACKER ---
document.getElementById('finance-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let desc = document.getElementById('fin-desc').value;
  let amount = Number(document.getElementById('fin-amount').value);
  let type = document.getElementById('fin-type').value;

  transactions.push({ desc: desc, amount: amount, type: type });
  document.getElementById('finance-form').reset();
  showFinance();
});
function showFinance() {
  let list = document.getElementById('finance-list');
  list.innerHTML = "";
  for (let i = 0; i < transactions.length; i++) {
    let li = document.createElement('li');
    let sign = transactions[i].type === "income" ? "+" : "-";
    li.innerHTML = `
      <span>${transactions[i].desc}</span>
      <span>${sign}₹${transactions[i].amount}</span>
    `;
    list.appendChild(li);
  }
  updateSummary();
}

// --- 5. HEALTH & CALORIES ---
document.getElementById('health-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let meal = document.getElementById('meal-input').value;
  let cals = Number(document.getElementById('cal-input').value);

  meals.push({ meal: meal, calories: cals });
  document.getElementById('health-form').reset();
  showHealth();
});
function showHealth() {
  let list = document.getElementById('health-list');
  list.innerHTML = "";
  for (let i = 0; i < meals.length; i++) {
    let li = document.createElement('li');
    li.innerHTML = `
      <span>${meals[i].meal}</span>
      <span>${meals[i].calories} kcal</span>
    `;
    list.appendChild(li);
  }
  updateSummary();
}