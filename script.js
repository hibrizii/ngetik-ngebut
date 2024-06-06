const btn = document.querySelector(".btn.ctr");
const paragraph = document.querySelector(".paragraph");
const words = paragraph.innerHTML.split(" ");
const detik = document.querySelector(".time");
const resultDialog = document.querySelector("dialog#result-dialog");
const wpmEstDisplay = document.querySelector(".wpm-est");
let wordsFinished = 0;
let currentWord = 0;
let charCount = 0;
let falseCharInWordCount = 0;
let falseWord = 0;
let trueWord = 0;
let paragraphCount = 0;
let hitungMundur = 60;
let intervalId;

const typingSpeedMessages = {
  slow: {
    minWPM: 0,
    maxWPM: 15,
    message:
      "Lambat banget?!!, mungkin ngetik bukan passionmu deh. </br> kamu cocoknya joget aja! Oke gass oke gass",
    color: "red",
  },
  beginner: {
    minWPM: 16,
    maxWPM: 30,
    message:
      "Sepertinya Kamu musti latihan lebih sering lagi <br/> biar tambah ngebut ngetiknya.",
    color: "yellow",
  },
  average: {
    minWPM: 31,
    maxWPM: 45,
    message: "Kecepatan rata-rata, cukup lumayan.",
    color: "#008846",
  },
  fast: {
    minWPM: 46,
    maxWPM: 60,
    message: "Wah, cepat juga! Jari-jarimu lincah!",
    color: "#008846",
  },
  pro: {
    minWPM: 61,
    maxWPM: Infinity,
    message:
      "Ngebut banget busett! Lu olang bukan manusia ya! </br> btw keren sihh!!",
    color: "#008846",
  },
};

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

Array.from(resultDialog.children).forEach((e) =>
  e.addEventListener("click", () => {
    resultDialog.close();
  })
);

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

function getTypingSpeedMessage(wpm) {
  for (const level in typingSpeedMessages) {
    const { minWPM, maxWPM, message, color } = typingSpeedMessages[level];
    if (wpm >= minWPM && wpm <= maxWPM) {
      return { message, color };
    }
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
    // Pengkondisian jika paragraph sekarang sudah habis, akan diupdate ke paragraph selanjutnya
    if (currentWord >= paragraph.children.length) {
      console.log(paragraphCount);
      paragraphCount++;
      if (paragraphCount >= newHTML.length) paragraphCount = 0;
      currentWord = 0;
      paragraph.innerHTML = newHTML[paragraphCount].join(" ");
      updateParagraph();
    }
    //====MASUK KE WORD SELANJUTNYA======
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

function estimatingWPM() {
  const multiplier = Math.round(60 / (60 - hitungMundur));
  const finiteNum = isFinite(multiplier) ? multiplier : 1;
  const result = trueWord * finiteNum;
  const { color } = getTypingSpeedMessage(result);
  wpmEstDisplay.innerText = result;
  wpmEstDisplay.parentElement.style.color = `${color}`;
}

function gameResult() {
  const { message, color } = getTypingSpeedMessage(trueWord);
  wpmEstDisplay.innerText = trueWord;
  wpmEstDisplay.parentElement.style.color = `${color}`;
  resultDialog.children[0].innerHTML = `
        Kecepatan ngetikmu:
        <h1 class="wpm-result" style="color: ${color};">${trueWord} WPM</h1>
        <p>${message}</p>
        `;
  resultDialog.showModal();
}

const ketik = (event) => {
  gamePlay(event);
};

function restartBtn() {
  clearInterval(intervalId);
  document.removeEventListener("keydown", ketik);
  wordsFinished = 0;
  hitungMundur = 60;
  currentWord = 0;
  charCount = 0;
  falseCharInWordCount = 0;
  falseWord = 0;
  trueWord = 0;
  paragraphCount = 0;
  paragraph.innerHTML = newHTML[paragraphCount].join(" ");
  updateParagraph();
  wpmEstDisplay.innerText = 0;
  wpmEstDisplay.parentElement.style.color = "#f8f8f2";
  detik.innerText = 60;
  btn.innerText = "Start";
  btn.onclick = starto;
}

function intervalLogic() {
  if (hitungMundur > 0) {
    hitungMundur--;
    if (hitungMundur % 2 == 0) estimatingWPM();
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
  btn.innerText = "Reset";
  btn.onclick = restartBtn;
}

function showWPM() {
  const dialog = document.getElementById("abt-wpm");
  dialog.showModal();
}

function hideWPM() {
  document.getElementById("abt-wpm").close();
}

btn.onclick = starto;
