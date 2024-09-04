// Экран старта
const startScreen = document.querySelector('.start-screen');
const startButton = document.querySelector('.start-button');

// Экран ввода имён игроков
const playerNamesScreen = document.querySelector('.player-names-screen');
const player1NameInput = document.querySelector('#player1-name');
const player2NameInput = document.querySelector('#player2-name');
const startGameButton = document.querySelector('.start-game-button');

// Экран игры
const gameScreen = document.querySelector('.game-screen');
const gameField = document.querySelector('.game-field');

const gameInfo = document.querySelector('.game-info');
const currentPlayer = document.querySelector('#current-player');
const currentFigure = document.querySelector('#current-figure');

// Экран окончания игры 
const gameOverScreen = document.querySelector('.game-over-screen');

// Экран просмотра результатов
const resultScreen = document.querySelector('.result-screen');

// Массив игроков
let players = [];

// Массив результатов игр
let gameResults = [];

// Добавить слушатели событий
startButton.addEventListener('click', startGame);
startGameButton.addEventListener('click', startGameAfterPlayerNames);
gameField.addEventListener('click', playerMove);  

// Функция начала игры
function startGame() {
  // Скрыть экран старта
  startScreen.style.display = 'none';

  // Показать экран ввода имён игроков 
  playerNamesScreen.style.display = 'flex';
}

// Функция начала игры после ввода имён игроков
function startGameAfterPlayerNames() {
  // Скрыть экран ввода имён игроков
  playerNamesScreen.style.display = 'none';

  // Показать экран игры
  gameScreen.style.display = 'flex';

  // Создать игроков 
  const player1 = {
    name: player1NameInput.value,
    figure: 'X',
  };
  const player2 = {
    name: player2NameInput.value,
    figure: 'O',
  };

  // Добавить игроков в массив
  players.push(player1, player2);

  // Выбрать случайного первого игрока
  const firstPlayer = players[Math.floor(Math.random() * 2)];

  // Показать информацию о первом игроке
  currentPlayer.textContent = `Ходит ${firstPlayer.name}`;
  currentFigure.textContent = `Фигурой ${firstPlayer.figure}`; 

  // Сбросить игровое поле
  gameField.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', playerMove);
      row.appendChild(cell);
    }
    gameField.appendChild(row);
  }
}

//
// // Функция хода игрока
// function playerMove(event) {
//   // Получить ячейку, на которую нажали
//   const cell = event.target;
//
//   // Проверить, является ли ячейка пустой
//   if (cell.textContent === '') {
//     // Показать фигуру игрока в ячейке
//     cell.textContent = players[0].figure;
//
//     // Проверить, выиграл игрок
//     const winner = checkWinner();
//     if (winner) {
//       showEndScreen(winner);
//       return;
//     }
//
//     // Сменить игроков
//     players.reverse();
//
//     // Показать информацию о следующем игроке
//     currentPlayer.textContent = `Ходит ${players[0].name} (${players[0].figure})`;
//   }
// }
//
// // Функция проверки победы
// function checkWinner() {
//   // Проверить горизонтальные линии
//   for (let i = 0; i < 3; i++) {
//     const row = gameField.children[i];
//     const figure = row.children[0].textContent;
//     if (figure && row.children[0].textContent === row.children[1].textContent
//         && row.children[1].textContent === row.children[2].textContent) {
//       return players[0];
//     }
//   }
//
//   // Проверить вертикальные линии
//   for (let i = 0; i < 3; i++) {
//     const figure = gameField.children[0].children[i].textContent;
//     if (figure && gameField.children[0].children[i].textContent
//         === gameField.children[1].children[i].textContent
//         && gameField.children[1].children[i].textContent
//         === gameField.children[2].children[i].textContent) {
//       return players[0];
//     }
//   }
//
//   // Проверить диагональные линии
//   const figure1 = gameField.children[0].children[0].textContent;
//   if (figure1 && gameField.children[0].children[0].textContent
//       === gameField.children[1].children[1].textContent
//       && gameField.children[1].children[1].textContent
//       === gameField.children[2].children[2].textContent) {
//     return players[0];
//   }
//
//   const figure2 = gameField.children[0].children[2].textContent;
//   if (figure2 && gameField.children[0].children[2].textContent
//       === gameField.children[1].children[1].textContent
//       && gameField.children[1].children[1].textContent
//       === gameField.children[2].children[0].textContent) {
//     return players[0];
//   }
//
//   // Если никто не выиграл, вернуть null
//   return null;
// }
//
// // Функция отображения экрана завершения
// function showEndScreen(winner) {
//   const endScreen = document.createElement('div');
//   endScreen.id = 'end-screen';
//
//   const header = document.createElement('h1');
//   header.textContent = 'Игра окончена';
//   endScreen.appendChild(header);
//
//   const message = document.createElement('p');
//   if (winner === players[0]) {
//     message.textContent = 'Победитель: ' + players[0];
//   } else if (winner === players[1]) {
//     message.textContent = 'Победитель: ' + players[1];
//   } else {
//     message.textContent = 'Ничья';
//   }
//   endScreen.appendChild(message);
//
//   const button = document.createElement('button');
//   button.textContent = 'Начать новую игру';
//   button.addEventListener('click', () => {
//     document.body.removeChild(endScreen);
//     startGame();
//   });
//   endScreen.appendChild(button);
//
//   document.body.appendChild(endScreen);
// }
