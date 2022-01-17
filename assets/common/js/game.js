// Set the canvas height and width based on the current body size.
$("canvas").prop("width", $(window).width() || $("body").width());
$("canvas").prop("height", ($(window).height() || $("body").height()) - 106);

// Add event listeners for the BACK button
$(".fa-arrow-left").on("click", () => { window.location.href = "index.html"; });
$("#nav-bar").on("mouseenter", function() { $(this).addClass("animate__animated animate__headShake"); });
$("#nav-bar").on("mouseleave", function() { $(this).removeClass("animate__animated animate__headShake"); });


const gameController = new GameController();
gameController.start();

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
    // Things to do when the game is over
});
