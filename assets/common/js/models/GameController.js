function GameController() {
    this.difficulties = {
        "easy": new Difficulty("Easy", 30, 0.5),
        "medium": new Difficulty("Medium", 30, 0.75),
        "hard": new Difficulty("Hard", 70, 1),
        "insane": new Difficulty("Insane", 100, 1.25),
    }

    this.canvas = new Canvas();
    this.timer = new Timer();
    this.player = new Player();
    this.dictionary = new Dictionary();

    this.difficulty = this.difficulties["easy"];
    this.gameInProgress = false;
    this.words = [];
    this.userInputText = "";

    this.wordGenerationIntervalId = null;

    this.numWordsSpawned = 0;
}

/**
 * Reset the game
 */
GameController.prototype.reset = function() {
    /**
     * Call stop() just in case this function has been called while the game is still running.
     * Pass false to fireEvent since we don't need to send the event to the interface.
     */
    this.stop(false);

    // Reset objects except for the dictionary, which doesn't require reset
    this.player = new Player();
    this.canvas.clear();
    this.timer.reset();

    /**
     * Once we implement different difficulty level, maybe we should reset to whatever
     * difficulty the player originally selected. Also, since wpm, speed are all tied to the difficulty level
     * we may create an object for managing the difficulty levels and allow that object to set the wpm and speed
     * based on the difficulty selected.
     */
    this.difficulty = this.difficulties["easy"];

    this.words = [];
    this.userInputText = "";
    this.numWordsSpawned = 0;
}

/**
 * Start the game.
 */
GameController.prototype.start = function() {
    this.gameInProgress = true;

    this.wordGenerationIntervalId = window.setInterval(() => { this.generateWord(); }, 60000 / this.difficulty.wpm);
    window.requestAnimationFrame(() => { frameFn(); });

    // Make sure to use the arrow function here to make the current context accessible inside the nested function.
    const frameFn = () => {
        this.executeFrameActions();

        // Recursively call the frameFn function to keep the frame request going as long as the game is in progress
        if(this.gameInProgress) window.requestAnimationFrame(frameFn);
    }
    $("#difficulty-selection-button").trigger("click");
    this.timer.start();
}

/**
 * Stop the game. Call this function when game is over.
 * @return {boolean} Should this function fire the gameover event and send a message to the interface?
 */
GameController.prototype.stop = function(fireEvent) {
    // Clear the word generation interval
    window.clearInterval(this.wordGenerationIntervalId);
    this.wordGenerationIntervalId = null;

    this.gameInProgress = false;
    this.timer.stop();

    // Fire gameover event
    if(fireEvent) $(window).trigger("gameover");
}

/**
 * The function is called from game.js when player presses Space/Enter.
 * Validate the current value of userInputText.
 */
GameController.prototype.enterWord = function() {
    // Return if the userInputText is empty
    if(this.userInputText.length == 0) return;

    let wordToType = this.words.find(word => word.highlightInd === word.text.length); // Find a word that has been typed
    let wordToTypeInd = this.words.indexOf(wordToType); // Retrieve index to splice without a second loop
    if (wordToType) { // If a successfully typed word is found
        this.player.enterWord(wordToType);
        this.words.splice(wordToTypeInd, 1);
    } else {
        const match = this.findBestWordMatch();

        // Record the player's correct/incorrect number of characters
        this.player.enterIncorrectWord(match.correct, match.incorrect);
    }
    this.userInputText = "";
    this.updateHighlightInd();
}

/**
 * Called when a player enters a character through the game interface
 * @param {*} charCode character code of player's input
 */
GameController.prototype.enterCharacter = function(charCode) {
    // This is a backspace
    if(charCode === 8) { // Remove the last character in userInputText
        this.userInputText = this.userInputText.slice(0, -1);
    }
    else { // Push the input character to userInputText
        this.userInputText += String.fromCharCode(charCode);
    }

    this.updateHighlightInd();
}

/**
 * Calculate and return player's WPM.
 * @returns {number} Player's WPM
 */
