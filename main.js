

const playerPoints = document.getElementById('player-score')
const computerPoints = document.getElementById('computer-score')

const buttons = document.querySelectorAll('button')
const summary = document.getElementById('summary')
const summary2 = document.getElementById('summary2')
const container = document.querySelector('.container')
const images = document.querySelectorAll('img')



let playerScore = 0
let computerScore = 0
let playerChoices = []
let computerChoices = []






// computer
const options = ['rock', 'paper', 'scissor']

function computerPick(array) {
  let result = array[Math.floor(Math.random() * array.length)]
  computerChoices.push(result)
  return result
}

function updateSummary2(playerChoice, computerChoice) {
    if ((playerChoice === 'rock' && computerChoice === 'paper') || (computerChoice === 'rock' && playerChoice === 'paper') ) {
      summary2.textContent = 'paper always covers rock!'
    }
  
    if ((playerChoice === 'scissor' && computerChoice === 'paper') || (computerChoice === 'scissor' && playerChoice === 'paper') ) {
      summary2.textContent = 'scissor cuts paper!!'
    }
  
   if ((playerChoice === 'rock' && computerChoice === 'scissor') || (computerChoice === 'rock' && playerChoice === 'scissor') ) {
      summary2.textContent = 'rock smashes scissor!!'
   }
  
  if (playerChoice === computerChoice) {
    summary2.textContent = `This round is a draw`
  }

}


function fadeOutOtherImages(images, selectedImageIdx) {
  for (let i = 0; i < images.length; i++){
    
    if (i === selectedImageIdx)
    {
      images[i].parentElement.classList.add('pic-selected')
    }
    if (i != selectedImageIdx) {
      images[i].parentElement.classList.add('pic-fade-out')
    }
    images[i].parentElement.classList.add('no-pointers')
  }
}






     images.forEach((image , imageIdx) => {
      image.addEventListener('click', () => {
        
        fadeOutOtherImages(images, imageIdx)
        let nextImg = images[(imageIdx + 1) % (images.length)] 
        // listening for animation end of the adjacent element
        nextImg.parentElement.onanimationend = () =>
        {
          console.log('anim ended')
          for (let i = 0; i < images.length; i++)
          {
            images[i].parentElement.classList.remove('pic-selected')
            images[i].parentElement.classList.remove('pic-fade-out')
            images[i].parentElement.classList.remove('no-pointers')
          }
        }
          let playerSelection = image.dataset.label
          playerChoices.push(playerSelection)
          let computerSelection = computerPick(options)
          summary.textContent = `You chose ${playerSelection}`
          console.log('clicked')
          updateSummary2(playerSelection, computerSelection)
          playRound(playerSelection, computerSelection)

        if (playerScore === 3 || computerScore === 3) {
        makeScoresTable(playerChoices, computerChoices)
        if (playerScore > computerScore) {
        summary2.textContent = `Congrats!!! You win`
        } else {
        summary2.textContent = `The computer wins this round`
        }
    }
      })
        
})
      



    

  





// images.forEach((image , imageIdx) => {
//   image.addEventListener('click', () => {
//     console.log(imageIdx)
//     // image.parentElement.classList.add('pic-fade-out')
//     fadeOutOtherImages(images, imageIdx)
//     let playerSelection = image.dataset.label
//     playerChoices.push(playerSelection)
//     let computerSelection = computerPick(options)
//     summary.textContent = `You chose ${playerSelection}...the computer chose ${computerSelection}`
//     console.log('clicked')
//     updateSummary2(playerSelection, computerSelection)
//     playRound(playerSelection, computerSelection)

//     if (playerScore === 3 || computerScore === 3) {
//       makeScoresTable(playerChoices, computerChoices)
//       if (playerScore > computerScore) {
//         summary2.textContent = `Congrats!!! You win`
//       } else {
//         summary2.textContent = `The computer wins this round`
//       }
//     }

//   })
// })






// gameplay
function playRound(playerPick, computerPick) {
  if (playerPick === computerPick) {
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

function announceWinner() {
  if (computerScore > playerScore) {
    summary2.textContent = `Computer won by a score of ${computerScore} to ${playerScore}`
  } 
  else {
    summary2.textContent = `Player won by a score of ${playerScore} to ${computerScore}`
  }

  console.table(playerChoices)
  console.table(computerChoices)
}






















// make scores table!

function makeScoresTable(playerChoices, computerChoices) {
  const table = document.createElement('table')
  table.innerHTML += `
  <tr>
    <th>Round</th>
    <th>Player Move</th>
    <th>Computer Move</th>
  </tr>
  `

  let playerScore = 0
  let computerScore = 0

  for (let i = 0; i < playerChoices.length; i++){
    
    // player wins
    if (playerChoices[i] === 'rock' && computerChoices[i] === 'scissor') {
      playerScore++
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td style="color: green"><b>${playerChoices[i]}</b></td>
        <td>${computerChoices[i]}</td>
      </tr>
      `
    }

    if (playerChoices[i] === 'scissor' && computerChoices[i] === 'paper') {
      playerScore++
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td style="color: green"><b>${playerChoices[i]}</b></td>
        <td>${computerChoices[i]}</td>
        </tr>
      `
    }

     if (playerChoices[i] === 'paper' && computerChoices[i] === 'rock') {
       playerScore++
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td style="color: green"><b>${playerChoices[i]}</b></td>
        <td>${computerChoices[i]}</td>
        </tr>
      `
     }
    
    // end player wins

    // computer wins
    
     if (computerChoices[i] === 'rock' && playerChoices[i] === 'scissor') {
       computerScore++
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td> ${playerChoices[i]}</td>
        <td style="color: red"><b>${computerChoices[i]}</b></td>
        </tr>
      `
    }

    if (computerChoices[i] === 'scissor' && playerChoices[i] === 'paper') {
      computerScore++
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${playerChoices[i]}</td>
        <td style="color: red"><b>${computerChoices[i]}</b></td>
        </tr>
      `
    }

     if (computerChoices[i] === 'paper' && playerChoices[i] === 'rock') {
       computerScore++
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${playerChoices[i]}</td>
        <td style="color: red"><b>${computerChoices[i]}</b></td>
        </tr>
      `
     }
    
    if (computerChoices[i] === playerChoices[i]) {
      table.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${playerChoices[i]}</td>
        <td>${computerChoices[i]}</td>
      </tr>
      
      `
    }
    // end computer wins
  }

  table.innerHTML += `
  <tr>
    <td><b>Total Points</td>
    <td><b>${playerScore}</b></td>
    <td><b>${computerScore}</b></td>
  </tr>
  `

  container.appendChild(table)
}













