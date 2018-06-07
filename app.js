// MODAL RULES WINDOW

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('clickRules');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function() { //Anonymous function, that works only inside btn-roll brackets
	if(gamePlaying) {
		// 1. Random number
		var dice1 = Math.floor(Math.random() * 6) +1;
		var dice2 = Math.floor(Math.random() * 6) +1;
		
		// 2. Display the result
		document.getElementById('dice-1').style.display = 'block';
		document.getElementById('dice-2').style.display = 'block';
		document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
		document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
		
		// 3. Update the round score if the rolled number was not a 1
		if (dice1 !== 1 && dice2 !== 1) {
			//Add score
			roundScore += dice1 + dice2;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying) {
		// 1. Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;
			
		// 2. Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		var input = document.querySelector('.final-score').value;
		var winningScore;
		
		// Undefined, 0, null or "" are coerced to false, anything else - to true
		if(input) {
			winningScore = input;
		} else {
			winningScore = 100;
		}
		
		// 3. Check if player won the game
		if (scores[activePlayer] >= winningScore) {
			document.querySelector('#name-' + activePlayer).textContent = 'Laimėtojas!';
			hideDice();
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

/***********************/
/*      FUNCTIONS      */
/***********************/

// Initial declaration function

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	hideDice();
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('#name-0').textContent = 'Žaidėjas 1';
	document.querySelector('#name-1').textContent = 'Žaidėjas 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}

// Next player function

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
	roundScore = 0;
		
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	hideDice();
}

// Hide the dice function

function hideDice() {
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}






