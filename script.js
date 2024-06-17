//your JS code here. If required.
let boxesData = new Array(9).fill(null)
const gridBox = document.getElementById('grid-box')
const form = document.getElementById('form')
const playerTurnMessage = document.getElementById('message')
const board = document.getElementById('board')
const section1 = document.getElementById('section-1')

let player1 = null 
let player2 = null
let isPlayer1Turn = true

// board.style.display = 'none'

function colorBoxes(colorIndexes) {
	gridBox.innerHTML = boxesData
		.map((box, idx) => {
			return `
			<div class='box ${colorIndexes.has(idx) ? 'active' : ''}' id=${idx + 1}>
				${box ? box : ''}
			</div>
		`
		})
		.join(' ')
}

function renderBoxes() {
	gridBox.innerHTML = boxesData
		.map((box, idx) => {
			return `
			<div class='box' onclick=markBox(${idx}) id=${idx + 1}>
				${box ? box : ''}
			</div>
		`
		})
		.join(' ')
}

renderBoxes()

function get2DCoordinates(idx) {
	return [parseInt(idx / 3), idx % 3]
}
function get1DCoordinates(x, y) {
	return x * 3 + y
}

function checkDiagonal1(idx) {
	const [x, y] = get2DCoordinates(idx)
	if (x != y) return false
	const checkWithMark = isPlayer1Turn ? 'X' : 'O'
	const colorIndexes = new Set()

	let i = 0,
		j = 0
	while (i < 3 && j < 3) {
		const boxIdx = get1DCoordinates(i, j)
		colorIndexes.add(boxIdx)
		if (!boxesData[boxIdx] || boxesData[boxIdx] !== checkWithMark) {
			return false
		}
		++i, ++j
	}

	colorBoxes(colorIndexes)
	return true
}
function checkDiagonal2(idx) {
	const [x, y] = get2DCoordinates(idx)
	if (x + y != 2) return false
	const checkWithMark = isPlayer1Turn ? 'X' : 'O'
	const colorIndexes = new Set()

	let i = 2,
		j = 0
	while (i >= 0 && j < 3) {
		const boxIdx = get1DCoordinates(i, j)
		colorIndexes.add(boxIdx)
		if (!boxesData[boxIdx] || boxesData[boxIdx] !== checkWithMark) {
			return false
		}
		--i, ++j
	}

	colorBoxes(colorIndexes)
	return true
}

function checkDiagonal(idx) {
	if (checkDiagonal1(idx) || checkDiagonal2(idx)) {
		return true
	}
	return false
}

function checkVertical(idx) {
	const [x, y] = get2DCoordinates(idx)
	const colorIndexes = new Set()

	let i = 0,
		j = y
	const checkWithMark = isPlayer1Turn ? 'X' : 'O'

	while (i < 3) {
		const boxIdx = get1DCoordinates(i, j)
		colorIndexes.add(boxIdx)
		if (!boxesData[boxIdx] || boxesData[boxIdx] !== checkWithMark) {
			return false
		}
		++i
	}
	colorBoxes(colorIndexes)
	return true
}
function checkHorizontal(idx) {
	const [x, y] = get2DCoordinates(idx)
	const colorIndexes = new Set()

	let i = x,
		j = 0
	const checkWithMark = isPlayer1Turn ? 'X' : 'O'

	while (j < 3) {
		const boxIdx = get1DCoordinates(i, j)
		colorIndexes.add(boxIdx)
		if (!boxesData[boxIdx] || boxesData[boxIdx] !== checkWithMark) {
			return false
		}
		++j
	}
	colorBoxes(colorIndexes)
	return true
}

function checkIfWon(idx) {
	if (checkDiagonal(idx)) {
		return true
	}
	if (checkVertical(idx)) {
		return true
	}
	if (checkHorizontal(idx)) {
		return true
	}

	return false
}

function markBox(idx) {
	if (boxesData[idx]) return
	console.log(`Box ${idx} clicked`)
	const markWith = isPlayer1Turn ? 'X' : 'O'
	boxesData = boxesData.map((box, i) => (i === idx ? markWith : box))
	renderBoxes()

	if (!checkIfWon(idx)) {
		isPlayer1Turn = !isPlayer1Turn
		playerTurnMessage.innerText = `${
			isPlayer1Turn ? player1 : player2
		}, you're up`
	} else {
		playerTurnMessage.innerText = `${
			isPlayer1Turn ? player1 : player2
		}, congratulations you won!`
	}
}

form.addEventListener('submit', handleSubmit)

function handleSubmit(e) {
	e.preventDefault()
	console.log(`Submitted`)
	player1 = document.getElementById('player1').value
	player2 = document.getElementById('player2').value
	// board.style.display = 'block'
	// section1.style.display = 'none'
	playerTurnMessage.innerText = `${player1}, you're up`
}
