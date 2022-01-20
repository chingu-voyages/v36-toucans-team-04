// Create a mouse click sound
let sound = new Howl({
    src: ["assets/audio/mixkit-select-click-1109.wav"]
});

// Add event listners to the menu items
$(".menu-item").on("click", function() {
    // Play the click sound
    sound.play();
    
    $("header").addClass("animate__animated animate__bounceOutRight");
    $("main").addClass("animate__animated animate__bounceOutLeft");

    $("main").on("animationend", () => {
        let link = $(this).attr("data-href");
        window.location.href = link;
    });
});