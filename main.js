

const playerPoints = document.getElementById('player-score')
const computerPoints = document.getElementById('computer-score')

const buttons = document.querySelectorAll('button')
const summary = document.getElementById('summary')
const summary2 = document.getElementById('summary2')
const tableContainer = document.querySelector('.table-container')
const images = document.querySelectorAll('img')


const mainContent = document.getElementById('main-content')
const desc3 = document.getElementById('desc3')
const endAlert = document.getElementById('end-alert')
const endDesc = document.getElementById('end-desc')
const retryBtn = document.getElementById('retry-btn')

let playerScore = 0
let computerScore = 0
let playerChoices = []
let computerChoices = []




window.onload = beginningAninmation()















function beginningAninmation() {
  fadeParagraphIn()
  // the looping thing did not work
  // dont get too caught up on something
  const desc1 = document.getElementById('desc1')
  const desc2 = document.getElementById('desc2')
  const desc3 = document.getElementById('desc3')
  let spans = Array.from(desc1.querySelectorAll('span'))
  spans[spans.length - 1].ontransitionend = () => {
    desc1.classList.add('fade-out')
    desc1.addEventListener('animationend', () => {
      desc1.classList.remove('animate')
      desc1.classList.add('disappear')
      desc2.classList.add('animate')
      desc2.classList.remove('disappear')
      // call fadeParagraphIn on next paragraph
      fadeParagraphIn()

      let spans = Array.from(desc2.querySelectorAll('span'))
      spans[spans.length - 1].ontransitionend = () => {
        desc2.classList.add('fade-out')
        desc2.addEventListener('animationend', () => {
          console.log('animation has ended!!')
          desc2.classList.remove('animate')
          desc2.classList.add('disappear')
          desc3.classList.add('animate')
          desc3.classList.remove('disappear')
          fadeParagraphIn()

          let spans = Array.from(desc3.querySelectorAll('span'))
          spans[spans.length - 1].ontransitionend = () => {
            desc3.classList.add('fade-out')
            desc3.addEventListener('animationend', () => {

              const cta = document.getElementById('cta')
              cta.classList.add('drop-down')
              cta.addEventListener('animationend', () => {
                const gameCtn = document.getElementById('game-container')

                setTimeout(() => {
                  gameCtn.classList.add('fade-in')
                }, 300)
              })
            })
          }
        })
      }
    })
  }
}



function fadeParagraphIn() {
  // grabbing the text of whatever is currently supposed to be animated
  let text = document.querySelector('.animate')
  console.log(text.textContent)
  let strText = text.textContent.split('')
  text.textContent = ''
  // recreating the text into a bunch of spans
  for (let i = 0; i < strText.length; i++){
    text.innerHTML += `<span>${strText[i]}</span>`;
  }
  let char = 0
  let timer = setInterval(onTick, 50)
  // making each individual span appear
  function onTick() {
    let currentSpan = text.querySelectorAll('span')[char]
    currentSpan.classList.add('show-span')
    char++
    // if we reach the last character
    if (char === strText.length) {
      clearInterval(timer)
      timer = null
      return
    }
  }
}


















































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
          
          updateSummary2(playerSelection, computerSelection)
          playRound(playerSelection, computerSelection)

        if (playerScore === 3 || computerScore === 3)
        {
        
          // setInterval so we can see score
          // declareWinner()
          
          setTimeout(() => {
            declareWinner()
          }, 1800);
        // makeScoresTable(playerChoices, computerChoices)
          
        // if (playerScore > computerScore) {
        // summary2.textContent = `Congrats!!! You win`
        // } else {
        // summary2.textContent = `The computer wins this round`
        // }
        }
        

      }
    )
        
} )
      



    

  











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



function declareWinner()
{
  replaceContent()

  fadeParagraphIn()

  let spans = Array.from(endDesc.querySelectorAll('span'))
  spans[spans.length - 1].ontransitionend = () =>
  {
    retryBtn.classList.add('fade-in');
    makeScoresTable(playerChoices, computerChoices)
  }
}



function replaceContent()
{
  mainContent.classList.add('disappear')
  endAlert.classList.remove('disappear')
  desc3.classList.remove('animate')
  endDesc.classList.add('animate')
  // fadeParagraphIn()

  retryBtn.addEventListener('click', () =>
  {
    console.log('click')
  })
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

  tableContainer.appendChild(table)
}













