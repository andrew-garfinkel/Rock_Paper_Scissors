
const playerPoints = document.getElementById('player-score')
const computerPoints = document.getElementById('computer-score')
const rock = document.querySelector('.option')




let playerScore = 0
let computerScore = 0
let playerChoices = []
let computerChoices = []




// computer
const options = ['rock', 'paper', 'scissor']
function computerPick(array) {
  // computer picks random element from options array
  let result = array[Math.floor(Math.random() * array.length)]
  computerChoices.push(result)
  return result
}


// player
function playerPick() {
  // player types a string into the prompt by browser
  // let result = prompt('Enter your move: rock, paper, or scissor').toLowerCase()
  // if(options.includes(result)) {playerChoices.push(result)}
  // return result

  // return 'rock'
}

rock.addEventListener('click', playerPick)





// gameplay
function playRound(playerPick, computerPick) {
  if(!options.includes(playerPick)) {return}
  if (playerPick === computerPick) {
    console.log('draw!')
    return
  }
  givePoints(playerPick, computerPick)
}

function givePoints(playerPick, computerPick) {
  let rockWins = (playerPick === 'rock') ? (playerPick === 'rock' && computerPick === 'scissor') : false
  let paperWins = (playerPick === 'paper') ?  (playerPick === 'paper' && computerPick === 'rock') : false
  let scissorWins = (playerPick === 'scissor') ? (playerPick === 'scissor' && computerPick === 'paper') : false
  let booleans = [rockWins, paperWins, scissorWins]
  if ((booleans.filter(boolean => boolean === true)).length === 1) {
    playerScore++
    console.log(playerScore)
    playerPoints.textContent = playerScore
  } else {
    computerScore++
    console.log(computerScore)
    computerPoints.textContent = computerScore
  }
}

function game() {

  while (playerScore < 3 && computerScore < 3) {
    playRound(playerPick(), computerPick(options))
  }
  if (playerScore > computerScore) {
    console.log(`Player wins by a score of ${playerScore} to ${computerScore}`)
  } else {
    console.log(`Computer wins by a score of${computerScore} to ${playerScore}`)
  }

  console.log(`Player picked ${playerChoices}. Computer picked ${computerChoices}`)
}


game()