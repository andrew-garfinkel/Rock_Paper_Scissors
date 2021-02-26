

let playerScore = 0
let computerScore = 0






// computer

// const options = ['rock', 'paper', 'scissor']
// const options = ['scissor']
const options = ['paper']

function computerPick(array) {
  let result = array[Math.floor(Math.random() * array.length)]
  return result
}

// let computerSelection = computerPick(options)
// console.log(computerSelection)
// console.log(computerPick(options))
// console.log(computerPick(options))
// console.log(computerPick(options))






// player

function playerPick() {
  let result = prompt('Enter your move: rock, paper, or scissor').toLowerCase()
  return result
}

// console.log(typeof(playerPick()))
// console.log(playerPick())
// console.log(playerPick())
// let playerSelection = playerPick()
// let playerSelection = prompt('Enter your move: rock, paper, or scissor').toLowerCase()






// should take in strings


function playRound(playerPick, computerPick) {
  if (playerPick === computerPick) {
    console.log('draw!')
    return
  }

  // playerGetsPoint(playerPick, computerPick)
  // computerGetsPoint(playerPick, computerPick)
  givePoints(playerPick, computerPick)
}



// function playerGetsPoint(playerPick, computerPick) {
//   let rockWins = playerPick === 'rock' && computerPick === 'scissor'
//   let paperWins = playerPick === 'paper' && computerPick === 'rock'
//   let scissorWins = playerPick === 'scissor' && computerPick === 'paper'
//   let playerOnePoints = [rockWins, paperWins, scissorWins]
//   console.table(playerOnePoints)
//   if (playerOnePoints.filter(boolean => boolean === true).length === 1) {
//     playerScore++
//     console.log(`${playerScore}, player 1 has scored`)
//   }
// }

// maybe ternary operators

// function computerGetsPoint(playerPick, computerPick) {
//   let rockWins = computerPick === 'rock' && playerPick === 'scissor'
//   let paperWins = computerPick === 'paper' && playerPick === 'rock'
//   let scissorWins = computerPick === 'scissor' && playerPick === 'paper'
//   let computerPoints = [rockWins, paperWins, scissorWins]
//   console.table(playerOnePoints)
//   if (computerPoints.filter(boolean => boolean === true).length === 1) {
//     computerScore++
//     console.log(`${computerScore}, computer has scored`)
//   }
// }


function givePoints(playerPick, computerPick) {
  let rockWins = (playerPick === 'rock') ? (playerPick === 'rock' && computerPick === 'scissor') : false
  let paperWins = (playerPick === 'paper') ?  (playerPick === 'paper' && computerPick === 'rock') : false
  let scissorWins = (playerPick === 'scissor') ? (playerPick === 'scissor' && computerPick === 'paper') : false
  let booleans = [rockWins, paperWins, scissorWins]
  if ((booleans.filter(boolean => boolean === true)).length === 1) {
    playerScore++
    console.log(`${playerScore} is playerScore`)
  } else {
    computerScore++
    console.log(`${computerScore} is computerScore`)
  }
}










playRound(playerPick(), computerPick(options))
// playRound(playerPick(), computerPick(options))
// playRound(playerPick(), computerPick(options))