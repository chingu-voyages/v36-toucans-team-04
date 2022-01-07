let button = document.getElementById("btn-start-stop");

// Create a game controller instance
let gameController = new GameController();

// The game will start or stop when the button is clicked
button.addEventListener("click", function() {
    let speedInput = document.getElementById("speed");
    let wpmInput = document.getElementById("wpm");

    // If the game is not in progress, start the game. Otherwise, stop the game.
    if(!gameController.gameInProgress) {
        gameController.setup();

        // Set the game's WPM and Speed
        gameController.wpm = wpmInput.value;
        gameController.speed = speedInput.value;
        
        gameController.startGame();

        // Disable the input fields
        speedInput.setAttribute("disabled", "disabled");
        wpmInput.setAttribute("disabled", "disabled");

        // Update the button label
        this.innerText = "Stop!";
    } else {
        gameController.stopGame();

        // Enable the input fields
        speedInput.removeAttribute("disabled");
        wpmInput.removeAttribute("disabled");

        // Update the button label
        this.innerText = "Start!";
    }
});

