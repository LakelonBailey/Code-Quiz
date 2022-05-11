var screenContainerEl = document.querySelector("#quiz");
var viewScoresBtn = document.querySelector("#view-high-scores");
var questNum;
var quizScore = 0;
var time;
var quizTimer;
timerEl = document.getElementById("timer");
var highScores = [];
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
    startContainerEl.className = "start-container";
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
    startButtonEl.onclick = startQuiz;
    startContainerEl.appendChild(startButtonEl);

    screenContainerEl.appendChild(startContainerEl);
}
var startQuiz = function() {
    time = 60;
    quizScore = 0;
    questNum = 0;
    quizTimer = setInterval(adjustTime, 1000);
    quiz();
}
var printQuestion = function (currentQuestion) {
    var questionContainerEl = newContainer();
    questionContainerEl.className = "question-container";
    var questionEl = document.createElement("h2");
    questionEl.textContent = currentQuestion.question
    questionContainerEl.appendChild(questionEl);

    var answerListEl = document.createElement("form");
    questionContainerEl.appendChild(answerListEl);
    for (var j = 0; j<currentQuestion.answers.length; j++) {
        var answerEl = document.createElement("li");
        var answerText = currentQuestion.answers[j];
        answerEl.innerHTML = "<input type='radio' name='answer-choice' value='" + answerText +"'>" + answerText +"</input>";
        answerListEl.appendChild(answerEl);
    }

    var submitChoice = document.createElement("button");
    submitChoice.type = "button";
    submitChoice.addEventListener("click", checkAnswerHandler);
    submitChoice.textContent = "Submit Answer";
    questionContainerEl.appendChild(submitChoice);
}

var checkAnswerHandler = function(event) {
    event.stopPropagation();
    event.preventDefault();
    checkAnswer();
}
var printResult = function(result) {
    if (result) {
        var resultText = "Correct!";
    }
    else {
        var resultText = "Incorrect.";
        time -= 10;
    }
    resultTextEl = document.createElement("h2");
    resultTextEl.textContent = resultText;
    screenContainerEl.appendChild(resultTextEl);
    var removeResultEl;
    setTimeout(removeResultEl = function() 
    {
        resultTextEl.remove();
    }, 1500);
}

var checkAnswer = function() {
    var currentQuestion = questions[questNum];
    var radios = document.getElementsByName("answer-choice");
    var choiceVal = "";
    for (var i = 0; i<radios.length; i++) {
        if (radios[i].checked) {
            choiceVal = radios[i].value
            break;
        }
    }
    if (choiceVal == currentQuestion.correct) {
        var result = true;
        quizScore += 10;
    }
    else if (choiceVal == "") {
        window.alert("Please select an answer before submitting");
        return false;
    }
    else {
        var result = false;
    }
    checkStatus(result);
}

var checkStatus = function(result) {
    if (questNum == (questions.length-1)) {
        clearInterval(quizTimer);
        timerEl.innerHTML = "";
        var endText = "You have completed all of the questions. The quiz is over."
        endQuiz(endText);
        printResult(result);
    }
    else {
        questNum++;
        quiz();
        printResult(result);
    }
}

var endQuiz = function(endText) {
    var endQuizEl = newContainer();
    endQuizEl.className = "end-container";
    var endHeaderEl = document.createElement("h2");
    endHeaderEl.textContent = endText;
    endQuizEl.appendChild(endHeaderEl);

    var endTextEl = document.createElement("p");
    endTextEl.textContent = "Your final score is " + quizScore + ".";
    endQuizEl.appendChild(endTextEl);

    var endInput = document.createElement("form");
    endInput.innerHTML = 
    "<p>Enter Name: </p><input type='text' id='name-input' placeholder='Anonymous'</input><button type='submit' id='name-submit'>Submit</button>"
    endQuizEl.appendChild(endInput);

    var nameSubmit = document.getElementById("name-submit");
    nameSubmit.addEventListener("click", highScoreHandler);
}

var highScoreHandler = function(event) {
    event.preventDefault();
    event.stopPropagation();
    var nameInput = document.getElementById("name-input").value;
    if (nameInput == "") {
        return false;
    }
    else {
        newHighScore(nameInput);
    }
}
var newHighScore = function(nameInput) {
    var newScoreObj = {
        name: nameInput,
        score: quizScore
    }
    highScores.push(newScoreObj);
    sortHighScores();
}

var sortHighScores = function () {
    for (var i = 0; i<highScores.length; i++) {
        var max = highScores[i].score;
        var maxIndex = i;
        for (var j = 1; i+j<highScores.length; j++) {
            if (max < highScores[i+j].score) {
                max = highScores[i+j];
                maxIndex = i+j;
            }
        }
        var currentObj = highScores[i];
        var newObj = highScores[maxIndex];
        highScores[i] = newObj;
        highScores[maxIndex] = currentObj;
    }
    viewHighScores(highScores);

    localStorage.setItem("highscores", JSON.stringify(highScores));
}
var quiz = function() {
    var currentQuestion = questions[questNum];
    printQuestion(currentQuestion);
}

var viewHighScores = function(highScores) {
    var savedScores = localStorage.getItem("highscores");
    if (savedScores) {
        savedScores = JSON.parse(savedScores);
        highScores = savedScores;
    }
    var highScoresEl = newContainer();
    highScores.id = "highscores";
    var scoresHeadEl = document.createElement("h2");
    scoresHeadEl.textContent = "High Scores";
    highScoresEl.appendChild(scoresHeadEl);
    var scoreListEl = document.createElement("ol");
    highScoresEl.appendChild(scoreListEl);
    for (var i = 0; i<highScores.length; i++) {
        scoreListItemEl = document.createElement("li");
        scoreListItemEl.className = "highscore";
        scoreListItemEl.textContent = highScores[i].name + " - " + highScores[i].score;
        scoreListEl.appendChild(scoreListItemEl);
    }
    var goBackEl = document.createElement("button");
    goBackEl.textContent = "Go Back";
    goBackEl.onclick = startScreen;
    highScoresEl.appendChild(goBackEl);

    var clearScoresEl = document.createElement("button");
    clearScoresEl.type = "button";
    clearScoresEl.textContent = "Clear Scores";
    clearScoresEl.onclick = clearScores;
    highScoresEl.appendChild(clearScoresEl);
}
var clearScores = function() {
    var emptyArr = [];
    highScores = emptyArr;
    viewHighScores(highScores);
}

startScreen();

viewScoresBtn.addEventListener("click", viewHighScores);

var adjustTime = function() {
    document.getElementById("timer").innerHTML = "Time: " + time;
        if (time == 0) {
            clearInterval(quizTimer);
            var endText = "Time ran out! the quiz is over.";
            timerEl.innerHTML = "";
            endQuiz(endText);
        }
        --time;
}