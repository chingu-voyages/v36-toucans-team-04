const diffs = document.querySelector("#difficulties");
const canvasHeight = 300;
const canvasWidth = 150;
// Auxiliar object to access  parameters of each difficulty
const gameDifficulty = new GameDifficulty();
let difficulties = gameDifficulty.parameters; 

difficulties.forEach((difficulty,index) => {
	let canvas = document.createElement('canvas')
	let canvasNum = index + 1
	let ctx = canvas.getContext('2d')
	canvas.setAttribute('height', canvasHeight + 'px')
	canvas.setAttribute('width', canvasWidth + 'px')
	canvas.setAttribute('id', 'diff' + canvasNum)
	ctx.font = '3em Arial'
	ctx.fillStyle = '#FF0000'
	ctx.fillText('Difficulty ' + canvasNum, 5, 35)
	ctx.fillText('WPM: ' + difficulty.wpm, 5, 65)
	diffs.appendChild(canvas)

	canvas.addEventListener("click", () => {
		window.location.href = `game.html?${index + 1}`;
	});
})
