function Canvas() {
    this.element = document.getElementById("canvas");
    this.image = new Image(40, 40);

    // Load the Heart image to represent the lives
    this.image.src = "./assets/images/heart.png";
}

/**
 * Draw game components on the canvas. This function is to be called for every frame
 * @param {Word[]} words 
 * @param {number} score 
 * @param {number} lives 
 * @param {number} wpm 
 * @param {number} difficulty 
 */
Canvas.prototype.draw = function(words, score, lives, wpm, difficulty) {
    this.clear();
    const ctx = this.get2DContext(), rightPadding = 250, heartDimension = 40;

    ctx.fillStyle = "red";
    ctx.font = "2em Courier Prime";

    // Draw the difficulty
    ctx.fillText("LEVEL: " + difficulty, 50, 25);

    // Draw the score
    ctx.fillText("SCORE: " + score, this.element.width - rightPadding, 25);

    // Draw WPM - 2 Decimal Places
    ctx.fillText("WPM: " + wpm.toFixed(2), this.element.width - rightPadding, 75);
    
    let heartYPos = 125, heartXPos = this.element.width - rightPadding;

    // Draw the lives
    for(let i = 0; i < lives; i++) {
        // For every 5 lives, start drawing on the next row to prevent overflow
        if(i % 5 == 0) {
            heartYPos = 125 + heartDimension * i / 5;
            heartXPos = this.element.width - rightPadding;
        }
        ctx.drawImage(this.image, heartXPos, heartYPos, heartDimension, heartDimension);
        heartXPos += heartDimension;
    }

    // Draw the words on the screen
    for(word of words) {
        let defaultTextColor = word.isBonus ? "blue" : "white";

        // Highlight the substring if the word is highlighted
        if(word.highlightInd > 0) {
            const prefix = word.text.substring(0, word.highlightInd);
            const suffix = word.text.substring(word.highlightInd);
            const prefixWidth = ctx.measureText(prefix).width;

            ctx.fillStyle = "yellow";
            ctx.fillText(prefix, word.x, word.y);

            ctx.fillStyle = defaultTextColor;
            ctx.fillText(suffix, word.x + prefixWidth, word.y);
        } 
        // No highlighting required
        else {
            ctx.fillStyle = defaultTextColor;
            ctx.fillText(word.text, word.x, word.y);
        }
    }
}

/**
 * Return the width of the canvas
 * @returns {number} the width of the canvas
 */
Canvas.prototype.getWidth = function() {
    return this.element.width;
}

/**
 * Return the height of the canvas
 * @returns {number} the height of the canvas
 */
Canvas.prototype.getHeight = function() {
    return this.element.height;
}

/**
 * Internal function to return the 2D canvas context
 * @returns {*} 2D Context of the canvas
 */
Canvas.prototype.get2DContext = function() {
    if(this.element.getContext) return this.element.getContext("2d");
    return undefined;
}

/**
 * Function that clears the canvas and resets it to its default state
 */
Canvas.prototype.clear = function() {
    const ctx = this.get2DContext();
    ctx.clearRect(0, 0, this.element.width, this.element.height);
}
