var screenContainerEl = document.querySelector("#quiz");
var viewScoresBtnEl = document.querySelector("#view-scores-li");
var questNum;
var quizScore = 0;
var time;
var quizTimer;
timerEl = document.getElementById("timer");
var highScores = [];
var questions = [
    {
        question: "What language involves 'semantic elements'?",
        answers: ["HTML", "Javascript", "CSS", "jQuery"],
        correct: "HTML"
    },
    {
        question: "Which of these is the logical OR operator?",
        answers: ["%", "&&", "||", "+="],
        correct: "||"
    },
    {
        question: "What character goes before an id selector in a CSS rule?",
        answers: [".", "$", "&", "#"],
        correct: "#"
    },{
        question: "What command is used to push git commits to a remote origin?",
        answers: ["git push origin main", "git commit -m", "git add .", "git remote add origin"],
        correct: "git push origin main"
    },
    {
        question: "What command would I use to create a new directory called 'assets'?",
        answers: ["rm assets", "touch assets", "mkdir assets", "cd assets"],
        correct: "mkdir assets"
    },
    {
        question: "What CSS selector would allow me to apply styling to all elements in an HTML file?",
        answers: ["*", "all", "main", "body"],
        correct: "*"
    },
    {
        question: "What is a repository?",
        answers: ["CSS selector", "javascript function", "dynamic folder for code", "type of file"],
        correct: "dynamic folder for code"
    },
    {
        question: "How can I declare a function called newFunction in Javascript?",
        answers: ["var newFunction = function()", "var newFunction(function)", "var newFunction = function[]", "var newFunction = new function()"],
        correct: "var newFunction = function()" 
    },
    {
        question: "How do I create a variable called newVar with a numeric value of 10?",
        answers: ["var newVar(10)", "var newVar = \"10\"", "var newVar = 10", "newVar = 10"],
        correct: "var newVar = 10"
    },
    {
        question: "What CSS attribute allows the creation of a box shadow?",
        answers: ["create-shadow", "box-shadow", "section-shadow", "shadow"],
        correct: "box-shadow"
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
    viewScoresBtnEl.innerHTML = 
    "<button class='btn' type='button' id='view-high-scores'>view high scores</button>";
    var viewScoresBtn = document.getElementById("view-high-scores");
    viewScoresBtn.addEventListener("click", viewHighScores);
    
    var startContainerEl = newContainer();
    startContainerEl.className = "start-container";
    var mainHeadEl = document.createElement("h1");
    mainHeadEl.className = "element-header";
    mainHeadEl.textContent = "Coding Quiz!";
    startContainerEl.appendChild(mainHeadEl);

    var mainScreenTextEl = document.createElement("p");
    mainScreenTextEl.textContent = "The following quiz consists of 10 questions regarding different facts about HTML, CSS, Javascript, and git. You will have 100 seconds to complete the quiz. If you get a question incorrect, you lose 10 seconds. When you are ready, click the 'Start Quiz' button. Good luck!";
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
    time = 100;
    quizScore = 0;
    questNum = 0;
    var rmvBtn = document.getElementById("view-high-scores");
    rmvBtn.remove();
    quizTimer = setInterval(adjustTime, 1000);
    quiz();
}

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
        answerEl.className = "choice";
        answerEl.value = j;
        var answerText = currentQuestion.answers[j];
        answerEl.innerHTML = "<input id='"+j+"' class='radio' type='radio' name='answer-choice' value='" + answerText +"'>" + answerText +"</input>";
        answerListEl.appendChild(answerEl);
    }
    answerListEl.addEventListener("click", highlightButton);
    var submitChoice = document.createElement("button");
    submitChoice.className = "btn";
    submitChoice.type = "button";
    submitChoice.addEventListener("click", checkAnswerHandler);
    submitChoice.textContent = "Submit Answer";
    questionContainerEl.appendChild(submitChoice);
}
var highlightButton = function(event) {
    var choiceBtnEl = event.target;
    choiceBtnId = choiceBtnEl.value;
    var choiceBtn = document.getElementById(choiceBtnEl.value);
    choiceBtn.checked = true;

    var choiceElArr = document.getElementsByClassName("choice");
    for (var i =0; i<choiceElArr.length; i++) {
        if (choiceElArr[i].value == choiceBtnId) {
            choiceElArr[i].style.backgroundColor = "aqua";
            choiceElArr[i].style.boxShadow = "0 0 5px black";
        }
        else {
            choiceElArr[i].style.backgroundColor = "gray";
            choiceElArr[i].style.boxShadow = "0 0 0 white";
        }
    }
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
    }, 1000);
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
    "<p>Enter Initials: <input type='text' id='name-input' placeholder='Anonymous'</input></p><button class='btn' type='submit' id='name-submit'>Submit</button>"
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
    console.log(highScores);
    for (var i = 0; i<highScores.length; i++) {
        var max = highScores[i].score;
        var maxIndex = i;
        for (var j = 0; i+j<highScores.length; j++) {
            if (max< highScores[i+j].score) {
                maxIndex = i+j;
            }
        }
        [highScores[i], highScores[maxIndex]] = [highScores[maxIndex], highScores[i]]
    }
    localStorage.setItem("highscores", JSON.stringify(highScores));
    console.log(highScores);
    viewHighScores();
}
var quiz = function() {
    var currentQuestion = questions[questNum];
    printQuestion(currentQuestion);
}

var viewHighScores = function() {
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
    goBackEl.className = "btn";
    goBackEl.onclick = startScreen;
    highScoresEl.appendChild(goBackEl);

    var clearScoresEl = document.createElement("button");
    clearScoresEl.type = "button";
    clearScoresEl.className = "btn";
    clearScoresEl.textContent = "Clear Scores";
    clearScoresEl.onclick = clearScores;
    highScoresEl.appendChild(clearScoresEl);
}
var clearScores = function() {
    var emptyArr = [];
    localStorage.setItem("highscores", emptyArr)
    highScores = emptyArr;
    viewHighScores(highScores);
}

startScreen();

