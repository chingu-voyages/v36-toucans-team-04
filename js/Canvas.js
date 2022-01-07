function GameCanvas() {
    this.backgroudColor = "rgb(40,40,40)"; // Default background color of the canvas
    
    // This represents the DOM element of the game canvas
    this.canvas = document.getElementById("game-canvas");
}

GameCanvas.prototype.init = function() {
    this.canvas.width = document.body.clientWidth - 10;
    this.canvas.height = document.body.clientHeight - 10;
    this.canvas.style.background = this.backgroudColor;
}

GameCanvas.prototype.get2DContext = function() {
    if(this.canvas.getContext) return this.canvas.getContext("2d");
    return undefined;
}

GameCanvas.prototype.draw = function(words) {
    let ctx = this.get2DContext();

    // First clear the canvas before rendering the next frame
    this.clear();

    // Iterate each word and draw it on the canvas
    for(word of words) {
        console.log(word.font);
        ctx.font = word.font;
        ctx.strokeStyle = word.color;
        ctx.strokeText(word.text, word.x, word.y);
    }
}

GameCanvas.prototype.clear = function() {
    let ctx = this.get2DContext();

    // First clear the canvas
    ctx.fillStyle = this.backgroudColor;
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

GameCanvas.prototype.getWidth = function() {
    return this.canvas.width;
}