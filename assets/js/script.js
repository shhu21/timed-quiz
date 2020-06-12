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
// start quiz page
var initialState = document.getElementsByTagName('body')[0].innerHTML;
// div for the list of scores
var scoreDiv = document.createElement('div');
scoreDiv.id = "score-div";
var viewScores = "";


// Set the timer
function updateTimer () {
    return setInterval(function () {
        // get the current time
        var time = document.getElementById('timer');
        var x = parseInt(time.innerHTML);

        // 10 second penalty
        if(offset > 0) {
            x += offset;
            offset = 0;
        }

        // increment the time
        x++;
        // update timer on the page
        time.innerHTML = x;
        // update the user's score
        score = x;
    }, 1000); // needs 1000 because it runs in milliseconds
}


// Displays if the user got the question right or wrong
function displayCheck (feedback) {
    // create div for the feedback
    var feedbackDiv = document.createElement('div');
    feedbackDiv.id = "feedback";
    feedbackDiv.innerHTML = feedback;
    // add the div to the page
    document.getElementsByTagName('body')[0].appendChild(feedbackDiv);
    
    // after displaying the feedback for 1 second, remove it and move on to the next question
    var interval = setTimeout(function () {
        document.getElementById('feedback').remove();
        index++;
        runQuestions();
    }, 1000)
}

// Removes click from answer buttons
function removeClick () {
    // remove onlick eventlistener from all buttons
    var btns = document.getElementsByClassName('q-btn');
    for(var i = 0; i < btns.length; i++) {
        btns[i].removeEventListener('click', checkAns);
    }
}

// Checks if the user got the answer right
var checkAns = function (event) {
    // remove onclick eventlistener so it doesn't get triggered again
    removeClick();
    if(event.target.id == 'correct') {
        displayCheck("Correct!");
    }
    else {
        displayCheck("Wrong!");
        // penalty for getting the answer wrong
        offset = 10;
    }
}

// Adds the check answer event listener to the answer buttons
function btnClick () {
    var choiceBtns = document.getElementsByClassName('q-btn')
    for(var i = 0; i < choiceBtns.length; i++){
        choiceBtns[i].addEventListener('click', checkAns);
    }
}
 
// Sets the question
function setQuestion () {
    var parent = document.getElementById('main-content');
    // remove the previous content
    var temp = document.querySelector('div');
    if(temp) {
        temp.remove();
    }

    // get question from array questions
    var question = document.createElement('h1');
    question.innerHTML = questions[index];
    var ansContainer = document.createElement('div');
    ansContainer.appendChild(question);
    ansContainer.id = "btn-div";

    // create answer choice buttons
    for (var i = 0; i < choices[index].length; i++) {
        var createBtn = document.createElement('button');
        createBtn.innerHTML = choices[index][i];
        createBtn.className = "q-btn";

        // mark the correct answer
        if(choices[index][i] === correctAns[index]) {
            createBtn.id = "correct";
        }

        ansContainer.appendChild(createBtn);
    }
    // add created content to the page
    parent.appendChild(ansContainer);

    // add the event listener to each answer choice button
    btnClick();
}

// Stores the user's score to local storage
var storeScore = function () {
    var initials = document.getElementById("user-initials").value;
    localStorage.setItem(initials, score);

    // clear the form after submitting
    document.getElementById("user-initials").value = "";
    // remove submit functionality to prevent multiple submissions
    document.getElementsByClassName('btn')[0].removeEventListener('click', storeScore);
}

// Input user initials page
function inputUser() {
    viewScores = "";
    var parent = document.getElementById('main-content');
    // quiz is over
    ifOngoing = false;
    scoreDiv = document.createElement('div');
    scoreDiv.id = "score-div";

    // clear previous content
    document.querySelector('div').remove();
    
    // add new content
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

// High score back button
var goBack = function() {
    // document.getElementById('score-div').remove();
    if(ifOngoing) {
        // resume quiz
        // reload last question
        document.getElementsByTagName('body')[0].innerHTML = state;
        // add click events back
        btnClick();
        document.getElementById('high-score').addEventListener('click', viewHighScores);
        // restart the timer
        timer = updateTimer();
    }
    else {
        // retake quiz
        document.getElementsByTagName('body')[0].innerHTML = initialState;
        // add click events back
        document.getElementById('start').addEventListener("click", startQuiz);
        document.getElementById('high-score').addEventListener('click', viewHighScores);
        // start the questions over
        index = 0;
    }
};

function saveState () {
    // pause timer if in the middle of the quiz and then restart
    clearInterval(timer);
    // save state of quiz
    state = document.getElementsByTagName('body')[0].innerHTML;
};


// TODO: maybe save display in a state and reload unless user inputs a new score
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
    // still displays scores after back and view high scoress
    document.getElementById('score-div').remove();
};

var viewHighScores = function() {
    if(ifOngoing) {
        saveState();
    }

    if(!viewScores) {
        var parent = document.getElementById('main-content');
        var ifList = document.getElementById('score-div');

        // remove the score list if it exists
        if(document.getElementById('score-div')) {
            document.getElementById('score-div').remove();
            scoreDiv = document.createElement('div');
        }
    
        // remove previous content
        document.getElementsByTagName('header')[0].remove();
        document.querySelector('div').remove();
    
        // create new content
        var hscoreDiv = document.createElement('div');
        hscoreDiv.className = "score-list";
        
        var title = document.createElement('h1')
        title.innerHTML = "High Scores";
        hscoreDiv.appendChild(title);
    
        // add back button
        var back = document.createElement('button');
        back.className = "btn";
        back.id = "back";
        back.innerHTML = "Go Back";
        back.addEventListener('click', goBack);
        
        // add clear scores button
        var clear = document.createElement('button');
        clear.className = "btn";
        clear.id = "clear";
        clear.innerHTML = "Clear High Scores";
        clear.addEventListener('click', clearScores);
        
        // array to store all the scores
        var allScores = [];
        for(var i = 0; i < localStorage.length; i++) {
            allScores.push({
                name: localStorage.key(i),
                score: localStorage.getItem(localStorage.key(i))
            });
        }
        
        // display high scores (prevents it from dublicating the list on multiple clicks)
        if((!ifOngoing && !ifList) && !localStorage.replaced_stats) {
            console.log("test");
            displayScores(allScores, 0);
        }
    
        // add the new content to the page
        hscoreDiv.appendChild(scoreDiv);
        hscoreDiv.appendChild(back);
        hscoreDiv.appendChild(clear);
        parent.appendChild(hscoreDiv);
        viewScores = document.getElementsByTagName('body')[0].innerHTML;
    }
    else {
        document.getElementsByTagName('body')[0].innerHTML = viewScores;
        document.getElementById('back').addEventListener('click', goBack);
        document.getElementById('clear').addEventListener('click', clearScores);
    }
};

// Runs the questions
function runQuestions() {
    if(index >= questions.length) {
        // out of questions, stop the quiz, get the user input
        clearInterval(timer);
        ifOngoing = false;
        inputUser();
    }
    else {
        // next question
        setQuestion();
    }
}

// Starts the quiz
var startQuiz = function () {
    // start the timer
    timer = updateTimer();
    ifOngoing = true;
    // run the questions
    runQuestions();
}

document.getElementById('start').addEventListener("click", startQuiz);
document.getElementById('high-score').addEventListener('click', viewHighScores);
