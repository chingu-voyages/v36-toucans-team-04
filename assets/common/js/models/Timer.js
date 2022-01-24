function Timer() {
    this.startTime;
    this.endTime;
    this.running = false;
}

/**
 * Reset the timer
 */
Timer.prototype.reset = function() {
    this.startTime = undefined;
    this.endTime = undefined;
    this.running = false;
}

/**
 * Start the timer
 */
Timer.prototype.start = function() {
    this.startTime = new Date();
    this.running = true;
}

/**
 * End the timer
 */
Timer.prototype.stop = function() {
    this.endTime = new Date();
    this.running = false;
}

/**
 * Return the elapsed time
 * @returns {number} The elapsed time in miliseconds
 */
Timer.prototype.getElapsedTime = function() {
    if(this.running) return new Date() - this.startTime;
    else return this.endTime - this.startTime;
}

