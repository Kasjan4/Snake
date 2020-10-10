//! Settings
const settings = document.querySelector('.settings')
const keys = document.querySelector('#keys')
const normal = document.querySelector('.normal')
const fast = document.querySelector('.fast')
const rapid = document.querySelector('.rapid')
const godlike = document.querySelector('.godlike')

// ! Leaderboard
let first = document.querySelector('#first')
let second = document.querySelector('#second')
let third = document.querySelector('#third')
let fourth = document.querySelector('#fourth')
let fifth = document.querySelector('#fifth')

first.innerHTML = localStorage.getItem('first')
second.innerHTML = localStorage.getItem('second')
third.innerHTML = localStorage.getItem('third')
fourth.innerHTML = localStorage.getItem('fourth')
fifth.innerHTML = localStorage.getItem('fifth')

// ! Space bar div
const instr = document.querySelector('.instr')


// ! Game variables
const game = document.querySelector('.game')
let score = document.querySelector('#score')

const width = 20

let scoreTotal = 0

let speed = 100


// ! The snake
let snake = [210, 230, 250]

// ! The field
const cells = []


// ! Creating the game field
for (let i = 0; i < width ** 2; i++) {
  // Create an element
  const div = document.createElement('div')
  div.classList.add('cell')
  game.appendChild(div)
  // div.innerHTML = i
  // Push the div to my array of cells
  cells.push(div)
}

// ! Assign the snake to the field
snake.forEach((body) => {
  cells[body].classList.add('snake')
})


// ! Creating a new frame each time the interval is played
function newFrame() {

  for (var i = 0; i < cells.length; i++) {
    cells[i].classList.remove('snake')
  }

  snake.forEach((body) => {
    cells[body].classList.add('snake')

  })
}

// ! Snake direction
let direction = 'up'


// ! Function to check for spacebar input
function toggleStartEvent(event) {
  
  if (event.key === ' ') {

    snake = [210, 230, 250]
    scoreTotal = 0
    score.innerHTML = scoreTotal
    direction = 'up'
    stopRareFoodInterval = false
    instr.style.visibility = 'hidden'
    settings.style.visibility = 'hidden'
    keys.style.visibility = 'hidden'
    startGame()
  }
}


// ! Add an event listener to window
window.addEventListener('keypress', toggleStartEvent)



// ! Starting the game
function startGame() {

  window.removeEventListener('keypress', toggleStartEvent)
  cells[randomFood].classList.add('food')
  const interval = setInterval(() => {

    if (direction === 'right' && (snake[0] % width !== width - 1)) {
      snake.unshift(snake[0] + 1)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'right' && (snake[0] % width === width - 1)) {
      snake.unshift(snake[0] - 19)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'up' && snake[0] > width) {
      snake.unshift(snake[0] - width)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'up' && snake[0] < width) {
      snake.unshift(snake[0] + 380)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'down' && snake[0] < 380) {
      snake.unshift(snake[0] + width)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'down' && snake[0] > 379) {
      snake.unshift(snake[0] - 380)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'left' && snake[0] % width !== 0) {
      snake.unshift(snake[0] - 1)
      snake.pop()
      newFrame()
      contact()

    } else if (direction === 'left' && snake[0] % width === 0) {
      snake.unshift(snake[0] + 19)
      snake.pop()
      newFrame()
      contact()

    }



    // ! Checks snake for contact
    function contact() {
      for (i = 0; i < snake.length; i++) {
        if (snake.indexOf(snake[i]) !== snake.lastIndexOf(snake[i])) {
          stopRareFoodInterval = true
          clearInterval(interval)

          
          for (var i = 0; i < cells.length; i++) {
            cells[i].classList.remove('snake', 'food', 'rare')
          }

          const gameover = [101, 102, 103, 104, 121, 141, 161, 181, 182,
            183, 184, 164, 144, 143, 186, 166, 146, 126, 107, 108, 129,
            149, 169, 189, 147, 148, 191, 171, 151, 131, 133, 111, 132,
            114, 134, 154, 174, 194, 196, 176, 156, 136, 116, 117, 118,
            157, 158, 197, 198, 221, 241, 261, 281, 301, 222, 223, 224,
            244, 264, 284, 304, 303, 302, 226, 246, 229, 249, 269, 266,
            287, 288, 231, 251, 271, 291, 311, 232, 233, 272, 273, 307,
            308, 312, 313, 236, 237, 238, 237, 238, 277, 278, 318, 235,
            255, 275, 295, 315, 258, 276, 297]

          gameover.forEach((over) => {
            cells[over].classList.add('snake')
          })

          checkLeaderboard()
          instr.style.visibility = 'visible'
          window.addEventListener('keypress', toggleStartEvent)
          settings.style.visibility = 'visible'
          keys.style.visibility = 'visible'


        }
      }


      //! The food logic
      if (snake[0] === randomFood) {

        cells[randomFood].classList.remove('food')
        // add points
        scoreTotal += 1
        score.innerHTML = scoreTotal

        // make snake bigger
        snake.push(snake[0])


        // run code to generate more
        generateFood()

      } if (snake[0] === randomRareFood) {

        cells[randomRareFood].classList.remove('rare')
        // add points
        scoreTotal += 5
        score.innerHTML = scoreTotal

        // make snake bigger
        snake.push(snake[0])







      }
    }
  }, speed)

}



