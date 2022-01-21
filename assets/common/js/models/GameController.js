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

    this.numWordsSpawned = 0;
}

/**
 * Start the game.
 */
GameController.prototype.start = function() {
    this.gameInProgress = true;

    this.wordGenerationIntervalId = window.setInterval(() => { this.generateWord(); }, 60000 / this.wpm);
    window.requestAnimationFrame(() => { frameFn(); });

    // Make sure to use the arrow function here to make the current context accessible inside the nested function.
    const frameFn = () => {
        this.executeFrameActions();

        // Recursively call the frameFn function to keep the frame request going as long as the game is in progress
        if(this.gameInProgress) window.requestAnimationFrame(frameFn);
    }

    this.timer.start();
}

/**
 * Stop the game. Call this function when game is over.
 */
GameController.prototype.stop = function() {
    // Clear the word generation interval
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

}

GameController.prototype.enterCharacter = function(charCode) {
    // This is a backspace
    if(charCode === 8) ;// Remove the last character in userInputText
    else ; // Push the input character to userInputText
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
}