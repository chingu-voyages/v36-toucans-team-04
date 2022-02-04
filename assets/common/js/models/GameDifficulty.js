function GameDifficulty() {
    this.difficulty = 1;

    /** Parameters for each difficulty level
     *  wpm: word per minute
     *  speed: the speed which the words fall (speed > 0)
     *  maxWordLength: the maximum amount of characters that a word will have
     *  capWordProb: the probability of finding a capitalized word (0 <= capWordProb <= 1)
     */

    this.parameters = [ 

        // Difficulty 1
        {
            wpm: 20,
            speed: 1.5,
            maxWordLength: 3,
            capWordProb: 0,
        },

        // Difficulty 2
        {
            wpm: 25,
            speed: 1.6,
            maxWordLength: 4,
            capWordProb: 0,
        },

        // Difficulty 3
        {
            wpm: 30,
            speed: 1.7,
            maxWordLength: 5,
            capWordProb: 0,
        },

        // Difficulty 4
        {
            wpm: 40,
            speed: 1.8,
            maxWordLength: 5,
            capWordProb: 0.1,
        },

        // Difficulty 5
        {
            wpm: 45,
            speed: 1.9,
            maxWordLength: 6,
            capWordProb: 0.2,
        },

        // Difficulty 6
        {
            wpm: 50,
            speed: 2,
            maxWordLength: 7,
            capWordProb: 0.2,
        },

        // Difficulty 7
        {
            wpm: 60,
            speed: 2.1,
            maxWordLength: 8,
            capWordProb: 0.3,
        },

        // Difficulty 8
        {
            wpm: 65,
            speed: 2.2,
            maxWordLength: 9,
            capWordProb: 0.4,
        },

        // Difficulty 9
        {
            wpm: 70,
            speed: 2.3,
            maxWordLength: 10,
            capWordProb: 0.5,
        },

        // Difficulty 10
        {
            wpm: 80,
            speed: 2.5,
            maxWordLength: 11,
            capWordProb: 0.6
        },
    ];
}

/**
 * Return the wpm that corresponds to the current difficulty
 * @returns {number} the current wpm 
 */
GameDifficulty.prototype.getWPM = function () {
    return this.parameters[this.difficulty - 1].wpm;
};


/**
 * Return the speed that corresponds to the current difficulty
 * @returns {number} the current speed 
 */
GameDifficulty.prototype.getSpeed = function () {
    return this.parameters[this.difficulty - 1].speed;
};


/**
 * Return the maximum word length that corresponds to the current difficulty
 * @returns {number} the current maximum word length 
 */
GameDifficulty.prototype.getMaxWordLength = function () {
    return this.parameters[this.difficulty - 1].maxWordLength;
};


/**
 * Return the probability of finding a capitalized word that corresponds to the current difficulty 
 * @returns {number} wpm 
 */
GameDifficulty.prototype.getCapWordProb = function () {
    return this.parameters[this.difficulty - 1].capWordProb;
};


/**
 * Increase the game difficulty by one level until reaching the max level
 * @returns {bool} whether or not it was possible to increase difficulty level 
 */
GameDifficulty.prototype.increase = function() {
    if (this.getCurrentLevel() < this.getMaxLevel()) {
        this.difficulty ++;
        return true;
    }
    return false;
}


/**
 * Return the current difficulty level
 * @returns {number} the current difficulty level
 */
GameDifficulty.prototype.getCurrentLevel = function() {
    return parseInt(this.difficulty);
}


/**
 * Set the current level to the given level value
 * @param {number} currentLevel the current level value
 */
GameDifficulty.prototype.setCurrentLevel = function(currentLevel) {
    if(currentLevel > this.getMaxLevel || currentLevel < 0) {
        throw "Invalid current level value passed to setCurrentLevel function in GameDifficulty.js.";
    }
    this.difficulty = parseInt(currentLevel);
}


/**
 * Return the maximum level for the game
 * @returns {number} get the maximum level
 */
GameDifficulty.prototype.getMaxLevel = function() {
    return this.parameters.length;
}
