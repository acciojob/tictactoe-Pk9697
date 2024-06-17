//your JS code here. If required.
let boxesData=new Array(9).fill(null)
const gridBox=document.getElementById('grid-box')
const form=document.getElementById('form')
const playerTurnMessage=document.getElementById('message')
const board=document.getElementById('board')
const section1=document.getElementById('section-1')

let player1=null
let player2=null
let isPlayer1Turn=true;

board.style.display='none'

function renderBoxes() {
	gridBox.innerHTML=boxesData.map((box,idx)=>{
		return `
			<div class='box' onclick=markBox(${idx}) id=${idx+1}>
				${box ? box : ''}
			</div>
		`
	}).join(' ')
}
 
renderBoxes() 

function checkIfWon() {
	
}
 
function markBox(idx) {
	if(boxesData[idx]) return;
	console.log(`Box ${idx} clicked`)
	const markWith=isPlayer1Turn?'X':'O'
	boxesData=boxesData.map((box,i)=>(i===idx)?markWith:box)
	renderBoxes()
	checkIfWon()
	isPlayer1Turn=!isPlayer1Turn
	playerTurnMessage.innerText=`${isPlayer1Turn?player1:player2}, you're up`
}

form.addEventListener('submit',handleSubmit)

function handleSubmit(e) {
	e.preventDefault()
	console.log(`Submitted`)
	player1=document.getElementById('player-1').value
	player2=document.getElementById('player-2').value
	board.style.display='block'
	section1.style.display='none'
	playerTurnMessage.innerText=`${player1}, you're up`
}

