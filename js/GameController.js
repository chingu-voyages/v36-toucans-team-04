/**
 * The GameController object encapsulates all attributes and operations necessary to execute the game logic.
 */
function GameController() {
    this.gameInProgress = false; // Save the state of this game
    this.gameCanvas = new GameCanvas(); // The canvas object that this game interacts with
    this.dictionary = new Dictionary(); // The dictionary that stores all possible words

    this.fps = 60; // Frame Per Second - basically, how many times the browser should draw the game canvas per second
    this.speed = 2; // The default speed at which the words fall down.
    this.wpm = 30; // How many words are spawning per minute
    this.difficulty = 1; // Currently not used

    this.words = []; // Array containing words that are currently displayed

    // These variables store objects that will execute certain game functions at certain intervals.
    this.gameFrameInterval = null; // Executes actions per each frame (By default, it's 60 frames per second - see this.fps)
    this.gameWordGenerationInterval = null; // Generates a certain number of words per minute (By default, it's 30 word per minute - see this.wpm)
}

/**
 * Function that initializes the game canvas and the words array
 */
GameController.prototype.setup = function() {
    this.gameCanvas.init();
    this.words = [];
}

/**
 * Function that starts the game execution
 */
GameController.prototype.startGame = function() {
    // Set the word generation interval to start adding words based on the specified WPM - 60000ms == 1 minute
    this.gameWordGenerationInterval = window.setInterval(() => { this.addWord(); }, 60000 / this.wpm);
    
    // Set the game frame interval to start drawing this game based on the specified FPS - 1000ms == 1 second
    this.gameFrameInterval = window.setInterval(() => { this.executeGameActionsPerFrame(); }, 1000 / this.fps);
    
    this.gameInProgress = true;
}

/**
 * Function that adds a random word to the words array. This function can control the speed and format of each word
 * that is displayed on the canvas.
 */
GameController.prototype.addWord = function() {
    // Generate a random x-position for the new word
    let x = Math.floor(Math.random() * (this.gameCanvas.getWidth() - 200));

    // Get a random word from the dictionary
    let wordText = this.dictionary.getRandomWord();

    // Instantiate a word object
    let wordObj = new Word(wordText, undefined, undefined, this.speed, x);

    // Add a new word object to the words array
    this.words.push(wordObj);
}

/**
 * This function encapsulates all actions that occur per frame
 */
GameController.prototype.executeGameActionsPerFrame = function() {
    // Move all words that are currently displayed
    for(word of this.words) {
        word.updatePosition();
    }

    // Redraw all the words
    this.gameCanvas.draw(this.words);
}

/**
 * Function that stops the game execution and clear the canvas
 */
GameController.prototype.stopGame = function() {
    // Clear the intervals (Game execution stops)
    window.clearInterval(this.gameFrameInterval);
    window.clearInterval(this.gameWordGenerationInterval);

    this.gameInProgress = false;
}