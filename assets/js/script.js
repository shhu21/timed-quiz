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
var initialState = document;

function updateTimer() {
    return setInterval(function() {
        // get timer.innerHTML.toParse() (change to int)
        var time = document.getElementById('timer');
        var x = parseInt(time.innerHTML);
        if(offset > 0) {
            x += offset;
            offset = 0;
        }
        x++;
        time.innerHTML = x;
        score = x;
    }, 1000); // needs 1000 because it runs in milliseconds
}

function displayCheck (feedback) {
    // create div
    var feedbackDiv = document.createElement('div');
    feedbackDiv.id = "feedback";
    feedbackDiv.innerHTML = feedback;
    document.getElementsByTagName('body')[0].appendChild(feedbackDiv);
    // need some interval to display it
    var cnt = 0;
    var interval = setTimeout(function () {
        document.getElementById('feedback').remove();
        index++;
        runQuestions();
    }, 1000)
}

function removeClick () {
    // remove onlick eventlistener from all buttons
    var btns = document.getElementsByClassName('btn');
    for(var i = 0; i < btns.length; i++) {
        btns[i].removeEventListener('click', checkAns);
    }
}

var checkAns = function (event) {
    // remove onclick eventlistener
    removeClick();
    if(event.target.id == 'correct') {
        displayCheck("Correct!");
    }
    else {
        displayCheck("Wrong!");
        offset = 10;
    }
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

        if(choices[index][i] === correctAns[index]) {
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

var storeScore = function () {
    var initials = document.getElementById("user-initials").value;
    localStorage.setItem(initials, score);
    console.log(localStorage);
    document.getElementById("user-initials").value = "";
}

function inputUser() {
    ifOngoing = false;

    // clear 'main-content'
    document.querySelector('h1').innerHTML = "All done!";
    document.querySelector('div').remove();

    var parent = document.getElementById('main-content');
    parent.style.textAlign = "left";
    parent.style.width = "40%"

    var userScore = document.createElement('p');
    userScore.innerHTML = "Your final score is: " + score;
    parent.appendChild(userScore);

    var label = document.createElement('label');
    label.innerHTML = "Enter initials: ";
    parent.appendChild(label);

    var input = document.createElement('input');
    input.type = "text";
    input.id = "user-initials";
    input.style.width = "20rem";
    input.style.height = "2rem";
    parent.appendChild(input);

    var btn = document.createElement('button');
    btn.type = "submit"
    btn.innerHTML = "Submit";
    btn.className = 'btn';
    btn.addEventListener('click', storeScore);
    parent.appendChild(btn);
}

// high score back button
// onclick goBack(object) {
//     reload object (saved previous state of 'main' html)
    // if back to input initials, edit user initials
// }

// onlick clearScores {
    // clear high scores (clear array or clear local storage whichever is handling the score storage)
// }

function saveState () {
    // pause timer if in the middle of the quiz and then restart
    clearInterval(timer);
    // save state of quiz
    state = document;
};

function displayScores (scores) {
    var highScore = 0;
    for(var i = 1; i < scores.length; i++) {
        if(scores[highScore] > scores[i]) {
            highScore = i;
        }
    }

    if(scores.length == 0) {
        return;
    }

    var temp = scores[scores.length - 1];
    scores[highScore] = temp;
    scores.pop();
    // display score

    displayScores(scores);
}

var viewHighScores = function() {
    if(ifOngoing) {
        saveState();
    }

    document.querySelector('h1').innerHTML = "High Scores";
    // document.querySelector('div').remove();
    // add div for scores
    // add back button
    // add clear scores
    
    var allScores = [];
    for(var i = 1; i < localStorage.length; i++) {
        allScores.push({
            name: localStorage.key(i),
            score: localStorage.getItem(localStorage.key(i))
        });
    }

    // display high scores
    displayScores(allScores);
}

function runQuestions() {
    if(index >= questions.length) {
        clearInterval(timer);
        ifOngoing = false;
        inputUser();
    }
    else {
        setQuestion();
    }
}

// starts quiz
var startQuiz = function () {
    timer = updateTimer();
    ifOngoing = true;
    runQuestions();
}

document.getElementById('start').addEventListener("click", startQuiz);

document.getElementById('high-score').addEventListener('click', viewHighScores);
