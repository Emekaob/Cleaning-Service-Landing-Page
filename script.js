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
