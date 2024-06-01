const btn = document.querySelector(".btn");
const paragraph = document.querySelector(".paragraph");
const words = paragraph.innerHTML.split(" ");
const detik = document.querySelector(".time");
const newHTML = words.map(
  (word) =>
    `<span class= "word">${word
      .split("")
      .filter((e) => e !== "\n")
      .map((char) => `<span>${char}</span>`)
      .join("")}</span>`
);
paragraph.innerHTML = newHTML
  .filter((e) => e != '<span class= "word"></span>')
  .join(" ");
let wordsFinished = 0;
let currentWord = 0;
let charCount = 0;
let falseCharInWordCount = 0;
let falseWord = 0;
let trueWord = 0;

function wordValidator() {
  if (
    charCount < paragraph.children[currentWord].children.length ||
    falseCharInWordCount > 0
  ) {
    Array.from(paragraph.children[currentWord].children).forEach(
      (char) => (char.style.color = "red")
    );
    falseWord++;
  } else {
    trueWord++;
  }
}

function gamePlay(e) {
  if (e.code == "Space") {
    e.preventDefault();
    wordValidator();
    falseCharInWordCount = 0; // falseCharInWordCount dijadikan 0 sbelum masuk word selanjutnya
    paragraph.children[currentWord].style.backgroundColor = `transparent`;
    charCount = 0;
    wordsFinished++;
    currentWord++; // counter (current word) berpindah ke selanjutnya
    // Pengkondisian jika kata sudah habis, maka function gameResult akan dijalankan dan function gamePlay dihentikan
    if (currentWord >= paragraph.children.length) {
      gameResult();
      clearInterval(intervalId);
      return;
    }
    //====MASUK KE WORD SELANJUTNYA=====
    Array.from(paragraph.children[currentWord].children).forEach(
      (char) => (char.style.color = "white")
    );
    paragraph.children[currentWord].style.backgroundColor = "#00e676";
  } else if (
    e.key.length < 2 &&
    charCount < paragraph.children[currentWord].children.length
  ) {
    let currentChar = paragraph.children[currentWord].children[charCount];
    if (e.key === currentChar.innerText) {
      currentChar.style.color = "black";
      charCount++;
    } else {
      currentChar.style.color = "red";
      falseCharInWordCount++;
      charCount++;
    }
  } else if (e.key === "Backspace") {
    eraser();
  }
}

function eraser() {
  if (charCount == 0) {
    return;
  }
  charCount--;
  const hurufSekarang = paragraph.children[currentWord].children[charCount];
  if (hurufSekarang.style.color === "red") falseCharInWordCount--;
  hurufSekarang.style.color = "white";
}

function gameResult() {
  alert(`
        Jumlah kata yang terselesaikan: ${wordsFinished} huruf
        Kata yang benar: ${trueWord} huruf
        Kata yang salah: ${falseWord} huruf
        `);
}

const ketik = (event) => {
  gamePlay(event);
};

// function restartBtn() {
//   currentWord = 0;
//   charCount = 0;
//   falseCharInWordCount = 0;
//   falseWord = 0;
//   trueWord = 0;
//   Array.from(paragraph.children).forEach((word) => {
//     word.style.backgroundColor = "transparent";
//     Array.from(word.children).forEach((char) => {
//       char.style.color = "black";
//     });
//   });
//   Array.from(paragraph.children[currentWord].children).forEach(
//     (char) => (char.style.color = "white")
//   );
//   paragraph.children[currentWord].style.backgroundColor = "#00e676";
//   document.addEventListener("keydown", ketik);
//   intervalId = setInterval(coba, 1000);
// }

let hitungMundur = 60;
let intervalId;

function starto() {
  if (hitungMundur > 0) {
    hitungMundur--;
    detik.innerText = hitungMundur;
  } else {
    clearInterval(intervalId);
    gameResult();
    document.removeEventListener("keydown", ketik);
  }
}

btn.addEventListener("click", () => {
  btn.innerText = "Restart";
  document.addEventListener("keydown", ketik);
  intervalId = setInterval(starto, 1000);
});

// btn.addEventListener( "click", () => {
//     restartBtn();
//     paragraph.children[currentWord].style.backgroundColor = "#00e676";
//     paragraph.children[currentWord].style.color = "white";
//     btn.innerText = "Restart";
//     generalPlay;
// })
paragraph.children[currentWord].style.backgroundColor = "#00e676";
Array.from(paragraph.children[currentWord].children).forEach(
  (char) => (char.style.color = "white")
);