// ! Adding the food at the start of the game
let randomFood = Math.floor(Math.random() * (width ** 2))
cells[randomFood].classList.add('food')

// ! Food generator if snakes eats the food on the field, wont generate in the snake.
function generateFood() {

  randomFood = Math.floor(Math.random() * (width ** 2))

  if (snake.includes(randomFood)) {
    generateFood()
  } else {
    cells[randomFood].classList.add('food')
  }
}



// ! Rare food generator if snakes eats the food on the field, wont generate in the snake.

let stopRareFoodInterval = false

generateRareFood()

let randomRareFood = Math.floor(Math.random() * (width ** 2))

function generateRareFood() {

  const rareFoodInterval = setInterval(() => {

    randomRareFood = Math.floor(Math.random() * (width ** 2))

    if (snake.includes(randomRareFood)) {
      clearInterval(rareFoodInterval)
      generateRareFood()
    } else {
      cells[randomRareFood].classList.add('rare')
    }

    setTimeout(() => {

      cells[randomRareFood].classList.remove('rare')

    }, 3000)

    if (stopRareFoodInterval) {

      clearInterval(rareFoodInterval)

    }

  }, 10000)
}


// ! Listeners on the arrows, changes the direction
document.addEventListener('keydown', (event) => {
  const key = event.key

  if (key === 'ArrowUp') {
    direction = 'up'
  } else if (key === 'ArrowDown') {
    direction = 'down'
  } else if (key === 'ArrowLeft') {
    direction = 'left'
  } else if (key === 'ArrowRight') {
    direction = 'right'
  }

})

// ! Listeners on the settings 
normal.classList.add('activeSpeed')

normal.addEventListener('click', () => {
  speed = 100
  normal.classList.add('activeSpeed')
  fast.classList.remove('activeSpeed')
  rapid.classList.remove('activeSpeed')
  godlike.classList.remove('activeSpeed')
})

fast.addEventListener('click', () => {
  speed = 70
  fast.classList.add('activeSpeed')
  normal.classList.remove('activeSpeed')
  rapid.classList.remove('activeSpeed')
  godlike.classList.remove('activeSpeed')
})

rapid.addEventListener('click', () => {
  speed = 50
  rapid.classList.add('activeSpeed')
  normal.classList.remove('activeSpeed')
  fast.classList.remove('activeSpeed')
  godlike.classList.remove('activeSpeed')
})

godlike.addEventListener('click', () => {
  speed = 20
  godlike.classList.add('activeSpeed')
  normal.classList.remove('activeSpeed')
  fast.classList.remove('activeSpeed')
  rapid.classList.remove('activeSpeed')
})



function checkLeaderboard() {
  let checkHighScore = scoreTotal

  if (checkHighScore < localStorage.getItem('fourth') && checkHighScore > localStorage.getItem('fifth')) {

    localStorage.setItem('fifth', scoreTotal)
    fifth.innerHTML = scoreTotal

  } else if (checkHighScore < localStorage.getItem('first')
    && checkHighScore < localStorage.getItem('second')
    && checkHighScore < localStorage.getItem('third')
    && checkHighScore > localStorage.getItem('fifth')) {

    localStorage.setItem('fourth', scoreTotal)
    fourth.innerHTML = scoreTotal

  } else if (checkHighScore < localStorage.getItem('first')
    && checkHighScore < localStorage.getItem('second')
    && checkHighScore > localStorage.getItem('fourth')
    && checkHighScore > localStorage.getItem('fifth')) {

    localStorage.setItem('third', scoreTotal)
    third.innerHTML = scoreTotal

  } else if (checkHighScore < localStorage.getItem('first')
    && checkHighScore > localStorage.getItem('third')
    && checkHighScore > localStorage.getItem('fourth')
    && checkHighScore > localStorage.getItem('fifth')) {

    localStorage.setItem('second', scoreTotal)
    second.innerHTML = scoreTotal

  } else if (checkHighScore > localStorage.getItem('second')
    && checkHighScore > localStorage.getItem('third')
    && checkHighScore > localStorage.getItem('fourth')
    && checkHighScore > localStorage.getItem('fifth')) {

    localStorage.setItem('first', scoreTotal)
    
    first.innerHTML = scoreTotal

  }

}