GameController.prototype.getPlayerWPM = function() {
    const numWords = this.player.numCorrectChars / 5; // Assumes 5 characters in a word
    const minutes = this.timer.getElapsedTime() / 60000; // Convert miliseconds to minutes
    return numWords / minutes;
}

/**
 * Function to execute all operations in each frame
 */
GameController.prototype.executeFrameActions = function() {
    // Move all the words down
    for(let i = this.words.length-1 ; i >= 0 ; --i) {
        let word = this.words[i];
        // Bonus word moves down quicker than normal words
        if(word.isBonus) word.y += this.difficulty.speed + 1;
        else word.y += this.difficulty.speed;
        // Remove the word from this.words array if it reaches the bottom
        if (word.y > this.canvas.getHeight()) { 
            this.words.splice(i,1);
            this.player.missWord();
            this.updateTextBox();
        }
    }



    // Draw on the canvas
    this.canvas.draw(this.words, this.player.score, this.player.lives, this.getPlayerWPM(), this.difficulty.name);

    // If the player lives is zero, end the game
    if(this.player.lives <= 0) this.stop(true);
}

/*
 * Search words for text that matches the userInputText and updates highlightInd accordingly. To be called with every keyboard input (in enterCharacter).
 */
GameController.prototype.updateHighlightInd = function() {
    highlightSearch = new RegExp('^' + this.userInputText) // A regex that searches for strings starting with userInputText
    for (word of this.words) {
        if (word.text.search(highlightSearch) !== -1) {
            word.highlightInd = this.userInputText.length // If there is a match among words.text, set that word's highlight index to userInputText.length
        } else {
            word.highlightInd = 0 // Reset highlight index if there is no longer a match (i.e. word highlight search narrows)
        }
    }
}

/**
 * Add a random word to the words array
 */
GameController.prototype.generateWord = function() {
    const text = this.dictionary.getRandomWord();
    const textWidth = this.canvas.get2DContext().measureText(text).width;

    // Give left and right padding to prevent words from overlaping with UI components
    const min = 300; // Give left padding of 300
    const max = this.canvas.getWidth() - 300 - textWidth; // Give 300 default right padding + width of the word

    const x = Math.floor(Math.random() * (max - min) + min);

    // Every 100th word is a bonus word
    if(this.numWordsSpawned % 100 == 0 && this.numWordsSpawned > 0) {
        this.words.push(new Word(text, x, true));
    } else {
        this.words.push(new Word(text, x));
    }

    this.numWordsSpawned ++;
    this.updateTextBox(); // Updates the text box when a new word is added
}

/**
 * Updates the TypeBox's innerHTML
 */
GameController.prototype.updateTextBox = function() {
    let maxPrefixIndex = -1; // Index indicating the end of the matching prefix with the maximum length between words displayed and user input
    for (word of this.words) {
        let currentPrefixIndex = -1; // Index indicating the end of the matching prefix of the current word with user input
        for (i in word.text) { // Iterating through each char
            if (word.text[i] == this.userInputText[i]) { // Check if the char in the i-th of both strings position matches
                currentPrefixIndex++;
            }
            else {
                break;
            }
        }
        maxPrefixIndex = Math.max(maxPrefixIndex, currentPrefixIndex); // Get the maximum value between current maximum and current prefix length
    }
    let prefix = "<span class=\"correctly-typed\">" + this.userInputText.substr(0, maxPrefixIndex+1) + "</span>";
    let suffix = "<span class=\"incorrectly-typed\">" + this.userInputText.substr(maxPrefixIndex+1, this.userInputText.length - 1) + "</span>";
    let innerHTML = prefix + suffix;
    if (maxPrefixIndex == -1) {
        innerHTML = "<span class=\"incorrectly-typed\">" + this.userInputText + "</span>";
    }
    $("#text-display").html(innerHTML); // Update the User Input Display
}

