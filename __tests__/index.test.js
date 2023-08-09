import {
  getTextAnalysis,
  clearTable,
  clearText,
  getFirstCharacter,
  getCountWords,
  getNumOfChar,
  getMaxLengthWord,
  getReverseWord,
  getCountSentences,
  getCountUniqueWord,
  getAlphabeticalOrder,
} from "../src/js/index";

// Создаем фиктивный HTML для тестирования
document.body.innerHTML = `
  <main class="container">
    <form id="analyse-list-form">
      <div class="left">
        <label class="label" for="analyze-title">Enter your text</label>
        <textarea rows="3" class="input" required id="analyze-title"></textarea>

        <label class="label" for="">Your text</label>
        <p id="userText"></p>
      </div>

      <div class="right">
        <button id="analyzeButton" class="btn btn-accent">Analyze</button>
        <button id="clearButton" class="btn btn-default">Clear table</button>
      </div>
    </form>
    <table class="table" border="1">
      <thead>
        <tr>
          <th width="200px">Variation</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>First character</td>
          <td id="answer5"></td>
        </tr>
        <tr>
          <td>Words count</td>
          <td id="answer1"></td>
        </tr>
        <tr>
          <td>Number of characters</td>
          <td id="answer2"></td>
        </tr>
        <tr>
          <td>Max length word</td>
          <td id="answer3"></td>
        </tr>
        <tr>
          <td>Reverse word</td>
          <td id="answer4"></td>
        </tr>
        <tr>
          <td>Sentences count</td>
          <td id="answer6"></td>
        </tr>
        <tr>
          <td>Unique word count</td>
          <td id="answer7"></td>
        </tr>
        <tr>
          <td>Words in alphabetical order</td>
          <td id="answer8"></td>
        </tr>
      </tbody>
    </table>
  </main>
`;

// Функция для добавления слушателей событий
function addEventListeners() {
  // проверить querySelector
  const btnAanalysis = document.getElementById("analyzeButton");
  const btnClear = document.getElementById("clearButton");

  btnAanalysis.addEventListener("click", function (event) {
    event.preventDefault();
    getTextAnalysis();
  });

  btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    clearText();
    clearTable();
  });
}

// Вызываем функцию добавления слушателей перед каждым тестом
beforeEach(() => {
  addEventListeners();
});

describe("Анализ текста", () => {
  // Тест на анализ текста
  test("Анализировать текст", () => {
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

    // Вводим текст для анализа
    userText.value = "This is a test sentence. Another test sentence!";

    // Вызываем функцию анализа
    getTextAnalysis();

    // Проверяем результаты анализа
    expect(firstCharacter.textContent).toBe("T");

    //проверить
    expect(countWords.textContent).toBe("10");
    //проверить
    expect(numOfChar.textContent).toBe("49");

    expect(longestWord.textContent).toBe("sentence");
    expect(reverseWord.textContent).toBe(
      "!ecnetnes tset rehtonA .ecnetnes tset a si sihT"
    );
    expect(countSentences.textContent).toBe("2");
    expect(countUniqueWord.textContent).toBe("7");
    expect(alphabeticalOrder.textContent).toBe(
      "Another, This, a, is, sentence, test, tsuJ"
    );

    // Проверяем очистку текстового поля
    expect(userText.value).toBe("");

    // Проверяем текст, который был помещен в <p> элемент
    expect(setUserText.textContent).toBe(
      "This is a test sentence. Another test sentence!"
    );
  });
});

// Тест на поиск самого длинного слова
test("Поиск самого длинного слова", () => {
  const words = ["This", "is", "a", "test", "sentence"];
  const longestWord = getMaxLengthWord(words);
  expect(longestWord).toBe("sentence");
});

// Тест на подсчет предложений в тексте
test("Подсчет предложений в тексте", () => {
  const text = "This is a test sentence. Another test sentence!";
  const sentenceCount = getCountSentences(text);
  expect(sentenceCount).toBe(2);
});

// Тест на подсчет количества уникальных слов в массиве слов
test("Подсчет уникальных слов", () => {
  const words = ["This", "is", "a", "test", "sentence", "test", "Sentence"];
  const uniqueWordCount = getCountUniqueWord(words);
  expect(uniqueWordCount).toBe(5);
});

// Тест на вывод слов массива в алфавитном порядке
test("Вывод слов в алфавитном порядке", () => {
  const words = ["This", "is", "a", "test", "sentence"];
  const sortedWords = getAlphabeticalOrder(words);
  expect(sortedWords).toBe("This, a, is, sentence, test");
});

// Тест на очистку таблицы с результатами
test("Очистка таблицы с результатами", () => {
  const countWords = document.getElementById("answer1");
  const numOfChar = document.getElementById("answer2");
  const longestWord = document.getElementById("answer3");
  const reverseWord = document.getElementById("answer4");
  const firstCharacter = document.getElementById("answer5");
  const countSentences = document.getElementById("answer6");
  const countUniqueWord = document.getElementById("answer7");
  const alphabeticalOrder = document.getElementById("answer8");

  // Заполним некоторые значения, чтобы убедиться, что они будут очищены
  countWords.textContent = "10";
  numOfChar.textContent = "49";
  longestWord.textContent = "sentence";
  reverseWord.textContent = "!ecnetnes tset rehtona tsuJ";
  firstCharacter.textContent = "T";
  countSentences.textContent = "2";
  countUniqueWord.textContent = "10";
  alphabeticalOrder.textContent = "Another, This, a, is, sentence, test, tsuJ";

  // Вызываем функцию очистки таблицы
  clearTable();

  // Проверяем, что значения таблицы были очищены
  expect(countWords.textContent).toBe("");
  expect(numOfChar.textContent).toBe("");
  expect(longestWord.textContent).toBe("");
  expect(reverseWord.textContent).toBe("");
  expect(firstCharacter.textContent).toBe("");
  expect(countSentences.textContent).toBe("");
  expect(countUniqueWord.textContent).toBe("");
  expect(alphabeticalOrder.textContent).toBe("");
});

// Тест на очистку текстового поля
test("Очистка текстового поля", () => {
  const userText = document.getElementById("analyze-title");

  // Заполним поле текстом, чтобы убедиться, что оно будет очищено
  analyzeTitle.value = "This is a test sentence. Another test sentence!";

  // Вызываем функцию очистки текстового поля
  clearText();

  // Проверяем, что поле было очищено
  expect(userText.value).toBe("");
});
