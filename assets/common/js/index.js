let sound = new Howl({
    src: ["./assets/audio/mixkit-select-click-1109.wav"]
});

let listItems = document.querySelectorAll("li");
for(listItem of listItems) {
    listItem.addEventListener("mouseenter", function() {
        sound.play();
    });
}

document.querySelector("header").classList.add("animate-slidein-left-right");
document.querySelector("main").classList.add("animate-slidein-right-left");