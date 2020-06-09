// PSEUDO
// Global Variables
var questions = [
    "Commonly used data types do NOT include:",
    "The condition in an if / else statement is enclosed with ______.",
    "Arrays in JavaScript can be used to store ______.",
    "String values must be enclosed within ______ when being assigned to variables.",
    "A very useful tool used during development and debugging for printing content ot the debugger is:"
]
// var correctAns = [correct answer strings]
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

function updateTimer() {
    setInterval(function setTimer() {
        // get timer.innerHTML.toParse() (change to int)
        var timer = document.getElementById('timer');
        var temp = timer.innerHTML;
        var index = temp.indexOf(" ") + 1;
        var x = parseInt(temp.substr(index, temp.length));
        if(offset > 0) {
            x += offset;
            offset = 0;
        }
        x++;
    timer.innerHTML = "Timer: " + x;
    }, 1000) // needs 1000 because it runs in milliseconds
}
 
function setQuestion (index) {
    // give the user the question
    var temp = document.querySelector('div');
    if(temp) {
        temp.remove();
    }
    var question = document.getElementById('main-content');
    // display question from array questions
    question.innerHTML = questions[index];
    for (var i = 0; i < choices[index].length; i++) {
        var ansContainer = document.createElement('div');
        console.log(ansContainer)
        var createBtn = document.createElement('button');
        createBtn.innerHTML = choices[index][i];
        createBtn.className = "btn";

        ansContainer.appendChild(createBtn);
        document.getElementsByTagName('main')[0].appendChild(ansContainer);
    }

}

// function checkAns (index, answer) {
    // if(correctAns[i] !== answer) {
            // offset = 10;
            // setTimer()
    // }
    // return bool
// }

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
    // reload object (saved previous state of 'main' html)
// }

// onlick clearScores {
    // clear high scores (clear array or clear local storage whichever is handling the score storage)
// }

// onclick highscore display function {
    // may need to pause timer if in the middle of the quiz and then restart
        // also may need to do a save state of the page (get main html (may not need to do a separate stop for the timer))
    // display high scores
// }

// *main function calls all the helper functions
document.getElementById('start').addEventListener("click", function () {
    updateTimer();

    // for (var i = 0; i < questions.length; i++) {
        setQuestion(0);
        // var answer = get user answer
        // checkAns(i, ans)
        // var ans = check user answer
        // if(!ans) {
        //         decrease timer by 10 seconds
        // }
        // displayCheck(ans)
    // }
    // call form function
});
