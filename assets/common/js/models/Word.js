/**
 * The Word object encapsulates all attributes that define a word in the falling words game and
 * its operations.
 * 
 * @param {string} text the actual text of this word in string
 * @param {number} speed speed at which this word falls down - 2.0 by default
 * @param {number} x the x-position of this word at the current time - 0 by default
 * @param {boolean} isBonus is this word a bonus word?
 * @param {string} font controls the font size and font family of this word. 30px Arial by default
 * @param {string} color color of this word - white by default
 * @param {number} y the y-position of this word at the current time - 0 by default
 * @param {number} dx the distance at which the word moves horizontally every frame. For now, we keep this at 1 - 0 by default
 * @param {number} dy the distance at which the word moves vertically every frame. For now, we keep this at 1 - 1 by default
 */
function Word(text, speed = 2.0, x = 0, isBonus = false, color = "#FFFFFF", font = "30px Arial", y = 0, dx = 0, dy = 1) {
    this.text = text; // Text string
    this.color = color; // Text color
    this.font = font; // Text font (Includes both the size and font family)
    this.isBonus = isBonus; // Indicates if this word is a bonus

    // Maintaining the speed attribute in each word object opens the possibility of making each word fall down at different rates.
    this.speed = speed; // How fast this word should be falling down

    this.x = x; // The current x-position on the canvas
    this.y = y; // The current y-position on the canvas

    /**
        By turning on delta x, it's possible to make the word fall down diagonally
        if there ever is a need to do this.
     */
    this.dx = dx; // delta x: Specifies if this word should move in the x direction - 1 for yes, 0 for no
    this.dy = dy; // delta y: Specifies if this word should move in the y direction - 1 for yes, 0 for no
}

/**
 * Update the position of this word. Use speed as the multiplier.
 * The higher the speed, the greater the change distance (delta x and delta y) is.
 */
Word.prototype.updatePosition = function() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
}