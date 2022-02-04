function Sounds(){

    this.playing.sound = false;

    this.correctWord = new Howl({
        src: ["assets/audio/mixkit-correct-answer-tone-2870.wav"]
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

    this.liveLost = new Howl({
        src: ["assets/audio/mixkit-losing-drums-2023.wav"]
    })

    this.gameOver = new Howl({
        src: ["assets/audio/mixkit-auditorium-moderate-applause-and-cheering-502.wav"]
    })
}
