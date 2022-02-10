function CanvasDummy() {
    this.element = document.getElementById("canvas");
    this.image = new Image(40, 40);
    // Load the Heart image to represent the lives
    this.image.src = "./assets/images/heart.png";
}

/**
 * Draw game components on the canvas. This function is to be called for every frame
 * @param {Word[]} words 
 * @param {number} speed 
 * @param {number} capWordProb 
 * @param {number} wpm 
 * @param {number} difficulty 
 */
CanvasDummy.prototype.draw = function(words, speed, capWordProb, wpm, difficulty, maxWordLength) {
    this.clear();
    const ctx = this.get2DContext(), rightPadding = 250, heartDimension = 30;

    ctx.fillStyle = "red";
    ctx.font = "1.5rem Arial";

    // Draw the difficulty
    ctx.fillText("Difficulty: " + difficulty, 10, 55);

    // Draw the speed
    ctx.fillText("Speed: " + speed, this.element.width - rightPadding, 55);

    // Draw WPM 
    ctx.fillText("WPM: " + wpm, this.element.width - rightPadding, 80);
    
    // Draw capWordProb 
    ctx.fillText("capWordProb: " + capWordProb, this.element.width - rightPadding, 105);
    
    // Draw maxWordLength 
    ctx.fillText("maxWordLength: " + maxWordLength, this.element.width - rightPadding, 130);

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
CanvasDummy.prototype.getWidth = function() {
    return this.element.width;
}

/**
 * Return the height of the canvas
 * @returns {number} the height of the canvas
 */
CanvasDummy.prototype.getHeight = function() {
    return this.element.height;
}

/**
 * Internal function to return the 2D canvas context
 * @returns {*} 2D Context of the canvas
 */
CanvasDummy.prototype.get2DContext = function() {
    if(this.element.getContext) return this.element.getContext("2d");
    return undefined;
}

/**
 * Function that clears the canvas and resets it to its default state
 */
CanvasDummy.prototype.clear = function() {
    const ctx = this.get2DContext();
    ctx.clearRect(0, 0, this.element.width, this.element.height);
}
