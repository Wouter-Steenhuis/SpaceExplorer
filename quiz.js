const questions = [
  {
    question: "Hoeveel manen heeft Mars?",
    answers: ["1", "2", "3", "4"],
    correctAnswer: 1,
  },
  {
    question: "Welke planeet staat het dichtst bij de zon?",
    answers: ["Mercurius", "Uranus", "Mars", "Venus"],
    correctAnswer: 0,
  },
  {
    question: "Welke planeet heeft de meeste manen?",
    answers: ["Saturnus", "Jupiter", "Mercurius", "Aarde"],
    correctAnswer: 1,
  },
  {
    question: "Welke bemande ruimtemissie was de eerste die de maan bereikte?",
    answers: ["Apollo2", "Cosmo3", "Vostok1", "Apollo11"],
    correctAnswer: 3,
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers-container");
const nextButton = document.getElementById("next-button");
const feedbackContainer = document.getElementById("feedback-container");
const scoreContainer = document.getElementById("score-container");

function showQuestion() {
  const question = questions[currentQuestion];
  questionElement.textContent = question.question;
  answersContainer.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.classList.add("answer");
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.appendChild(button);
  });
}

function selectAnswer(index) {
  const selectedButton = document.querySelector(".selected");
  if (selectedButton) {
    selectedButton.classList.remove("selected");
  }
  const answerButtons = document.querySelectorAll(".answer");
  answerButtons[index].classList.add("selected");
}

function checkAnswer() {
  const selectedButton = document.querySelector(".selected");
  if (!selectedButton) return;

  const selectedAnswerIndex = Array.from(selectedButton.parentNode.children).indexOf(selectedButton);
  const question = questions[currentQuestion];
  if (selectedAnswerIndex === question.correctAnswer) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
    const correctButton = answersContainer.children[question.correctAnswer];
    correctButton.classList.add("correct");
  }
  nextButton.disabled = true;
  setTimeout(nextQuestion, 2000);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
    resetFeedback();
    nextButton.disabled = false; 
  } else {
    showScorePage();
  }
}

function resetFeedback() {
  feedbackContainer.textContent = "";
  const answerButtons = document.querySelectorAll(".answer");
  answerButtons.forEach(button => {
    button.classList.remove("correct", "incorrect", "selected");
  });
}

function showScorePage() {
  document.getElementById("quiz-container").style.display = "none";
  scoreContainer.textContent = "Jouw score is: " + score + "/4";
  const scorePage = document.getElementById("score-page");
  if (scorePage) {
    scorePage.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  showQuestion();

  nextButton.addEventListener("click", checkAnswer);
});
function showScorePage() {
  const queryString = new URLSearchParams(window.location.search);
  queryString.set('score', score); 
  const newUrl = `score.html?${queryString.toString()}`;
  setTimeout(function() {
    window.location.href = newUrl;
  }, 5); 
}
document.getElementById("backButton").addEventListener("click", () => {
  window.location.href = "index.html";
})
