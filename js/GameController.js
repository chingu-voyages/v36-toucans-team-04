function GameController() {
    this.gameInProgress = false; // Save the state of this game
    this.gameCanvas = new GameCanvas(); // The canvas object that this game interacts with
    this.dictionary = new Dictionary(); // The dictionary that stores all possible words

    this.fps = 60; // Frame Per Second - basically, how many times the browser should draw the game canvas per second
    this.speed = 1; // The default speed at which the words fall down.
    this.wpm = 30; // How many words are spawning per minute
    this.words = []; // Array containing words that are currently displayed

    // These are intervals that will drive this game
    this.gameFrameInterval = null;
    this.gameWordGenerationInterval = null;
}

GameController.prototype.setup = function() {
    this.gameCanvas.init();
    this.words = [];
}

GameController.prototype.startGame = function() {
    let me = this; // Stores the context of this game controller object, which is used inside the local functions

    // Set the word generation interval to start adding words based on the specified WPM
    this.gameWordGenerationInterval = window.setInterval(addWord, 60000 / this.wpm); // 60000ms == 1 minute
    
    // Set the game frame interval to start drawing this game based on the specified FPS
    this.gameFrameInterval = window.setInterval(executeGameActions, 1000 / this.fps); // 1000ms == 1 second
    
    this.gameInProgress = true;

    /**
     * Nested function that defines the logic of generating a word.
     */
    function addWord() {
        // Generate a random x-position for the new word
        let x = Math.floor(Math.random() * (me.gameCanvas.getWidth() - 200));
        
        me.generateWord(undefined, me.speed, x);
    }

    /**
     * Nested function that defines the logic of executing actions for each frame
     */
    function executeGameActions() {
        me.updateAllWordsPosition();
        me.renderWords();
    }
}

GameController.prototype.stopGame = function() {
    // Stop the intervals
    window.clearInterval(this.gameFrameInterval);
    window.clearInterval(this.gameWordGenerationInterval);

    // Clear the canvas
    this.gameCanvas.clear();

    this.gameInProgress = false;
}

GameController.prototype.generateWord = function(color, speed, x, y, dx, dy) {
    // Get a random word from the dictionary
    let wordText = this.dictionary.getRandomWord();

    // Instantiate a word object
    let wordObj = new Word(wordText, undefined, color, speed, x, y, dx, dy);

    // Add a new word object to the words array
    this.words.push(wordObj);
}

GameController.prototype.renderWords = function() {
    this.gameCanvas.draw(this.words);
}

GameController.prototype.updateAllWordsPosition = function() {
    for(word of this.words) {
        word.updatePosition();
    }
}