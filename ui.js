const burger = document.querySelector("i.toggle-btn");
const navbar = document.querySelector("footer");

function toggleNav() {
  burger.classList.toggle("hidden-burger");
  navbar.classList.toggle("open");
}
burger.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleNav();
});

navbar.addEventListener("click", (event) => {
  event.stopPropagation();
});

document.body.addEventListener("click", () => {
  if (navbar.classList.contains("open")) toggleNav();
});
