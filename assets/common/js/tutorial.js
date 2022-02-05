const diffs = document.querySelector("#difficulties");
const canvasHeight = 300;
const canvasWidth = 150;
// Auxiliar object to access  parameters of each difficulty
const gameDifficulty = new GameDifficulty();
let difficulties = gameDifficulty.parameters; 

let gameController = new GameControllerDummy();

difficulties.forEach((difficulty,index) => {
	let div = document.createElement('div');
	let divNum = index + 1;
	div.setAttribute('id', divNum);
	div.setAttribute('class', 'difficulty-selector');
	div.innerHTML = `
	<div class="inner-difficulty-selector">
		<p>${divNum}</p>
	</div>`;
	if (divNum < 11) diffs.appendChild(div);
	div.addEventListener("click", () => {
		window.location.href = `game.html?${index + 1}`;
	});
})

$(".canvas-example").hide();

$("#difficulties").hover(function() {
	$(".canvas-example").show();
	$(".canvas-example").removeClass("animate__animated animate__bounceOutLeft");
	$(".canvas-example").addClass("animate__animated animate__bounceInRight");
}, function() {
	$(".canvas-example").removeClass("animate__animated animate__bounceInRight");
	$(".canvas-example").addClass("animate__animated animate__bounceOutLeft");
});

// Hide the canvas element (Remove it from the content flow) after the bounce out animation
$(".canvas-example").on("animationend", function(e) {
	if(e.originalEvent.animationName == "bounceOutLeft") {
		$(".canvas-example").hide();
	}
});

$(".difficulty-selector").hover(function(){
	startDemoForDifficulty(parseInt($(this).attr("id")));
}, function() {
	finishDemoForDifficulty();
});

function startDemoForDifficulty(selectedDifficulty) {
	// Setting canvas 
    $("#canvas").prop("width", ($("#canvas").width()));
    $("#canvas").prop("height", ($("#canvas").height()));

	gameController.start(selectedDifficulty == "" ? 1 : selectedDifficulty);
}

function finishDemoForDifficulty() {
	gameController.reset();
}
