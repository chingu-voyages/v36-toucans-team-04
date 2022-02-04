function Sounds(){

    this.correctWord = new Howl({
        src: ["assets/audio/mixkit-unlock-game-notification-253.wav"]
    });

    this.incorrectWord = new Howl({
        src: ["assets/audio/mixkit-negative-answer-lose-2032.wav"]
    });

    this.levelBeaten = new Howl({
        src: ["assets/audio/mixkit-game-level-completed-2059.wav"]
    });

    this.bonusWord = new Howl({
        src: ["assets/audio/mixkit-melodic-bonus-collect-1938.wav"]
    })

    this.bonusWordSpawns = new Howl({
        src: ["assets/audio/mixkit-arcade-bonus-229.wav"]
    })
}
