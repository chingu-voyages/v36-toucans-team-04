function Player() {
    this.score = 0;
    this.numBonus = 0;
    this.numCorrectWords = 0;
    this.numIncorrectWords = 0;
    this.numCorrectChars = 0;
    this.numIncorrectChars = 0;
    this.lives = 5;
}

/**
 * Player enters a word correctly.
 * @param {Word} word the Word object that player entered
 */
Player.prototype.enterWord = function(word) {
    // We add 1 since Space/Enter key counts as a character
    this.numCorrectChars += word.text.length + 1;
    this.numCorrectWords++;

    this.score++;

    if(word.isBonus) {
        this.lives ++;
        this.numBonus++;
    }
}

/**
 * Player enters a word incorrectly. Record how many characters are correct and
 * how many characters are incorrect.
 * @param {*} correct number of characters that player entered correctly
 * @param {*} incorrect number of characters that player entered incorrectly
 */
Player.prototype.enterIncorrectWord = function(correct, incorrect) {
    // To receive credit for Space/Enter keypress, at least 1 character needs to be correct
    if(correct > 0) this.numCorrectChars += correct + 1;
    this.numIncorrectChars += incorrect;
    this.numIncorrectWords++;
}

/**
 * Player misses a word
 */
Player.prototype.missWord = function() {
    this.lives--;
}
