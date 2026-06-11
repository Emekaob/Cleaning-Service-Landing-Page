const hamburger = document.getElementById("hamburger");
const navBar = document.getElementById("nav-content");

hamburger.addEventListener("click", () => {
  navBar.classList.toggle("active");
});
