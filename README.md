# Timed Quiz

# Objective
Create a timed multiple choice quiz and save the user's initials and corresponding score in a scoreboard.

> __Assumptions:__ </br>
> 1. Scoring
>> The user's score is determined by the time in seconds it takes the user to complete the quiz.  The time includes any penalties of an additional 10 seconds that is applied to every wrong answer.  Correct answers add no additional time to the user's score.  As such, the "High Scores" are ranked from the lowest score (shortest time) to the highest score (longest time).  
> 2. View High Scores
>> The user may view their high scores at any time before, during, or after the quiz.  If the user chooses to view their high scores during the quiz, the timer is paused and the timer and the quiz will resume on the question they left off on after clicking the back button on the high scores page.  If the user has no storaged scores, then no score list will be shown.
> 3. View High Scores Back button
>> As mentioned in Assumption #2, the clicking the back button while in the middle of the quiz will resume the quiz.  Otherwise, the user will be redirected to the start of the quiz (initial page).  From there the user may choose whether retake the quiz or not.
> 4. Local Storage Unknown Factors
>> When testing the program on the live URL provided by GitHub, local storage was automatically storing `replaced_stats`.  A check is done in viewHighScores() in script.js to check if `localStorage.replaced_stats` exists and clears local storage if it does.  However, depending on the user's local storage other factors may occur.

## Global Variables

### `questions`
__Data Type:__ Array[String]. </br>
__Purpose:__ Contains the question strings. </br>

### `correctAns`
__Data Type:__ Array[String]. </br>
__Purpose:__ Contains the correct answer strings. </br>

### `choices`
__Data Type:__ Array[Array[String]] (2D array). </br>
__Purpose:__ Contains the questions corresponding answer choices. </br>

### `offset`
__Data Type:__ Integer. </br>
__Purpose:__ Used to handle the 10 second penalty when the user chooses a wrong answer. It is set to `0` (correct answer) or `10` (wrong answer). </br>

### `score`
__Data Type:__ Integer. </br>
__Purpose:__ User's score (time). </br>

### `index`
__Data Type:__ Integer. </br>
__Purpose:__ Index of the current question. </br>

### `timer`
__Data Type:__ setInterval() method. </br>
__Purpose:__ Updates the timer on the page and updates the user's score. </br>

### `ifOngoing`
__Data Type:__ Boolean. </br>
__Purpose:__ `true` if the user is in the middle of the quiz, `false` otherwise. </br>

### `state`
__Data Type:__ HTML. </br>
__Purpose:__ Saves the HTML content of the page to go back to if the user clicks on `View High Scores` in while the quiz is running. </br>

### `initialState`
__Data Type:__ HTML. </br>
__Purpose:__ Saves the HTML content of the beginning of the start page of the quiz. </br>

### `scoreDiv`
__Data Type:__ HTML `<div>` element. </br>
__Purpose:__ Used to create the high score list. </br>

### `viewScores`
__Data Type:__ Empty string or inner HTML of `<body>`. </br>
__Purpose:__ Saves `View High Scores` page, so it is not recreated every time it is clicked. </br>

### `startQuiz`
__Data Type:__ Function. </br>
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Gets criteria from the user and generates a randomized password. </br>
__Functionality:__ Gets called when the `start` button is clicked.  It starts the timer, marks that the quiz has started by setting `ifOngoing` to `true`, and starts the questions.  </br>

### `checkAns`
__Data Type:__ Function. </br>
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Gives feedback on whether the user chose the correct answer or not. </br>
__Functionality:__ Calls `removeClick()` to prevent `checkAns` from getting triggered multiple times and removes the click functionality from `View High Scores` while the feedback is being displayed. If the answer is correct, then it passes `"Correct!"` to `displayCheck()`, otherwise it passes `"Wrong!"` and sets `offset` penalty to `10`. </br>

### `storeScore`
__Data Type:__ Function. </br>
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Stores the user's initials and corresponding score. </br>
__Functionality:__  Adds the user's initials (key) and score (value) to local storage. Removes the event listener from the `submit` button to avoid repeated submissions. </br>

### `viewHighScores`
__Data Type:__ Function. </br>
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Allows the user to view the high scores. </br>
__Functionality:__  If the quiz is ongoing, then calls `saveState()`.  If `localStorage.replaced_stats` exists, then clear the local storage.  If `viewScores` does not exist, then create the high score elements and append them to the page.  All user initials with their corresponding scores are stored in an object and pushed into the array `allScores`, then passed into the `displayScores(allScores, 0)` call. Otherwise, load the page content stored in `viewScores` and add the event listeners back to the `Go Back` button and `Clear` button. </br>

