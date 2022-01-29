const diffs = document.querySelector('#difficulties')
const canvasHeight = 300
const canvasWidth = 150
let canvases = [{'wpm': 30, 'setting2': 10, 'setting3': 50},
	{'wpm': 45, 'setting2': 20, 'setting3': 40},
	{'wpm': 60, 'setting2': 30, 'setting3': 30},
	{'wpm': 75, 'setting2': 40, 'setting3': 20},
	{'wpm': 90, 'setting2': 50, 'setting3': 10}
]

canvases.forEach((cnvs,index) => {
	let canvas = document.createElement('canvas')
	let canvasNum = index + 1
	let ctx = canvas.getContext('2d')
	canvas.setAttribute('height', canvasHeight + 'px')
	canvas.setAttribute('width', canvasWidth + 'px')
	canvas.setAttribute('id', 'diff' + canvasNum)
	ctx.font = '4em Arial'
	ctx.fillStyle = '#FF0000'
	ctx.fillText('Test' + canvasNum, 35, 35)
	diffs.appendChild(canvas)
})
