function GameController() {
    this.canvas = new Canvas();
    this.timer = new Timer();
    this.player = new Player();
    this.dictionary = new Dictionary();
    this.difficulty = 1;

    this.gameInProgress = false;
    this.wpm = 30;
    this.words = [];
    this.userInputText = "";
    this.speed = 1;

    this.wordGenerationIntervalId = null;
    this.frameIntervalId = null;

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

    // Reset objects
    this.player = new Player();
    this.canvas.clear();
    this.timer.reset();

    /**
     * Once we implement different difficulty level, maybe we should reset to whatever
     * difficulty the player originally selected. Also, since wpm, speed are all tied to the difficulty level
     * we may create an object for managing the difficulty levels and allow that object to set the wpm and speed
     * based on the difficulty selected.
     */
    this.difficulty = 1;
    // For now, just reset the game WPM and speed to default values.
    this.wpm = 30;
    this.speed = 1;

    this.words = [];
    this.userInputText = "";
    this.numWordsSpawned = 0;
}

/**
 * Start the game.
 */
GameController.prototype.start = function() {
    this.gameInProgress = true;

    this.wordGenerationIntervalId = window.setInterval(() => { this.generateWord(); }, 60000 / this.wpm);
    this.frameIntervalId = window.requestAnimationFrame(() => { frameFn(); });

    // Make sure to use the arrow function here to make the current context accessible inside the nested function.
    const frameFn = () => {
        this.executeFrameActions();

        // Recursively call the frameFn function to keep the frame request going
        this.frameIntervalId = window.requestAnimationFrame(frameFn);
    }

    this.timer.start();
}

/**
 * Stop the game. Call this function when game is over.
 * @return {boolean} Should this function fire the gameover event and send a message to the interface?
 */
GameController.prototype.stop = function(fireEvent) {
    window.cancelAnimationFrame(this.frameIntervalId);
    window.clearInterval(this.wordGenerationIntervalId);

    this.gameInProgress = false;
    this.timer.stop();

    this.wordGenerationIntervalId = null;
    this.frameIntervalId = null;

    // Fire gameover event
    if(fireEvent) $(window).trigger("gameover");
}

/**
 * The function is called from game.js when player presses Space/Enter.
 * Validate the current value of userInputText.
 */
GameController.prototype.enterWord = function() {
    const wordsAsStrings = this.words.map((word) => word.text ); // Maps Word objects to strings
    if (wordsAsStrings.includes(this.userInputText)) ; // Word typed correctly
    else { // Word failed to be typed
    }
    this.userInputText = "";
}

GameController.prototype.enterCharacter = function(charCode) {
    // This is a backspace
    if(charCode === 8) { // Remove the last character in userInputText
        this.userInputText = this.userInputText.slice(0, -1);
    }
    else { // Push the input character to userInputText
        this.userInputText += String.fromCharCode(charCode);
    }
}

/**
 * Calculate and return player's WPM.
 * @returns {number} Player's WPM
 */
GameController.prototype.getPlayerWPM = function() {
    const numWords = this.player.numCharsEntered / 5; // Assumes 5 characters in a word
    const minutes = this.timer.getElapsedTime() / 60000; // Convert miliseconds to minutes
    return numWords / minutes;
}

GameController.prototype.executeFrameActions = function() {
    // Move all the words down
    for(let i = this.words.length-1 ; i >= 0 ; --i) {
        let word = this.words[i];
        // Bonus word moves down quicker than normal words
        if(word.isBonus) word.y += this.speed + 1;
        else word.y += this.speed;
        // Remove the word from this.words array if it reaches the bottom
        if (word.y > this.canvas.getHeight()) { 
            this.words.splice(i,1);
            this.player.missWord();
            this.updateTextBox();
        }
    }



    // Draw on the canvas
    this.canvas.draw(this.words, this.player.score, this.player.lives, this.getPlayerWPM(), this.difficulty);

    // If the player lives is zero, end the game
    if(this.player.lives == 0) this.stop(true);
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
