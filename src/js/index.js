// накладываем обработчик событий, чтоб содержимое скобок, подгружалось в первую очередь, без ожидания полной загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  const btnAanalysis = document.querySelector("#analyzeButton");
  const btnClear = document.querySelector("#clearButton");

  // накладываем обработчик событий - click (при нажатии на кнопку сработает содержимое скобок)
  btnAanalysis.addEventListener("click", function (event) {
    event.preventDefault(); 
    getTextAnalysis();
  });

  btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    clearText();
    clearTable();
  });
});

function getTextAnalysis() {
  const userText = document.querySelector("#analyze-title");
  const setUserText = document.querySelector("#userText");

  const firstCharacter = document.querySelector("#answer5");
  const countWords = document.querySelector("#answer1");
  const numOfChar = document.querySelector("#answer2");
  const longestWord = document.querySelector("#answer3");
  const reverseWord = document.querySelector("#answer4");
  const countSentences = document.querySelector("#answer6");
  const countUniqueWord = document.querySelector("#answer7");
  const alphabeticalOrder = document.querySelector("#answer8");

  setUserText.textContent = userText.value;
  firstCharacter.textContent = getFirstCharacter(userText.value);
  countWords.textContent = getCountWords(userText.value);
  numOfChar.textContent = getNumOfChar(userText.value);
  longestWord.textContent = getMaxLengthWord(userText.value);
  reverseWord.textContent = getReverseWord(userText.value);
  countSentences.textContent = getCountSentences(userText.value);
  countUniqueWord.textContent = getCountUniqueWord(userText.value);
  alphabeticalOrder.textContent = getAlphabeticalOrder(userText.value);
}

function clearText() {
  document.getElementById("analyze-title").value = "";
  document.getElementById("userText").textContent = "";
}

function clearTable() {
  document.getElementById("answer1").textContent = "";
  document.getElementById("answer2").textContent = "";
  document.getElementById("answer3").textContent = "";
  document.getElementById("answer4").textContent = "";
  document.getElementById("answer5").textContent = "";
  document.getElementById("answer6").textContent = "";
  document.getElementById("answer7").textContent = "";
  document.getElementById("answer8").textContent = "";
}

function getFirstCharacter(string) {
  // убираем пробелы и возвращаем первый символ
  return string.trim().charAt(0);
}

function getCountWords(string) {
  // строка в массив + заменяем некоторые символы
  const masWords = string.replace(/[\.,?!;:]/gi, "").split(" ");
  let count = masWords.length;

  // поскольку массив может содержать элементы без 'слов', делаем проверку и в случае чего, уменьшаем счетчик
  for (let word = 0; word < masWords.length; word++) {
    if (masWords[word].length <= 0) {
      count--;
    }
  }
  return count;
}

function getNumOfChar(string) {
  return string.length;
}

function getMaxLengthWord(string) {
  // строку в массив + игорируем некоторые знаки препинания, чтоб ключ записывался корректно
  const masWords = string.replace(/[\.,?!;:]/gi, "").split(" ");
  const arrayOfObjects = {}; //массив объектов

  for (let word = 0; word < masWords.length; word++) {
    // записываем объекты (ключ -это слово, значение -это длина слова)
    arrayOfObjects[masWords[word]] = masWords[word].length;
  }

  // находим длину самого длиного слова. Вытаскиваем значение value каждого 'key' в arrayOfObjects, проходим по каждому с помощью Math.max и находим наибольшее значение.
  let maxLength = Math.max(...Object.values(arrayOfObjects));

  // находим какому ключу соответствует найденное ранее наибольшее значение (find - возвращает первое найденное значение)
  const key = Object.keys(arrayOfObjects).find(
    (key) => arrayOfObjects[key] === maxLength
  );
  return key; // возвращаем найденный ключ
}

function getReverseWord(string) {
  // строку в массив + обращаем порядок следования элементов + объединяем обратно в строку
  return string.split("").reverse().join("");
}

function getCountSentences(text) {
  const sentences = text
    .trim()
    .split(/[.!?;]/) // разделение текста на массив строк по символам '.', '!', ';' и '?'
    .filter((sentence) => sentence.trim() !== "");

  return sentences.length;
}

function getCountUniqueWord(string) {
  // используем коллекцию значений Set, которая хранит только уникальные значения
  const masWords = new Set(
    string
      .toLowerCase() // переводим все слова в нижний регистр (например, чтоб слова "яблоко" и "Яблоко", не были засчитаны, как разные слова)
      .replace(/[\.,?!;:]/gi, "") // заменяем некоторые символы, для корректной записи (это нужно для того, что например слово "яблоко" и "яблоко," не считывались, как разные значения)
      .split(" ")
  );
  let count = masWords.size; // записываем в счетчик длину (количество значений в Set)

  // поскольку массив может содержать элементы без 'слов', делаем проверку и в случае чего, уменьшаем счетчик
  if (masWords.has("") || masWords.has(" ")) {
    count--;
  }
  return count;
}

function getAlphabeticalOrder(string) {
  let alphabeticalOrder = string
    .replace(/[\.,?!;:]/gi, "") // заменяем знаки препинания
    .split(" ")
    .sort();

  // возвращаем отфильтрованную копию, без "пустых" элементов + объединяем в строку, где элементы перечислены через запятую
  return alphabeticalOrder
    .filter((word) => word != "" && word != " ")
    .join(", ");
}
