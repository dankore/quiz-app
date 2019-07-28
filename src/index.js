import "./styles.css";

const section = document.querySelector("section");
const startButton = document.querySelector("#start-btn");
const nextButton = document.querySelector("#next-btn");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.querySelector("#questions");
const answerButtonElement = document.querySelector("#answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement("button");

    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonElement.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(section);
  nextButton.classList.add("hide");
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;

  const correct = selectedButton.dataset.correct;
  setsStateClass(section, correct);
  Array.from(answerButtonElement.children).forEach(button => {
    setsStateClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setsStateClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "What is 2 + 2?",
    answers: [{ text: "4", correct: true }, { text: "22", correct: false }]
  },
  {
    question: "What is 3 * 2?",
    answers: [{ text: "6", correct: true }, { text: "22", correct: false }]
  },
  {
    question: "What is 52 / 2?",
    answers: [{ text: "26", correct: true }, { text: "22", correct: false }]
  }
];
