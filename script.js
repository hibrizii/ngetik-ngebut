const btn = document.querySelector(".btn");
const paragraph = document.querySelector(".paragraph");
const words = paragraph.innerHTML.split(" ");
const detik = document.querySelector(".time");
const newHTML = words.map(
  (word) =>
    `<span class= "word">${word
      .split("")
      .map((char) => `<span>${char}</span>`)
      .join("")}</span>`
);
console.log(newHTML);
paragraph.innerHTML = newHTML
  .filter((e) => e != '<span class= "word"></span>')
  .join(" ");
let wordsFinished = 0;
let currentWord = 1;
let charCount = 0;
let wordStatus = true;
let falseWord = 0;
let trueWord = 0;
function generalFungsi(e) {
  if (e.code == "Space" && currentWord < paragraph.children.length - 1) {
    wordsFinished++;
    if (
      charCount < paragraph.children[currentWord].children.length ||
      wordStatus === false
    ) {
      Array.from(paragraph.children[currentWord].children).forEach(
        (char) => (char.style.color = "red")
      );
      falseWord++;
    } else {
      trueWord++;
    }
    wordStatus = true; // wordStatus diubah menjadi true sebelum berpindah ke word selanjutnya
    paragraph.children[currentWord].style.backgroundColor = `transparent`;
    charCount = 0;
    currentWord++;
    // ^^^ counter (current word) berpindah ke selanjutnya
    Array.from(paragraph.children[currentWord].children).forEach(
      (char) => (char.style.color = "white")
    );
    paragraph.children[currentWord].style.backgroundColor = "yellow";
  } else if (
    e.code == "Space" &&
    currentWord >= paragraph.children.length - 1
  ) {
    wordsFinished++;
    gameResult();
  }
  if (
    e.code != "Space" &&
    charCount < paragraph.children[currentWord].children.length
  ) {
    let currentChar =
      paragraph.children[currentWord].children[charCount].innerText;
    if (e.key === currentChar) {
      paragraph.children[currentWord].children[charCount].style.color = "black";
    } else {
      paragraph.children[currentWord].children[charCount].style.color = "red";
      wordStatus = false;
    }
    charCount++;
  }
}

function gameResult() {
  alert(`
        Jumlah kata yang terselesaikan: ${wordsFinished} huruf
        Kata yang benar: ${trueWord} huruf
        Kata yang salah: ${falseWord} huruf
        `);
}

const ketik = (event) => {
  generalFungsi(event);
};

document.addEventListener("keydown", ketik);

function restartBtn() {
  currentWord = 1;
  charCount = 0;
  wordStatus = false;
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

let hitungMundur = 11;
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
