const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Text Makeup Language", correct: false }
        ]
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            { text: "<link>", correct: false },
            { text: "<a>", correct: true },
            { text: "<hyperlink>", correct: false },
            { text: "<url>", correct: false }
        ]
    },
    {
        question: "Which CSS property is used to change the color of text?",
        answers: [
            { text: "text-color", correct: false },
            { text: "color", correct: true },
            { text: "font-color", correct: false },
            { text: "text-style", correct: false }
        ]
    },
    {
        question: "Which JavaScript function is used to output data to the console?",
        answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "log()", correct: false },
            { text: "display()", correct: false }
        ]
    },
    {
        question: "What is the correct syntax for commenting in JavaScript?",
        answers: [
            { text: "// This is a comment", correct: true },
            { text: "<!-- This is a comment -->", correct: false },
            { text: "/* This is a comment */", correct: false },
            { text: "\ This is a comment", correct: false }
        ]
    },

];

const questionElement = document.getElementById("question");
const answersButtons = document.getElementById("answers");
const nextBtn = document.getElementById("next");

let score = 0;
let currentIndex = 0;

function startQuiz() {
    score = 0;
    currentIndex = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
};

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentIndex];
    let n = currentIndex + 1;
    questionElement.innerHTML = `${n}. ${currentQuestion.question}`

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = answer.text;
        answersButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        };
        button.addEventListener("click", selectAnswer);
    })
};

function resetState() {
    nextBtn.style.display = "none";
    while (answersButtons.firstChild) {
        answersButtons.removeChild(answersButtons.firstChild);
    }
};

function selectAnswer(e) {
    e.target.dataset.correct ?
        e.target.classList.add("correct") :
        e.target.classList.add("incorrect");
    
    if (e.target.dataset.correct) score++;

    Array.from(answersButtons.children).forEach(btn => {
        if (btn.dataset.correct === 'true') btn.classList.add("correct");
        btn.disabled = true;
    })

    nextBtn.style.display = "block"
};

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} Out Of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handelNextBtn() {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", _ => { 
    if (currentIndex < questions.length) {
        handelNextBtn();
    }
    else {
        startQuiz();
    }
})
startQuiz();

