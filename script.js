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
  const duration = 1500; // ms
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);
    el.textContent = value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString(); // snap to exact final value
    }
  }

  requestAnimationFrame(update);
}

const images = document.querySelectorAll("img");
const statsSection = document.querySelector(".stats-grid");
const statNumbers = document.querySelectorAll(".stat-number .count");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCount);
        observer.disconnect(); // only run once
      }
    });
  },
  {
    threshold: 0.2,
  },
);

if (statsSection) observer.observe(statsSection);

images.forEach((image) => observer.observe(image));
