const gameController = new GameController();
let selectedDifficulty = location.search.substring(1);

// Set the canvas height and width based on the current body size.
resetCanvasSize();

// Start the game
gameController.start(selectedDifficulty == "" ? 1 : selectedDifficulty);

// Add event listeners for the BACK button
$(".fa-arrow-left").on("click", () => { window.location.href = "index.html"; });
$("#back-button-container").on("mouseenter", function() { $(this).addClass("animate__animated animate__headShake"); });
$("#back-button-container").on("mouseleave", function() { $(this).removeClass("animate__animated animate__headShake"); });

// Add event listener for the END Game button on the game page
$("#end-game-button").on("click", function() {
    $("#end-game-confirm-modal").modal("show");
});

// Add event listener for the End Game button on the game end confirmation modal
$("#confirm-end-game-btn").on("click", function() {
    gameController.stop();
    displayGameOverModal();
})

// Add event listener for the Restart Game button on the game over modal
$("#modal-restart-game-btn").on("click", function() {
    $("#game-over-modal").modal("hide");
    $("#text-display").html("");
    resetCanvasSize();
    gameController.reset();
    gameController.start();
});

// Capture the player key press and send the input to the game controller
$(window).on("keypress", event => {
    // User pressed Space/Enter, tell the game controller to enter the current user input text
    if(gameController.gameInProgress) {
        if(event.keyCode == 13 || event.keyCode == 32) gameController.enterWord();
        else gameController.enterCharacter(event.charCode);

        gameController.updateTextBox();
    }
});

// Backspace is not captured in the keypress event. Capture backspace in the keydown event instead.
$(window).on("keydown", event => {
    // If the keyCode is for Backspace
    if(gameController.gameInProgress && event.keyCode == 8) {
        gameController.enterCharacter(event.keyCode);

        gameController.updateTextBox();
    }
});

// Gameover event has been triggered from the GameController
$(window).on("gameover", () => {
    displayGameOverModal();
});

/**
 * Display the Game Over modal
 */
function displayGameOverModal() {
    // The confirmation modal can be closed.
    $("#end-game-confirm-modal").modal("hide");

    // Obtain player performance data from the game controller
    const stats = gameController.getPlayerPerformanceData();

    // Iterating each key in the data object, set the values to fields
    for(key in stats) {
        $("#game-" + key).text(stats[key]);
    }

    // Display the game over modal
    $("#game-over-modal").modal("show");
}

/**
 * Function to set the height and width of canvas
 */
function resetCanvasSize() {
    $("canvas").prop("width", ($(window).width() || $("body").width()));
    $("canvas").prop(
        "height",
        // Subtract 20 for the 10px padding on nav bar and 2px for the border size
        ($(window).height() || $("body").height()) - $("#nav-bar").height() - $("#text-display-container").height() - 22
    );
}