function GameControllerDummy() {
    this.canvas = new CanvasDummy();
    this.timer = new Timer();
    this.player = new Player();
    this.dictionary = new Dictionary();
    this.gameDifficulty = new GameDifficulty(); 
    this.gameInProgress = false;
    this.words = [];
    this.userInputText = "";

    this.wordGenerationIntervalId = null;
    this.difficultyLevelIntervalId = null;
    this.frameIntervalId = null;

    this.numWordsSpawned = 0;
}

/**
 * Reset the game
 */
GameControllerDummy.prototype.reset = function() {
    /**
     * Call stop() just in case this function has been called while the game is still running.
     * Pass false to fireEvent since we don't need to send the event to the interface.
     */
    this.stop(false);

    // Reset objects except for the dictionary, which doesn't require reset
    this.player = new Player();
    this.canvas.clear();
    this.timer.reset();

    // Initialize game difficulty
    this.gameDifficulty.setCurrentLevel(1);

    this.words = [];
    this.userInputText = "";
    this.numWordsSpawned = 0;
}

/**
 * Start the game.
 */
GameControllerDummy.prototype.start = function(difficultyLevel = 1) {
    console.log("game started");
    this.gameInProgress = true;

    /*
     * Fill subdictionary for each difficulty level.
     * It is filled before the beginning of the game in order to achieve a smooth 
     * transition between difficulties while the game is in progress.
     */
    if (this.dictionary.subDictionary.length == 0) this.dictionary.initialize();

    // Initialize difficulty
    this.gameDifficulty.setCurrentLevel(difficultyLevel);

    // Function that sets Word Generation Interval
    const wordGenerationFn = () => {

        this.generateWord();
        return window.setInterval(() => { 
            this.generateWord(); }, 60000 / this.gameDifficulty.getWPM()
        );
    }

    // Set the word generation interval
    this.wordGenerationIntervalId = wordGenerationFn();

    // Start the game frame request
    this.frameIntervalId = window.requestAnimationFrame(() => { frameFn(); });

    // Make sure to use the arrow function here to make the current context accessible inside the nested function.
    const frameFn = () => {
        this.executeFrameActions();

        // Recursively call the frameFn function to keep the frame request going as long as the game is in progress
        if(this.gameInProgress) this.frameIntervalId = window.requestAnimationFrame(frameFn);
    }

    this.timer.start();
}

/**
 * Stop the game. Call this function when game is over.
 * @return {boolean} Should this function fire the gameover event and send a message to the interface?
 */
GameControllerDummy.prototype.stop = function(fireEvent) {
    // Clear the word generation interval
    window.clearInterval(this.wordGenerationIntervalId);
    window.clearInterval(this.difficultyLevelIntervalId);
    window.cancelAnimationFrame(this.frameIntervalId);
    console.log("Intervals cleared");
    this.wordGenerationIntervalId = null;
    this.difficultyLevelIntervalId = null;

    this.gameInProgress = false;
    this.timer.stop();

    // Fire gameover event
    if(fireEvent) $(window).trigger("gameover");
}

/**
 * Function to execute all operations in each frame
 */
GameControllerDummy.prototype.executeFrameActions = function() {
    // Move all the words down
    for(let i = this.words.length-1 ; i >= 0 ; --i) {
        let word = this.words[i];
        let speed = this.gameDifficulty.getSpeed();
        // Bonus word moves down quicker than normal words
        if(word.isBonus) word.y += speed + 1;
        else word.y += speed;
        // Remove the word from this.words array if it reaches the bottom
        if (word.y > this.canvas.getHeight()) { 
            this.words.splice(i,1);
            // if(!word.isBonus) this.player.missWord();
            // this.updateTextBox();
        }
    }

    // Draw on the canvas
    this.canvas.draw(this.words, this.gameDifficulty.getSpeed(), this.gameDifficulty.getCapWordProb(), this.gameDifficulty.getWPM(), this.gameDifficulty.getCurrentLevel(), this.gameDifficulty.getMaxWordLength());

    // If the player lives is zero, end the game
    // if(this.player.lives <= 0) this.stop(true);
}

/**
 * Add a random word to the words array
 */
GameControllerDummy.prototype.generateWord = function() {
    let text = this.dictionary.getRandomWordForDifficulty(this.gameDifficulty.getCurrentLevel());
    const textWidth = this.canvas.get2DContext().measureText(text).width;

    // Give left and right padding to prevent words from overlaping with UI components
    const min = 300; // Give left padding of 300
    const max = this.canvas.getWidth() - 300 - textWidth; // Give 300 default right padding + width of the word

    const x = Math.floor(Math.random() * (max - min) + min);

    // Every 100th word is a bonus word
    if(this.numWordsSpawned % 100 == 0 && this.numWordsSpawned > 0) {
        let level =
            this.gameDifficulty.getCurrentLevel() < this.gameDifficulty.getMaxLevel() 
            ? this.gameDifficulty.getCurrentLevel() + 1
            : this.gameDifficulty.getCurrentLevel();

        text = this.dictionary.getRandomWordForDifficulty(level);
        this.words.push(new Word(text, x, true));
    } else {
        this.words.push(new Word(text, x));
    }

    this.numWordsSpawned ++;
    // this.updateTextBox(); // Updates the text box when a new word is added
}


