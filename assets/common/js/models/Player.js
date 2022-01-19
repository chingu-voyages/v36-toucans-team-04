function Player() {
    this.score = 0;
    this.numCharsEntered = 0;
    this.lives = 5;
}

/**
 * Player enters a word correctly.
 * @param {Word} word the Word object that player entered
 */
Player.prototype.enterWord = function(word) {
    // We add 1 since Space/Enter key counts as a character
    this.numCharsEntered += word.text.length + 1;
    this.score++;

    if(word.isBonus) this.lives ++;
}

/**
 * Player misses a word
 */
Player.prototype.missWord = function() {
    // Penalize the player here
}