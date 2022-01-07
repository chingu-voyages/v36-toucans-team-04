let button = document.getElementById("btn-start-stop");

// Create a game controller instance
let gameController = new GameController();

// The game will start or stop when the button is clicked
button.addEventListener("click", function() {
    let speedInput = document.getElementById("speed");
    let wpmInput = document.getElementById("wpm");

    if(!gameController.gameInProgress) {
        gameController.setup();
        gameController.wpm = wpmInput.value;
        gameController.speed = speedInput.value;
        gameController.startGame();

        speedInput.setAttribute("disabled", "disabled");
        wpmInput.setAttribute("disabled", "disabled");
        this.innerText = "Stop!";
    } else {
        gameController.stopGame();

        speedInput.removeAttribute("disabled");
        wpmInput.removeAttribute("disabled");
        this.innerText = "Start!";
    }
});

