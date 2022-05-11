var screenContainerEl = document.querySelector("#quiz");
var questNum = 0;
var quizScore = 0;
var highScores = []
var questions = [
    {
        question: "What letter does 'red' start with?",
        answers: ["r", "d", "l", "j"],
        correct: "r"
    },
    {
        question: "What letter does 'jar' start with?",
        answers: ["r", "d", "l", "j"],
        correct: "j"
    }
];

var newContainer = function() {
    var oldContainer = document.querySelector("#container");
    oldContainer.remove();
    var newContainer = document.createElement("div");
    newContainer.id = "container";
    screenContainerEl.appendChild(newContainer);
    return newContainer;
}

var startScreen = function() {
    var startContainerEl = newContainer();
    var mainHeadEl = document.createElement("h1");
    mainHeadEl.className = "element-header";
    mainHeadEl.textContent = "Coding Quiz";
    startContainerEl.appendChild(mainHeadEl);

    var mainScreenTextEl = document.createElement("p");
    mainScreenTextEl.textContent = "Answer the questions to the best of your ability";
    startContainerEl.appendChild(mainScreenTextEl);

    var startButtonEl = document.createElement("button");
    startButtonEl.className = "btn";
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.id = "start-quiz";
    startButtonEl.type = "button";
    startContainerEl.appendChild(startButtonEl);

    screenContainerEl.appendChild(startContainerEl);

    var startQuiz = document.querySelector("#start-quiz");
    startQuiz.addEventListener("click", quiz);
}
var printQuestion = function (currentQuestion) {
    var questionContainerEl = newContainer();
    var questionEl = document.createElement("h2");
    questionEl.textContent = currentQuestion.question
    questionContainerEl.appendChild(questionEl);

    var answerListEl = document.createElement("form");
    answerListEl.id = "answer-list"
    questionContainerEl.appendChild(answerListEl);
    for (var j = 0; j<currentQuestion.answers.length; j++) {
        var answerEl = document.createElement("li");
        var answerText = currentQuestion.answers[j];
        answerEl.innerHTML = "<input type='radio' name='answer-choice' value='" + answerText +"'>" + answerText +"</input>";
        answerListEl.appendChild(answerEl);
    }

    var submitChoice = document.createElement("button");
    submitChoice.onclick = checkAnswer;
    submitChoice.textContent = "Submit Answer";
    questionContainerEl.appendChild(submitChoice);
}
var printResult = function(result) {
    if (result) {
        var resultText = "Correct!";
    }
    else {
        var resultText = "Incorrect :(";
    }
    // add code to print the result
    alert(resultText);
}
var checkAnswer = function() {
    var currentQuestion = questions[questNum];
    var radios = document.getElementsByName("answer-choice");
    var choiceVal = "";
    var result
    for (var i = 0; i<radios.length; i++) {
        if (radios[i].checked) {
            choiceVal = radios[i].value
            break;
        }
    }
    if (choiceVal == currentQuestion.correct) {
        result = true;
    }
    else if (choiceVal == "") {
        window.alert("Please select an answer before submitting");
    }
    else {
        result = false;
    }
    printResult(result);
    checkStatus();
}
var checkStatus = function() {
    if (questNum == (questions.length-1)) {
        endQuiz();
    }
    else {
        questNum++;
        quiz();
    }
}
var endQuiz = function() {
    alert("Quiz is over");
    startScreen();
}
var quiz = function() {
    var currentQuestion = questions[questNum];
    printQuestion(currentQuestion);
}
var viewHighScores = function() {
    sortHighScores(highScores);
}
var sortHighScores = function () {
    // Write selection sort algorithim
}

startScreen();
