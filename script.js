const questoins = [
    {
        question : "Which is the largest animal in the world?",
        answer : [
            {text : "Shark",  correct : false},
            {text : "Elephant",  correct : true},
            {text : "Lion",  correct : false},
            {text : "Cow",  correct : false},
        ]
    },
    {
        question : "Whiat is the Capital of Pakistan?",
        answer : [
            {text : "Lahore",  correct : false},
            {text : "Pindi",  correct : false},
            {text : "Islambad",  correct : true},
            {text : "Faisalabad",  correct : false},
        ]
    },
    {question : "Which is the smallest continent in the world?",
        answer : [
            {text : "Austraila",  correct : true},
            {text : "Asia",  correct : false},
            {text : "Africa",  correct : false},
            {text : "Antarctica",  correct : false},
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answer : [
            {text : "Vatican city",  correct : true},
            {text : "Pakistan",  correct : false},
            {text : "India",  correct : false},
            {text : "China",  correct : false},
        ]
    },

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestioIndex = 0;
let score = 0;

function startQuiz(){
    let currentQuestioIndex = 0;
    let score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questoins[currentQuestioIndex];
    let questionNo = currentQuestioIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question; 

    currentQuestion.answer.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questoins.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestioIndex++;
    if (currentQuestioIndex < questoins.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestioIndex < questoins.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
