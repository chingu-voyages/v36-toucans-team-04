function Word(text, font = "20px serif", color = "#FFFFFF", speed = 2.0, x = 0, y = 0, dx = 0, dy = 1) {
    this.text = text; // Text string
    this.color = color; // Text color
    this.font = font;
    this.speed = speed; // How fast this word should be falling

    this.x = x; // The current x-position on the canvas
    this.y = y; // The current y-position on the canvas

    this.dx = dx; // delta x: Specifies if this word should move in the x direction - 1 for yes, 0 for no
    this.dy = dy; // delta y: Specifies if this word should move in the y direction - 1 for yes, 0 for no
}

/**
 * Update the position of this word. Use speed as a multiplier.
 * The higher the speed, the greater the change distance (delta x and delta y) is.
 */
Word.prototype.updatePosition = function() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
}