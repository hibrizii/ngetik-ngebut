const burger = document.querySelector("i.toggle-btn");
const navbar = document.querySelector("nav");
const closeBtns = document.getElementsByClassName("close");

function showDialog(str) {
  const dialog = document.querySelector(str);
  dialog.showModal();
}

Array.from(closeBtns).forEach((node) =>
  node.addEventListener("click", (event) => {
    event.target.parentNode.addEventListener("click", (parent) => {
      parent.stopPropagation();
    });
    console.log(event.target);
    console.log(event.target.parentNode);
    event.target.parentNode.close();
  })
);

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
