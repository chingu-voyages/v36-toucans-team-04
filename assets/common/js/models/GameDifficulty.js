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
