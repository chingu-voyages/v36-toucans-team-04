const diffs = document.querySelector("#difficulties");
const canvasHeight = 300;
const canvasWidth = 150;
// Auxiliar object to access  parameters of each difficulty
const gameDifficulty = new GameDifficulty();
let difficulties = gameDifficulty.parameters; 

const gameController = new GameControllerDummy();

difficulties.forEach((difficulty,index) => {
	let div = document.createElement('div');
	let divNum = index + 1;
	div.setAttribute('id', divNum);
	div.setAttribute('class', 'difficulty-selector');
	diffs.appendChild(div);
	div.innerHTML = "<div class='inner-difficulty-selector'><p>Difficulty " + divNum + "</p>" + "\n <p>WPM: " + difficulty.wpm + "</p></div>";
	div.addEventListener("click", () => {
		window.location.href = `game.html?${index + 1}`;
	});
})

$(".difficulty-selector").hover(function(){
	startDemoForDifficulty(parseInt($(this).attr("id")));
}, function() {
	finishDemoForDifficulty();
});

function startDemoForDifficulty(selectedDifficulty) {
	$(".canvas-example").addClass("active");
	// Setting canvas 
  $("#canvas").prop("width", ($("#canvas").width()));
  $("#canvas").prop("height", ($("#canvas").height()));

	gameController.start(selectedDifficulty == "" ? 1 : selectedDifficulty);
}

function finishDemoForDifficulty() {
	$(".canvas-example").removeClass("active");
	gameController.reset();
}
