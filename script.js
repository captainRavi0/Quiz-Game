const questions =[
    {
        question: "How do you react to criticism?",
        answers: [
            {text: "A) Accept and improve",correct: false},
            {text: "B) Feel bad but think about it",correct: true},
            {text: "C) Ignore it",correct: false},
            {text: "D) Get defensive",correct: false},
        ]
    },
    {
         question: "In a post-apocalyptic world, you would:",
        answers: [
            {text: "A) Help strangers",correct: false},
            {text: "B) Avoid people",correct: false},
            {text: "C) Trust only close ones",correct: true},
            {text: "D) Survive alone",correct: false},
        ]
    },
    {
         question: "When facing a large enemy horde:",
        answers: [
            {text: "A) Plan strategy",correct: true},
            {text: "B) Attack directly",correct: false},
            {text: "C) Escape",correct: false},
            {text: "D) Hide",correct: false},
        ]
    },
    {
         question: "When resources (ammo, health) are low, you:",
        answers: [
            {text: "A) Save them for later",correct: true},
            {text: "B) Use immediately",correct: false},
            {text: "C) Panic use",correct: false},
            {text: "D) Quite here",correct: false},
        ]
    },
    {
         question: "Losing someone close in apocalypse would make you:",
        answers: [
            {text: "A) Stronger",correct: false},
            {text: "B) Emotionally broken",correct: false},
            {text: "C) Angry",correct: false},
            {text: "D) Isolated",correct: true},
        ]
    }      
];
const questionElement = document.getElementById("question"); 
const answerButton = document.getElementById("answer-button"); 
const nextButton = document.getElementById("next-btn"); 

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block" ;
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();