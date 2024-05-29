const btn = document.querySelector(".btn");
const paragraph = document.querySelector(".paragraph");
const words = paragraph.innerHTML.split(" ");
const charLength = words.map((word) => word.split("")).flat().length;
console.log(charLength);
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
let currentWord = 1;
let charCount = 0;
let wordStatus = false;
let falseChar = 0;
let trueChar = 0;

document.addEventListener("keydown", (e) => {
  if (e.code == "Space" && currentWord < paragraph.children.length - 1) {
    let charLength;
    if (charCount < paragraph.children[currentWord].children.length) {
      wordStatus = false;
      charLength = paragraph.children[currentWord].children.length - 1;
      falseChar += charLength - charCount;
      for (let i = charLength; i >= charCount; i--) {
        paragraph.children[currentWord].children[i].style.color = "red";
      }
    }

    // Array.from(paragraph.children[currentWord].children).forEach(
    //   (char) => (char.style.color = `${wordStatus ? "black" : "red"}`)
    // );
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
    alert(`
        Jumlah huruf total: ${charLength} huruf
        Huruf yang benar: ${trueChar} huruf
        Huruf yang salah: ${falseChar} huruf
        `);
  }
  if (
    e.code != "Space" &&
    charCount < paragraph.children[currentWord].children.length
  ) {
    let currentChar =
      paragraph.children[currentWord].children[charCount].innerText;
    if (e.key === currentChar) {
      paragraph.children[currentWord].children[charCount].style.color = "blue";
      wordStatus = true;
      trueChar++;
    } else {
      paragraph.children[currentWord].children[charCount].style.color = "red";
      wordStatus = false;
      falseChar++;
    }
    charCount++;
  }
});

function restartBtn() {
  currentWord = 1;
  charCount = 0;
  wordStatus = false;
  falseChar = 0;
  trueChar = 0;
  paragraph.children[currentWord].style.backgroundColor = "green";
  Array.from(paragraph.children).forEach((word) => {
    word.style.backgroundColor = "transparent";
    Array.from(word.children).forEach((char) => {
      char.style.color = "black";
    });
  });
}

btn.addEventListener("click", () => {
  restartBtn();
});
// btn.addEventListener( "click", () => {
//     restartBtn();
//     paragraph.children[currentWord].style.backgroundColor = "yellow";
//     paragraph.children[currentWord].style.color = "white";
//     btn.innerText = "Restart";
//     generalPlay;
// })
paragraph.children[currentWord].style.backgroundColor = "yellow";