### `goBack`
__Data Type:__ Function. </br>
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Handles go back functionality from the "View High Scores" page. </br>
__Functionality:__  If `ifOngoing` is `true`, then load the HTML content saved in `state` to the page, adds the click event listeners back to the answer choice buttons, adds the click event listener back to `View High Scores`, and calls `updateTimer()` to restart the timer. Otherwise, if `ifOngoing` is `false`, then load the HTML content saved in `initialState`, adds the click event listener back to the `start` button, and resets `index` to `0`.  After the conditionals, it adds the click event listener back to `View High Scores`. </br>

### `clearScores`
__Data Type:__ Function. </br>
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Clears the user's high scores from the "View High Scores" page. </br>
__Functionality:__  Clears the local storage and removes the list of high scores `div` from the page. </br>

# Functionality
**Note:** The "Calls" section refers to functions the specified function is called in. (ex. `updateTimer()` is called in `startQuiz()`, so `startQuiz()` is listed under `updateTimer()` "Calls' section.)

### `updateTimer()`
__Parameters:__ None. </br>
__Return Type:__ setInterval() method. </br>
__Purpose:__ Updates the timer. </br>
__Functionality:__ Returns a `setInterval()` method that runs a function every second.  The function gets the current time from the HTML page and adds `offset` if it greater than `0`.  Otherwise, it increments the time by `1`.  Then, it updates the time to the page and updates `score` to the new time. </br>
__Calls:__ `startQuiz`, `goBack` </br>

### `runQuestions()`
__Parameters:__ None. </br>
__Return Type:__ String. </br>
__Purpose:__ Ends the quiz after the last question or goes to the next question. </br>
__Functionality:__ If the user has reached the last question, stop the timer, marks that the quiz has ended by setting `ifOngoing` to `false`, and calls `inputUser()`.  Otherwise, it calls `setQuestion()` to move on to the next question. </br>
__Calls:__ `startQuiz`, `displayCheck()` </br>

### `setQuestion()`
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Displays the question and its corresponding answer choices. </br>
__Functionality:__ Creates the needed HTML elements and appends them to the page. The answer choice buttons are created through a `for` loop that runs through the answer choices array (`choice`).  If the answer choice string is the same as the corresponding correct choice, then the button is given an id of `correct`. `btnClick()` is called. </br>
__Calls:__ `runQuestions()` </br>

### `btnClick()`
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Adds an event listener to every answer choice button on click. </br>
__Functionality:__ Applies the `checkAns` function to every answer choice button on click. </br>
__Calls:__ `setQuestion()`, `goBack` </br>


### `removeClick()`
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Removes the event listener applied in `btnClick()` to all answer choice buttons. </br>
__Functionality:__ Removes the `checkAns` function from every answer choice button on click. </br>
__Calls:__ `checkAns` </br>

### `displayCheck()`
__Parameters:__ String. </br>
__Return Type:__ None. </br>
__Purpose:__ Displays the answer feedback. </br>
__Functionality:__ Creates the needed HTML elements and appends them to the page.  Then sets a timeout of 1 second to remove the displayed feedback, increments `index`, adds the `View High Scores` event listener back, and calls `runQuestions()` </br>
__Calls:__ `checkAns` </br>


### `inputUser()`
__Parameters:__ None. </br>
__Return Type:__ None. </br>
__Purpose:__ Gets and stores the user's initials with the corresponding score. </br>
__Functionality:__ Marks that the quiz is over by setting `ifOngoing` to `false`.  Creates the needed HTML elements and appends them to the page. Adds an event listener to the `submit` button that calls `storeScore` on click. </br>
__Calls:__ `runQuestions()` </br>

### `displayScores()`
__Parameters:__ Array[Object], Integer. </br>
__Return Type:__ None. </br>
__Purpose:__ Creates the list of high scores. </br>
__Functionality:__ If the length of array `scores` is `0`, then `return` and end the function.  Otherwise, it uses a `for` loop to find the index of the "highest score" (Note: The highest score is the lowest value because the shorter the time the user finishes in, the high ranked the score is.) Increment `cnt` and add css class `score` to the `div` and class `even` or `odd` depending if `cnt` is even or odd. The `div` content and appends it to `scoreDiv`.  The indices of the highest score and the last score are swapped and the highest score is popped off the array.  `displayScores()` is called again with the new array and the updated `cnt`. </br>
__Calls:__ `viewHighScores` </br>


## Website Preview
![](./mock-up.png)

<br><br>
__*Live URL:*__ https://shhu21.github.io/timed-quiz/#
