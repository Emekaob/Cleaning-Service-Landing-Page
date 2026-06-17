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
