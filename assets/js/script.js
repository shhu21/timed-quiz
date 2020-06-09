// PSEUDO
// var questions = [question strings]
// var choices = [[answer choices strings]]
// var correctAns = [correct answer strings]
var offset = 0;

// function timeOver() {
    // display something because the user ran out of time
// }


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
 
// function setQuestion (index) {
        // give the user the question
            // display question from array questions
            // for (choices[index].length) {
                // display answer choices
            // }
// }

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
// button.onclick = function start {
    // setTimer()
    // for (questions.length) {
        // setQuestion(i)
        // var answer = get user answer
        // checkAns(i, ans)
        // var ans = check user answer
        // if(!ans) {
                // decrease timer by 10 seconds
        // }
        // displayCheck(ans)
    // }
    // call form function
// }
