// Create a mouse click sound
let sound = new Howl({
    src: ["./assets/audio/mixkit-select-click-1109.wav"]
});

// Animate the header and menu items upon document loading
$("header").addClass("animate-slidein-right");
$("main").addClass("animate-slidein-left");

// Add event listners to the menu items
$(".menu-item").on("click", function() {
    // Play the click sound
    sound.play();

    $("header").removeClass("animate-slidein-right");
    $("header").addClass("animate-slideout-left");

    $("main").removeClass("animate-slidein-left");
    $("main").addClass("animate-slideout-right");

    setTimeout(() => {
        let link = $(this).attr("data-href");
        window.location.href = link;
    }, 500)
});