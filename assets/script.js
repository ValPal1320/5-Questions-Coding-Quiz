// Define variables
var questions = [
    {
        question: "Inside which HTML element do we put the Javascript?",
        choices: ["a. <js>", "b. <javascript>", "c. <scripting>", "d. <script>"],
        answer: "d. <script>",
    },
    {
        question: "To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
        answer: "b. =="
    },
    {
        question: "The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a. 0"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: ["a. onclick", "b. onchange", "c. onmouseover", "d. onmouseclick"],
        answer: "a. onclick"
    },
    {
        question: "How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b. function myFunction()"
    }
];

// Grab references
var intro = document.getElementById("intro");
var startButton = document.getElementById("start-btn");
var submitButton = document.getElementById("submit");
var viewHighScore = document.getElementById("viewHighScores");
var timer = document.getElementById("timer");
var secondsLeft = 61;
var questionIndex = 0;
var correctAns = 0;

var questionEl = document.getElementById("question-container");
var title = document.getElementById("question");
var choiceA = document.getElementById("button0");
var choiceB = document.getElementById("button1");
var choiceC = document.getElementById("button2");
var choiceD = document.getElementById("button3");
var answerCheck = document.getElementById("checkAnswer");

var timeIsUp = document.getElementById("timesUp")
var finalScore = document.getElementById("final-score");
var over = document.getElementById("quiz-over");
var initials = document.getElementById("initials");
var scoreList = document.getElementById("scoreList");
var clearHighScoreButton = document.getElementById("clearScores");

// WHEN I click the start button, timer starts
startButton.addEventListener('click', startQuiz);
timer.addEventListener('click', startQuiz);

function startQuiz() {
    //console.log("Start quiz");
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            quizOver();
        }
    }, 1000);
    intro.classList.add("hide");
    startButton.classList.add("hide");
    questionEl.classList.remove("hide");
    showQuiz();
};

// console.log(questions[questionIndex].question);
// console.log(questions[questionIndex].choices);

//Shows questions and choices
function showQuiz() {
    getQuestion();
};

function getQuestion() {
    title.textContent = questions[questionIndex].question;
    choiceA.textContent = questions[questionIndex].choices[0];
    choiceB.textContent = questions[questionIndex].choices[1];
    choiceC.textContent = questions[questionIndex].choices[2];
    choiceD.textContent = questions[questionIndex].choices[3];
}

choiceA.addEventListener("click", chooseA);
choiceB.addEventListener("click", chooseB);
choiceC.addEventListener("click", chooseC);
choiceD.addEventListener("click", chooseD);

function chooseA() { 
        checkAnswer(0); 
}
function chooseB() { 
        checkAnswer(1); 
}
function chooseC() { 
        checkAnswer(2); 
}
function chooseD() { 
        checkAnswer(3); 
}

// When question is answered, check if its right or wrong and display it to the quiz taker
function checkAnswer(answer) {
    answerCheck.style.display = "block";


    if (questions[questionIndex].answer === questions[questionIndex].choices[answer]) {
        correctAns++;
        //console.log(correctAns);
        answerCheck.textContent = "Correct!";
    } else {
        secondsLeft -= 10;
        timer.textContent = secondsLeft;
        answerCheck.textContent = "Wrong answer";
    }

    questionIndex++;
    if (questionIndex < questions.length) {
        getQuestion();
    } else {
        quizOver();
    }
}

// When all questions have been answered OR time runs out, the quiz is over.
function quizOver() {
    over.style.display = "block";
    questionEl.style.display = "none";
    timer.style.display = "none";
    timeIsUp.style.display = "block";


    finalScore.textContent = correctAns;
}

// Storing intials and score
function storeScores(event) {
    event.preventDefault();

    if (initials.value === "") {
        alert("Initial cannot be blank. Please type your initials to save your score!");
        return;
    }

    var savedScores = localStorage.getItem("high scores")
    var scoreArray = [];

    if (savedScores === null) {
        scoreArray = [];
    } else {
        scoreArray = JSON.parse(savedScores);
    }

    var quizzer = {
        initials: initials.value,
        score: finalScore.textContent
    };

    console.log(quizzer);
    scoreArray.push(quizzer);

    var scoreArrayList = JSON.stringify(scoreArray);
    window.localStorage.setItem("high scores", scoreArrayList);

    showHighScore();
}

submitButton.addEventListener("click", function(event){
    storeScores(event);
});

// To show all scores in View High Scores section
var i = 0;
function showHighScore() {
    timer.style.display = "none";
    timeIsUp.style.display = "none";
    over.style.display = "none";
    highScoreSection.style.display = "block";

    var savedScores = localStorage.getItem("high scores");

    if (savedScores === null) {
        return;
    }

    console.log(savedScores);

    var scoreStorage = JSON.parse(savedScores);

    for (; i < scoreStorage.length; i++) {
        var newScore = document.createElement("p");
        newScore.innerHTML = scoreStorage[i].initials + ": " + scoreStorage[i].score;
        scoreList.appendChild(newScore);
    }
}

viewHighScore.addEventListener("click", function(event) {
    intro.classList.add("hide");
    showHighScore(event);
})

// Clears all the high scores
clearHighScoreButton.addEventListener("click", function(){
    window.localStorage.removeItem("high scores");
});






