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
        word.y += this.speed;
    }


    // Draw on the canvas
    this.canvas.draw(this.words, this.player.score, this.player.lives, this.getPlayerWPM(), this.difficulty);
}

/**
 * Add a random word to the words array
 */
GameController.prototype.generateWord = function() {
    const text = this.dictionary.getRandomWord();
    const x = Math.floor(Math.random() * (this.canvas.getWidth() - 800) + 400);
    this.words.push(new Word(text, x));
}