const WIDTH = 10,
  BOARD_SIZE = 100,
  SQUARES = [], // Aquí guardamos todos los divs de cada uno de los SQUARES
  BOMB_AMOUNT = 20


const gameContainer = document.querySelector('.game-container')

function createBoard() {
  //Generamos bombas de forma aleatoria
  const bombsArr = Array(BOMB_AMOUNT).fill(true)
  const noBombsArr = Array(BOARD_SIZE - BOMB_AMOUNT).fill(false)
  console.log(bombsArr)
  console.log(noBombsArr)
  const gameArr = [...noBombsArr, ...bombsArr]
  console.log(gameArr)

  for(let i = 0; i < BOARD_SIZE; i++) {
    const cuadrado = document.createElement('div')
    cuadrado.setAttribute('id', i)
    gameContainer.appendChild(cuadrado)
    SQUARES.push(cuadrado)
  }
}

createBoard()