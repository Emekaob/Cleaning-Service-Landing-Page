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

const images = document.querySelectorAll("img");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

images.forEach((image) => observer.observe(image));
