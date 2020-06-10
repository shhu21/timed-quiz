// PSEUDO
// Global Variables
var questions = [
    "Commonly used data types do NOT include:",
    "The condition in an if / else statement is enclosed with ______.",
    "Arrays in JavaScript can be used to store ______.",
    "String values must be enclosed within ______ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content ot the debugger is:"
]
// [correct answer strings]
// TODO: add in the rest of the actual answer choices
var correctAns = ["strings", "booleans", "alerts", "numbers", "numbers"];
// answer choices
// TODO: add in the rest of the actual answer choices
var choices = [
    ["strings", "booleans", "alerts", "numbers"],
    ["strings", "booleans", "alerts", "numbers"],
    ["strings", "booleans", "alerts", "numbers"],
    ["strings", "booleans", "alerts", "numbers"],
    ["strings", "booleans", "alerts", "numbers"]
]
// handles 10 second penalty
var offset = 0;
// user score
var score = 0;
// question index
var index = 0;
// timer
var timer;
// if the user is in the middle of the quiz
var ifOngoing = false;
// save state of quiz
var state = document;

function updateTimer() {
    return setInterval(function setTimer() {
        // get timer.innerHTML.toParse() (change to int)
        var time = document.getElementById('timer');
        var temp = time.innerHTML;
        var index = temp.indexOf(" ") + 1;
        var x = parseInt(temp.substr(index, temp.length));
        if(offset > 0) {
            x += offset;
            offset = 0;
        }
        x++;
    time.innerHTML = "Timer: " + x;
    }, 1000); // needs 1000 because it runs in milliseconds
}

var checkAns = function (event) {
    if(event.target.id == 'correct') {
        // display correct
    }
    else {
        // display wrong
    }
    
    index++;
    runQuestions();
}
 
function setQuestion () {
    // give the user the question
    var temp = document.querySelector('div');
    if(temp) {
        temp.remove();
    }

    var question = document.getElementsByTagName('h1')[0];
    // display question from array questions
    question.innerHTML = questions[index];
    var ansContainer = document.createElement('div');
    for (var i = 0; i < choices[index].length; i++) {
        var createBtn = document.createElement('button');
        createBtn.innerHTML = choices[index][i];
        createBtn.className = "btn";

        if(choices[index][i] == correctAns[i]) {
            createBtn.id = "correct";
        }

        ansContainer.appendChild(createBtn);
    }
    document.getElementById('main-content').appendChild(ansContainer);

    var choiceBtns = document.getElementsByClassName('btn')
    for(var i = 0; i < choiceBtns.length; i++){
        choiceBtns[i].addEventListener('click', checkAns);
    }
}

// function displayCheck (bool) {
    // if(bool) {
        // display "correct" message
        // return;
    // }
    // display "wrong" message
// }

// inputUser {
    // input user info and store into high scores
    // may need to do a sort if local storage doesn't handle it
// }

// high score back button
// onclick goBack(object) {
//     reload object (saved previous state of 'main' html)
// }

// onlick clearScores {
    // clear high scores (clear array or clear local storage whichever is handling the score storage)
// }

function saveState() {
    // pause timer if in the middle of the quiz and then restart
    clearInterval(timer);
    // save state of quiz
    state = document;
};

var viewHighScores = function() {
    if(ifOngoing) {
        saveState();
    }
    // display high scores
}

function runQuestions() {
    if(index >= questions.length) {
        return;
    }
    setQuestion();
}

// starts quiz
var startQuiz = function () {
    timer = updateTimer();
    ifOngoing = true;
    runQuestions();
    // call form function
}

document.getElementById('start').addEventListener("click", startQuiz);

document.getElementById('high-score').addEventListener('click', viewHighScores);
