// const webName = document.querySelector("header");

// let lastScroll = 0;

// window.addEventListener("scroll", () => {
//   const currentScrollY = window.scrollY;

//   // Batasi opacity antara 0 dan 1
//   let op = Math.max(0, Math.min(1, 1 - currentScrollY / 100)); // Kurangi opacity lebih lambat

//   // Ubah opacity hanya jika posisinya berubah
//   if (currentScrollY !== lastScroll) {
//     webName.style.opacity = op;
//   }

//   lastScroll = currentScrollY;
// });

const webName = document.querySelector("header");
const sections = document.getElementsByClassName("ss");
let secIndex = 0;
let lastScroll = 0;

// window.addEventListener("scroll", () => {
//   let currentScrollY = window.scrollY;
//   if (lastScroll < currentScrollY) {
//     secIndex++;
//   } else if (lastScroll > currentScrollY) {
//     secIndex--;
//   }
//   lastScroll = currentScrollY;

//   if (sections[secIndex]) {
//     sections[secIndex].scrollIntoView({ behavior: "instant" });
//   }
// });

// window.addEventListener("scroll", () => {
//   let currentScrollY = window.scrollY;
//   if (lastScroll < currentScrollY) {
//     console.log("scroll kebawah");
//   } else {
//     console.log("scroll Ke Atas");
//   }
//   lastScroll = currentScrollY;
// });
