function SoundController(){

    this.playing = [];
    
    this.sounds = {
        "correct-word": new Howl({
            src: ["assets/audio/mixkit-correct-answer-tone-2870.wav"]
        }),
 
        "incorrect-word": new Howl({
            src: ["assets/audio/mixkit-negative-answer-lose-2032.wav"]
        }),

        "level-beaten": new Howl({
            src: ["assets/audio/mixkit-game-level-completed-2059.wav"]
        }),

        "bonus-word": new Howl({
            src: ["assets/audio/mixkit-melodic-bonus-collect-1938.wav"]
        }),

        "bonus-word-spawns": new Howl({
            src: ["assets/audio/mixkit-arcade-bonus-229.wav"]
        }),

        "live-lost": new Howl({
            src: ["assets/audio/mixkit-losing-drums-2023.wav"]
        }),

        "game-over": new Howl({
            src: ["assets/audio/mixkit-auditorium-moderate-applause-and-cheering-502.wav"]
        }),
    }
}

/*
 * Play a specific sound
 * @param {string} sound to be played (must be defined in this.sounds)
 */

SoundController.prototype.play = function(sound) {
    if (this.sounds[sound]) {
        setTimeout(() => {
            const index = this.playing.indexOf(sound);
            if (index >= 0) this.playing.splice(index, 1);
        }, this.sounds[sound]._duration * 1000);
        this.playing.push(sound);
        this.sounds[sound].play();
    }
}


/*
 *  Stop any sound
 */
SoundController.prototype.stop = function() {
    // If any sound is being played then do nothing
    if (!this.isPlaying()) {
        return;
    }
    this.playing.forEach((sound) => {
        this.sounds[sound].stop();
    })
    this.playing = [];
}

/*
 * Check if any sound is being played
 * @return {boolean} is sound controller playing any sound? 
 */
SoundController.prototype.isPlaying = function () {
    return this.playing.length > 0;
}
