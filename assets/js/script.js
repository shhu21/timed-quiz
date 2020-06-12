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
    ["numbers and strings", "booleans", "alerts", "numbers"],
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
var initialState = document.getElementsByTagName('body')[0].innerHTML;
// var parent = document.getElementById('main-content');
var scoreDiv = document.createElement('div');
scoreDiv.id = "score-div"

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
    var btns = document.getElementsByClassName('q-btn');
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

function btnClick () {
    var choiceBtns = document.getElementsByClassName('q-btn')
    for(var i = 0; i < choiceBtns.length; i++){
        choiceBtns[i].addEventListener('click', checkAns);
    }
}
 
function setQuestion () {
    var parent = document.getElementById('main-content');
    // give the user the question
    var temp = document.querySelector('div');
    if(temp) {
        temp.remove();
    }

    var question = document.createElement('h1');
    // display question from array questions
    question.innerHTML = questions[index];
    var ansContainer = document.createElement('div');
    ansContainer.appendChild(question);
    ansContainer.id = "btn-div";
    for (var i = 0; i < choices[index].length; i++) {
        var createBtn = document.createElement('button');
        createBtn.innerHTML = choices[index][i];
        createBtn.className = "q-btn";

        if(choices[index][i] === correctAns[index]) {
            createBtn.id = "correct";
        }

        ansContainer.appendChild(createBtn);
    }
    parent.appendChild(ansContainer);

    btnClick();
}

var storeScore = function () {
    var initials = document.getElementById("user-initials").value;
    localStorage.setItem(initials, score);
    console.log(localStorage);
    document.getElementById("user-initials").value = "";
    document.getElementsByClassName('btn')[0].removeEventListener('click', storeScore);
}

function inputUser() {
    var parent = document.getElementById('main-content');
    ifOngoing = false;

    // clear 'main-content'
    document.querySelector('div').remove();
    
    var newContent = document.createElement('div');
    newContent.id = "main-content";
    newContent.style.textAlign = "left";
    newContent.style.width = "40%"
    
    var title = document.createElement('h1')
    title.innerHTML = "All done!";
    newContent.appendChild(title);

    var userScore = document.createElement('p');
    userScore.innerHTML = "Your final score is: " + score;
    newContent.appendChild(userScore);
    
    var form = document.createElement('div');
    form.className = "form";
    
    var label = document.createElement('label');
    label.innerHTML = "Enter initials: ";
    label.style.whiteSpace = "nowrap";
    label.style.paddingTop = "17px";
    form.appendChild(label);

    var input = document.createElement('input');
    input.type = "text";
    input.id = "user-initials";
    input.style.minWidth = "20rem";
    input.style.height = "2rem";
    form.appendChild(input);

    var btn = document.createElement('button');
    btn.type = "submit"
    btn.innerHTML = "Submit";
    btn.className = "btn";
    btn.addEventListener('click', storeScore);
    form.appendChild(btn);
    newContent.appendChild(form);

    parent.appendChild(newContent);
}

// high score back button
var goBack = function() {
    if(ifOngoing) {
        // resume quiz
        document.getElementsByTagName('body')[0].innerHTML = state;
        var parent = document.getElementById('main-content');
        btnClick();
        timer = updateTimer();
        document.getElementById('high-score').addEventListener('click', viewHighScores);
    }
    else {
        // retake quiz
        document.getElementsByTagName('body')[0].innerHTML = initialState;
        if(document.getElementById('start')) {
            document.getElementById('start').addEventListener("click", startQuiz);
            index = 0;
        }
        document.getElementById('high-score').addEventListener('click', viewHighScores);
    }
};

function saveState () {
    // pause timer if in the middle of the quiz and then restart
    clearInterval(timer);
    // save state of quiz
    state = document.getElementsByTagName('body')[0].innerHTML;
};

function displayScores (scores, cnt) {
    var highScore = 0;
    for(var i = 1; i < scores.length; i++) {
        if(scores[highScore].score > scores[i].score) {
            highScore = i;
        }
    }
    
    if(scores.length == 0) {
        return;
    }
    // display score
    cnt++;
    var currScore = document.createElement('div');
    if(cnt % 2 == 0) {
        currScore.className = "score even";
    }
    else {
        currScore.className = "score odd";
    }
    currScore.innerHTML = `${cnt}. ${scores[highScore].name} - ${scores[highScore].score}`;
    scoreDiv.appendChild(currScore);

    var temp = scores[scores.length - 1];
    scores[highScore] = temp;
    scores.pop();

    displayScores(scores, cnt);
}

var clearScores = function () {
    localStorage.clear();
    document.getElementById('score-div').remove();
};

var viewHighScores = function() {
    var parent = document.getElementById('main-content');
    if(ifOngoing) {
        saveState();
    }

    document.getElementsByTagName('header')[0].remove();
    document.querySelector('div').remove();
    // add div for scores
    // add div for back button and clear
    var hscoreDiv = document.createElement('div');
    // btnDiv.style.marginLeft = "10rem";
    hscoreDiv.className = "score-list";
    
    var title = document.createElement('h1')
    title.innerHTML = "High Scores";
    hscoreDiv.appendChild(title);
    // add back button
    var back = document.createElement('button');
    back.className = "btn";
    back.innerHTML = "Go Back";
    back.addEventListener('click', goBack);
    
    // add clear scores
    var clear = document.createElement('button');
    clear.className = "btn";
    clear.innerHTML = "Clear High Scores";
    clear.addEventListener('click', clearScores);
    
    var allScores = [];
    for(var i = 0; i < localStorage.length; i++) {
        allScores.push({
            name: localStorage.key(i),
            score: localStorage.getItem(localStorage.key(i))
        });
    }
    console.log(allScores);
    // display high scores
    if(!ifOngoing && !document.getElementById('start')) {
        displayScores(allScores, 0);
    }
    hscoreDiv.appendChild(scoreDiv);
    hscoreDiv.appendChild(back);
    hscoreDiv.appendChild(clear);
    // fix order
    parent.appendChild(hscoreDiv);
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
