const hamburger = document.getElementById("hamburger");
const navBar = document.getElementById("nav-content");

hamburger.addEventListener("click", () => {
  navBar.classList.toggle("active");
});

const links = document.querySelectorAll(".nav-bar a");
const currentPage = window.location.pathname.split("/").pop();

links.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

function animateCount(el) {
  const target = +el.getAttribute("data-target");
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

const images = document.querySelectorAll("img");
const statsSection = document.querySelector(".stats-grid");
const statNumbers = document.querySelectorAll(".stat-number .count");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 },
);

images.forEach((image) => revealObserver.observe(image));

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCount);
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 },
);

if (statsSection) statsObserver.observe(statsSection);

const hours = {
  monday: { open: "08:00", close: "18:00" },
  tuesday: { open: "08:00", close: "18:00" },
  wednesday: { open: "08:00", close: "18:00" },
  thursday: { open: "08:00", close: "18:00" },
  friday: { open: "08:00", close: "18:00" },
  saturday: { open: "09:00", close: "16:00" },
  sunday: null, // closed
};

const dayNames = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function updateHoursDisplay() {
  const now = new Date();
  const today = dayNames[now.getDay()];
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // Highlight today's row
  document.querySelectorAll(".hours-row").forEach((row) => {
    row.classList.toggle("is-today", row.dataset.day === today);
  });

  // Determine open/closed status
  const todayHours = hours[today];
  const statusDot = document.querySelector(".status-dot");
  const statusText = document.querySelector(".status-text");

  if (!todayHours) {
    statusDot.className = "status-dot closed";
    statusText.textContent = "Closed today";
    return;
  }

  const openMinutes = timeToMinutes(todayHours.open);
  const closeMinutes = timeToMinutes(todayHours.close);
  const isOpen = nowMinutes >= openMinutes && nowMinutes < closeMinutes;

  if (isOpen) {
    statusDot.className = "status-dot open";
    statusText.textContent = `Open now · closes at ${formatTime(todayHours.close)}`;
  } else {
    statusDot.className = "status-dot closed";
    statusText.textContent =
      nowMinutes < openMinutes
        ? `Closed · opens at ${formatTime(todayHours.open)}`
        : "Closed now";
  }
}

function formatTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0
    ? `${hour12}${period}`
    : `${hour12}:${String(m).padStart(2, "0")}${period}`;
}

updateHoursDisplay();
