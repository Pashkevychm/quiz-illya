const questions = [
    {
        text: "Що зробити перед початком роботи?",
        answers: ["Турбувати учнів", "Надягнути спец одяг", "Грати в телефоні", "Піти додому"],
        correct: 1
    },
    {
        text: "Який інструмент використовують для забивання цвяхів",
        answers: ["Ножиці", "Рубанок", "Молоток", "Викрутка"],
        correct: 2
    },
    {
        text: "Який інструмент потрібен для закручування шурупів?",
        answers: ["Викрутка", "Шило", "Гайковий ключ", "Болгарка"],
        correct: 0
    },
    {
        text: "Який інструмент дозволяє виміряти діаметр отвору або товщину деталі?",
        answers: ["Шило", "Молоток", "Транспортир", "Штангенциркуль"],
        correct: 3
    },
    {
        text: "Який інструмент використовують для стругання деревини, щоб зняти нерівності та надати деталі потрібної форми і гладкості?",
        answers: ["Зубило", "Лобзик", "Рубанок", "Ножиці"],
        correct: 2
    },
];

const startScreen = document.querySelector("#start-screen");
const gameScreen = document.querySelector("#quiz-screen");
const resultScreen = document.querySelector("#result-screen");

const playBtn = startScreen.querySelector(".start-btn")
const replayBtn = resultScreen.querySelector(".start-btn")

const questionsElement = document.querySelector("#question");
const answersContainer = document.querySelector("#answers-container");

const timerElement = document.querySelector("#timer");
const scoreElement = document.querySelector("#score");
const resultElement = document.querySelector("#result");

let score = 0;
let questionIndex = 0;
let interval;

function showQuestion(question) {
    let timer = 10;
    timerElement.textContent = `Час: ${timer}`
    interval = setInterval(function() {
        timer -= 1
        timerElement.textContent = `Час: ${timer}`
        if (timer <= 0) {
            clearInterval(interval)
            nextQuestion()
        }
        }, 1000)
    questionsElement.textContent = question.text
    answersContainer.innerHTML = ""
    question.answers.forEach(function(optionText, i){
        const btn = document.createElement("button")
        btn.textContent = optionText
        btn.classList.add("answer-btn")
        btn.addEventListener("click", function() {
            checkAnswer(btn , i)
        })
        answersContainer.append(btn)
    })
}

function checkAnswer(btn, order) {
    clearInterval(interval)
    if (order == questions[questionIndex].correct) {
        score += 1
        scoreElement.textContent = `Бали: ${score}`
        confetti ({
            particleCount: 500,
            spread: 100,
            origin: {y: 0.6}
        })
        btn.classList. add("correct")
    } else {
        btn.classList.add("wrong")
    }
    setTimeout(nextQuestion, 1000)
    const buttons = answersContainer.querySelectorAll(".answer-btn")
    buttons.forEach((btn) => btn.disabled = true)
}

function nextQuestion(){
    questionIndex++
    if (questionIndex < questions.length) {
        showQuestion(questions[questionIndex])
    }else{
        clearInterval(game_time_interval)
        resultElement.innerHTML = `
            Набрано балів: ${score} з ${questions.length}<br>
            Пройшло часу: ${game_time}. ${game_time < 15 ? "Ви швидкий" : "Ви повільний"}
        `
        resultScreen.classList.remove("hide")
        gameScreen.classList.add("hide")
    }
}

let game_time;
let game_time_interval;
function startGame() {
    game_time = 0
    game_time_interval = setInterval(function() {
        game_time +=1;
    }, 1000)
    startScreen.classList.add("hide")
    resultScreen.classList.add("hide")
    gameScreen.classList.remove("hide")
    score = 0;
    scoreElement.textContent = `Бали: ${score}`
    questionIndex = 0;
    showQuestion(questions[questionIndex])
}
playBtn.addEventListener("click", startGame)
replayBtn.addEventListener("click", startGame)