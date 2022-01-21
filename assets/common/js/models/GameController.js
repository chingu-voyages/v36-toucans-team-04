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
    this.frameIntervalId = window.setInterval(() => { this.executeFrameActions(); }, 1000 / 60); // 60 FPS

    this.timer.start();
}

/**
 * Stop the game. Call this function when game is over.
 * @return {boolean} Should this function fire the gameover event and send a message to the interface?
 */
GameController.prototype.stop = function(fireEvent) {
    window.clearInterval(this.frameIntervalId);
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
}