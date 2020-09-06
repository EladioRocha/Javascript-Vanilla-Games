const WIDTH = 10,
  BOARD_SIZE = 100,
  SQUARES = [], // Aquí guardamos todos los divs de cada uno de los SQUARES
  BOMB_AMOUNT = 20

const gameContainer = document.querySelector('.game-container')

let activeGame = true

function createBoard() {
  // Generamos bombas de forma aleatoria
  const bombsArr = Array(BOMB_AMOUNT).fill(true)
  const noBombsArr = Array(BOARD_SIZE - BOMB_AMOUNT).fill(false)
  const gameArr = [...noBombsArr, ...bombsArr].sort(() => Math.random() - 0.50)

  for(let i = 0; i < BOARD_SIZE; i++) {
    const square = document.createElement('div')
    square.setAttribute('id', i)
    square.className = (gameArr[i]) ? 'bomb': ''
    gameContainer.appendChild(square) 
    SQUARES.push(square)

    square.addEventListener('click', handleCellClick)
  }

  // Agregamos los números que nos muestran la cantidad de bombas
  for(let i = 0; i < BOARD_SIZE; i++) {
    let total = 0
    const isInLeftSide = i % WIDTH === 0 // Esto nos ayuda a ver si esta en el principio del lado izquierdo. Por ejemplo: 0, 10, 20 etc.
    const isInRightSide = (i % WIDTH) === (WIDTH - 1) // Esta constante nos ayuda a ver si esta al final del lado derecho, ejemplo: 9, 19, 29 etc
    if(SQUARES[i].className === '') {
      if(i > 0 && !isInLeftSide && SQUARES[i - 1].classList.contains('bomb')) total++ // Izquierda
      if(i > 9 && !isInRightSide && SQUARES[i + 1 - WIDTH].classList.contains('bomb')) total++ // Esquina superior derecha
      if(i > 10 && SQUARES[i - WIDTH].classList.contains('bomb')) total++ // Arriba
      if(i > 11 && !isInLeftSide && SQUARES[i - 1 - WIDTH].classList.contains('bomb')) total++ // Esquina superior izquierda
      if(i < 98 && !isInRightSide && SQUARES[i + 1].classList.contains('bomb')) total++ // Derecha
      if(i < 90 && !isInLeftSide && SQUARES[i - 1 + WIDTH].classList.contains('bomb')) total++ // Esquina inferior izquierda
      if(i < 88 && !isInRightSide && SQUARES[i + 1 + WIDTH].classList.contains('bomb')) total++ // Esquina inferior derecha
      if(i < 89 && SQUARES[i + WIDTH].classList.contains('bomb')) total++ // Abajo
      SQUARES[i].setAttribute('data-total', total)
      console.log(SQUARES[i])
    }
  }
}

createBoard()

function handleCellClick(event) {
  const square = event.target
  if(!activeGame) return
  if(square.classList.contains('checked')) return
  if(square.classList.contains('bomb')) {
    alert('Ooops... hay una bomba justo ahí.')
    activeGame = false
  } else {
    let total = square.getAttribute('data-total')
    if(total != 0) {
      square.className = 'checked'
      square.innerText = total
    } else {
      square.className = 'checked'
    }
    console.log(total)
  }
}