/**
 * Function to find the best match (The word that closely matches player's attempt)
 * and estimate the number of letters entered correctly and the number of letters
 * entered incorrectly. Call this function when user incorrectly enters a word.
 * This function utilizes Levenshtein Distance.
 * 
 * Source: https://en.wikipedia.org/wiki/Levenshtein_distance
 * 
 * @returns {object} matching word data
 */
GameController.prototype.findBestWordMatch = function() {
    /**
     * If there is no falling word on the screen (This will probably never happen),
     * then all characters entered are incorrect
     */
    if(this.words.length == 0) return { "text": "", "correct": 0, "incorrect": this.userInputText.length };

    // Assume that the first falling word is the closest match before iteration
    let minDistance = getLevenshteinDistance(this.words[0].text, this.userInputText);
    const match = { 
        "text": this.words[0].text,
        "input": this.userInputText,
        "correct": Math.max(this.words[0].text.length, this.userInputText.length) - minDistance,
        "incorrect": minDistance
    };

    /**
     * Iterating the words array, get the Levenshtein distance between each falling word and the user's entered word
     * while keeping track of the minimum distance
     */
    for(word of this.words) {
        let distance = getLevenshteinDistance(word.text, this.userInputText);

        if(distance < minDistance) {
            minDistance = distance;
            match.text = word.text;
            match.correct = Math.max(word.text.length, this.userInputText.length) - distance;
            match.incorrect = distance;
        }
    }
    //console.log(match);
    return match;
}

/**
 * Function to return player's performance data to the game interface for displaying
 * the Game Over screen.
 * 
 * @returns {object} Player performance data metrics
 */
GameController.prototype.getPlayerPerformanceData = function() {
    const obj = {};

    const totalWords = this.player.numCorrectWords + this.player.numIncorrectWords;
    const totalCharacters = this.player.numCorrectChars + this.player.numIncorrectChars;

    // This elapsed time format will be correct as long as the duration doesn't exceed a day
    obj["elapsed-time"] = new Date(this.timer.getElapsedTime()).toISOString().slice(11,19);
    obj["score"] = this.player.score;
    obj["player-wpm"] = this.getPlayerWPM().toFixed(2);
    obj["num-bonus"] = this.player.numBonus;
    obj["num-words-total"] = totalWords;
    obj["num-words-correct"] = this.player.numCorrectWords;
    obj["num-words-incorrect"] = this.player.numIncorrectWords;
    obj["num-chars-total"] = totalCharacters;
    obj["num-chars-correct"] = this.player.numCorrectChars;
    obj["num-chars-incorrect"] = this.player.numIncorrectChars;
    obj["accuracy"] = (this.player.numCorrectChars == 0 ? 0 : this.player.numCorrectChars / totalCharacters * 100).toFixed(2) + "%";

    return obj;
}

/**
 * A Helper function that returns the minimum edit distance between two strings.
 * Edit distance is the number of edits (Insertion, Change, Deletion) required to
 * make two string literals equal.
 * 
 * Video Demonstration: https://www.youtube.com/watch?v=We3YDTzNXEk
 * 
 * @param {string} first the first string literal
 * @param {string} second the second string literal
 */
function getLevenshteinDistance(first, second) {
    // Declare the matrix
    const matrix = [];

    /**
     * Initialize the matrix, taking the length of first and second strings into account.
     */
    for(let i = 0; i <= first.length; i++) {
        let row = [];
        for(let j = 0; j <= second.length; j++) {
            if(i == 0) row[j] = j;
            else if(j == 0) row[j] = i;
            else row[j] = 0;
        }
        matrix.push(row);
    }

    // Populate the matrix with edit distances.
    for(let i = 1; i <= first.length; i++) {
        for(let j = 1; j <= second.length; j++) {
            // If the 2 characters are equal, take the diagonal value
            if(first[i- 1] == second[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            }
            // If not, the value is minimum of the surrounding three + 1
            else {
                const min = Math.min(matrix[i][j - 1], matrix[i - 1][j - 1], matrix[i - 1][j]) + 1;
                matrix[i][j] = min;
            }
        }
    }
    //console.log(matrix);
    return matrix[first.length][second.length];
}
