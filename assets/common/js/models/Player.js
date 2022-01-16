function Player() {
    this.score = 0;
    this.numCharsEntered = 0;
    this.lives = 5;
}

/**
 * Player enters a word correctly.
 * @param {string} text The text that user entered successfully
 */
Player.prototype.enterWord = function(text) {
    // We add 1 since Space/Enter key counts as a character
    this.numCharsEntered += text.length + 1;

    this.score++;
}

/**
 * Player misses a word
 */
Player.prototype.missWord = function() {
    // Penalize the player here
}