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
    wordValidator();
    falseCharInWordCount = 0; // falseCharInWordCount dijadikan 0 sbelum masuk word selanjutnya
    paragraph.children[currentWord].style.backgroundColor = `transparent`;
    charCount = 0;
    wordsFinished++;
    currentWord++; // counter (current word) berpindah ke selanjutnya
    // Pengkondisian jika kata sudah habis, maka function gameResult akan dijalankan dan function gamePlay dihentikan
    if (currentWord >= paragraph.children.length) {
      gameResult();
      return;
    }
    //====MASUK KE WORD SELANJUTNYA=====
    Array.from(paragraph.children[currentWord].children).forEach(
      (char) => (char.style.color = "white")
    );
    paragraph.children[currentWord].style.backgroundColor = "yellow";
  } else if (
    e.key != "Space" &&
    charCount < paragraph.children[currentWord].children.length
  ) {
    let currentChar =
      paragraph.children[currentWord].children[charCount].innerText;
    if (e.code === "Backspace") {
      charCount--;
      const hurufSekarang = paragraph.children[currentWord].children[charCount];
      if (hurufSekarang.style.color === "red") falseCharInWordCount--;
      hurufSekarang.style.color = "white";
    } else if (e.key === currentChar) {
      paragraph.children[currentWord].children[charCount].style.color = "blue";
      charCount++;
    } else {
      paragraph.children[currentWord].children[charCount].style.color = "red";
      falseCharInWordCount++;
      charCount++;
    }
  }
}

// function eraser(e) {
//   if (e.code === "Backspace") {
//     charCount--;
//     const hurufSekarang = paragraph.children[currentWord].children[charCount];
//     if (hurufSekarang.style.color === "red") falseCharInWordCount--;
//     hurufSekarang.style.color = "white";
//   }
// }

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

document.addEventListener("keydown", ketik);

function restartBtn() {
  currentWord = 0;
  charCount = 0;
  falseCharInWordCount = 0;
  falseWord = 0;
  trueWord = 0;
  Array.from(paragraph.children).forEach((word) => {
    word.style.backgroundColor = "transparent";
    Array.from(word.children).forEach((char) => {
      char.style.color = "black";
    });
  });
  Array.from(paragraph.children[currentWord].children).forEach(
    (char) => (char.style.color = "white")
  );
  paragraph.children[currentWord].style.backgroundColor = "yellow";
}

let hitungMundur = 111;
let track = 1;

function coba() {
  if (hitungMundur > 0) {
    hitungMundur--;
    detik.innerText = hitungMundur;
  } else {
    clearInterval(intervalId);
    gameResult();
    document.removeEventListener("keydown", ketik);
  }
}

const intervalId = setInterval(coba, 1000);

btn.addEventListener("click", () => {
  console.log("hola " + track);
  track++;
});

// btn.addEventListener( "click", () => {
//     restartBtn();
//     paragraph.children[currentWord].style.backgroundColor = "yellow";
//     paragraph.children[currentWord].style.color = "white";
//     btn.innerText = "Restart";
//     generalPlay;
// })
paragraph.children[currentWord].style.backgroundColor = "yellow";
Array.from(paragraph.children[currentWord].children).forEach(
  (char) => (char.style.color = "white")
);
