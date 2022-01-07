/**
 * The GameCanvas object represents the game canvas (The game board).
 * This object is responsible for maintaining the attributes of the canvas and drawing objects on the canvas.
 */
function GameCanvas() {
    this.backgroudColor = "rgb(40,40,40)"; // Default background color of the canvas
    
    // This represents the DOM element of the game canvas
    this.canvas = document.getElementById("game-canvas");
}

/**
 * Function that initializes the canvas. Mainly sets the width and height based on the browser viewport
 */
GameCanvas.prototype.init = function() {
    this.canvas.width = document.body.clientWidth - 10;
    this.canvas.height = document.body.clientHeight - 10;
    this.clear();
}

/**
 * Function that clears the canvas and resets it to its default state
 */
GameCanvas.prototype.clear = function() {
    let ctx = this.get2DContext();

    ctx.fillStyle = this.backgroudColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

/**
 * Function that draws words on the board
 * @param {*} words Array of Word objects
 */
 GameCanvas.prototype.draw = function(words) {
    let ctx = this.get2DContext();

    // First clear the canvas before rendering the next frame
    this.clear();

    // Iterate each word and draw it on the canvas
    for(word of words) {
        ctx.font = word.font;
        ctx.strokeStyle = word.color;
        ctx.strokeText(word.text, word.x, word.y);
    }
}

/**
 * Function that returns the width of the game canvas
 * @returns {number} Width of the Canvas 
 */
GameCanvas.prototype.getWidth = function() {
    return this.canvas.width;
}

/**
 * Private function that returns the canvas context. The context contains functions to render drawings on the canvas.
 * @returns {*} Canvas Context
 */
GameCanvas.prototype.get2DContext = function() {
    if(this.canvas.getContext) return this.canvas.getContext("2d");
    return undefined;
}