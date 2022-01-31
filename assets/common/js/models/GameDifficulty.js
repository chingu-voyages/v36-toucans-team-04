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
            speed: 0.25,
            maxWordLength: 4,
            capWordProb: 0.1,
        },

        // Difficulty 2
        {
            wpm: 30,
            speed: 0.5,
            maxWordLength: 5,
            capWordProb: 0.2,
        },

        // Difficulty 3
        {
            wpm: 40,
            speed: 0.75,
            maxWordLength: 6,
            capWordProb: 0.3,
        },

        // Difficulty 4
        {
            wpm: 50,
            speed: 0.8,
            maxWordLength: 7,
            capWordProb: 0.4,
        },

        // Difficulty 5
        {
            wpm: 60,
            speed: 1,
            maxWordLength: 8,
            capWordProb: 0.5,
        },
    ];
}

/**
 * Initialize difficulty
 */
GameDifficulty.prototype.initialize = function (difficulty) {
    this.difficulty = difficulty;
};

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
