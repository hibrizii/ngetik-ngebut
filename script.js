const btn = document.querySelector(".btn.ctr");
const paragraph = document.querySelector(".paragraph");
const words = paragraph.innerHTML.split(" ");
const detik = document.querySelector(".time");
const resultDialog = document.querySelector("dialog#result-dialog");
let wordsFinished = 0;
let currentWord = 0;
let charCount = 0;
let falseCharInWordCount = 0;
let falseWord = 0;
let trueWord = 0;
let paragraphCount = 0;

const arrayHTML = words.map(
  (word) =>
    `<span class= "word">${word
      .split("")
      .filter((e) => e !== "\n")
      .map((char) => `<span>${char}</span>`)
      .join("")}</span>`
);

const newHTML = paragraphChunks(arrayHTML);
paragraph.innerHTML = newHTML[paragraphCount].join(" ");

resultDialog.children[1].addEventListener("click", (e) => {
  e.preventDefault();
  resultDialog.close();
});

function paragraphChunks(arr, chunkLength = 20) {
  const subArrays = [];
  const arrFiltered = arr.filter((e) => e != '<span class= "word"></span>');
  while (arrFiltered.length > 0) {
    subArrays.push(arrFiltered.splice(0, chunkLength));
  }
  return subArrays;
}

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
    if (paragraphCount >= newHTML.length) return;
    e.preventDefault();
    wordValidator();
    falseCharInWordCount = 0; // falseCharInWordCount dijadikan 0 sbelum masuk word selanjutnya
    paragraph.children[currentWord].style.backgroundColor = `transparent`;
    charCount = 0;
    wordsFinished++;
    currentWord++; // counter (current word) berpindah ke selanjutnya
    // Pengkondisian jika kata sudah habis, maka function gameResult akan dijalankan dan function gamePlay dihentikan
    if (currentWord >= paragraph.children.length) {
      console.log(paragraphCount);
      paragraph.innerHTML = newHTML[paragraphCount].join(" ");
      currentWord = 0;
      updateParagraph();
      paragraphCount++;
    }
    //====MASUK KE WORD SELANJUTNYA=====
    Array.from(paragraph.children[currentWord].children).forEach(
      (char) => (char.style.color = "white")
    );
    paragraph.children[currentWord].style.backgroundColor = "#008846";
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
function updateParagraph() {
  Array.from(paragraph.children).forEach((word) => {
    word.style.backgroundColor = "transparent";
    Array.from(word.children).forEach((char) => {
      char.style.color = "white";
    });
  });
  paragraph.children[currentWord].style.backgroundColor = "#008846";
}

function eraser() {
  if (charCount == 0) return;
  charCount--;
  const hurufSekarang = paragraph.children[currentWord].children[charCount];
  if (hurufSekarang.style.color === "red") falseCharInWordCount--;
  hurufSekarang.style.color = "white";
}

function gameResult() {
  resultDialog.children[0].innerText = `
        Kecepatan Ngetikmu: ${trueWord} WPM!
        (WPM: Words per Minutes)

        Sepertinya Kamu musti latihan lebih sering lagi deh...
        biar tambah ngebut ngetiknya.
        `;
  resultDialog.showModal();
}

const ketik = (event) => {
  gamePlay(event);
};

function restartBtn() {
  clearInterval(intervalId);
  wordsFinished = 0;
  hitungMundur = 10;
  currentWord = 0;
  charCount = 0;
  falseCharInWordCount = 0;
  falseWord = 0;
  trueWord = 0;
  paragraphCount = 0;
  paragraph.innerHTML = newHTML[paragraphCount].join(" ");
  updateParagraph();
  document.addEventListener("keydown", ketik);
  starto();
}

let hitungMundur = 60;
let intervalId;

function intervalLogic() {
  if (hitungMundur > 0) {
    hitungMundur--;
    detik.innerText = hitungMundur;
  } else {
    clearInterval(intervalId);
    gameResult();
    document.removeEventListener("keydown", ketik);
  }
}

function starto() {
  paragraph.children[currentWord].style.backgroundColor = "#008846";
  Array.from(paragraph.children[currentWord].children).forEach(
    (char) => (char.style.color = "white")
  );
  detik.innerText = hitungMundur;
  document.addEventListener("keydown", ketik);
  intervalId = setInterval(intervalLogic, 1000);
  btn.innerText = "Restart";
  btn.onclick = restartBtn;
}

btn.onclick = starto;
