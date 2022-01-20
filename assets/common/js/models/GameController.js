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
 * Start the game.
 */
GameController.prototype.start = function() {
    this.gameInProgress = true;
    this.wordGenerationIntervalId = window.setInterval(() => { this.generateWord(); }, 60000 / this.wpm);
    this.frameIntervalId = window.setInterval(() => { this.executeFrameActions(); }, 1000 / 60); // 60 FPS

    this.timer.start();
}

/**
 * Stop the game. Call this function when game is over.
 */
GameController.prototype.stop = function() {
    window.clearInterval(this.frameIntervalId);
    window.clearInterval(this.wordGenerationIntervalId);

    this.gameInProgress = false;
    this.timer.stop();

    // Fire gameover event
    $(window).trigger("gameover");
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
    for(word of this.words) {
        // Bonus word moves down quicker than normal words
        if(word.isBonus) word.y += this.speed + 1;
        else word.y += this.speed;
    }


    // If the player lives is zero, end the game
    if(this.player.lives == 0) this.stop();

    // Draw on the canvas
    this.canvas.draw(this.words, this.player.score, this.player.lives, this.getPlayerWPM(), this.difficulty);
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
