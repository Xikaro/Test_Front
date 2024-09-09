// Экран старта
const startScreen = document.querySelector('.start-screen');
const startButton = document.querySelector('.start-button');

// Экран ввода имён игроков
const playerNamesScreen = document.querySelector('.player-names-screen');
const player1NameInput = document.getElementById('player1-name');
const player2NameInput = document.getElementById('player2-name');
const startGameButton = document.querySelector('.start-game-button');

// Экран игры
const gameScreen = document.querySelector('.game-screen');
const gameField = document.querySelector('.game-field');
const currentPlayer = document.getElementById('current-player');

// Экран окончания игры 
const endScreen = document.querySelector('.end-screen');
const endScreenButton = document.getElementById('start-new-game-button');

// Экран просмотра результатов
const resultScreen = document.querySelector('.result-screen');
const resultScreenButton = document.getElementById('view-result-button');
const resultPopup = document.getElementById('result-popup');
const resultPopupOverlay = document.getElementById('result-popup-overlay');
const resultPopupButton = document.getElementById('close-popup-button');

// Массив игроков
let players = [];

// Добавить слушатели событий
startButton.addEventListener('click', startGame);
startGameButton.addEventListener('click', startGameAfterPlayerNames);
gameField.addEventListener('click', playerMove);
resultScreenButton.addEventListener('click', showResults);
resultPopupButton.addEventListener('click', hideResults);

// Функция начала игры
function startGame() {

  // Скрыть экран старта
  startScreen.style.display = 'none';

  player1NameInput.value = '';
  player2NameInput.value = '';
  // Показать экран ввода имён игроков 
  playerNamesScreen.style.display = 'flex';
  
  
}

// Функция начала игры после ввода имён игроков
function startGameAfterPlayerNames() {
  
  const player1Name = player1NameInput.value.trim();
  const player2Name = player2NameInput.value.trim();

  if (player1Name === '' || player2Name === '') {
    alert('Пожалуйста, введите имена обоих игроков!');
    return;
  }
  
  // Скрыть экран ввода имён игроков 
  playerNamesScreen.style.display = 'none'; 

  // Показать экран игры
  gameScreen.style.display = 'flex';

  // Создать игроков 
  const player1 = {
    name: player1Name,
    figure: 'X',
  };
  const player2 = {
    name: player2Name,
    figure: 'O',
  };

  // Добавить игроков в массив
  players.push(player1, player2);

  // Выбрать случайного первого игрока
  const firstPlayer = players[Math.floor(Math.random() * 2)];

  // Показать информацию о первом игроке
  currentPlayer.textContent = `Ходит Игрок ${firstPlayer.name} (${firstPlayer.figure})`;

  const cells = gameField.children;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].addEventListener('click', playerMove);
  }
}

// Функция хода игрока
function playerMove(event) {
  // Получить ячейку, на которую нажали
  const cell = event.target;

  // Проверить, является ли ячейка пустой
  if (cell.textContent === '') {

    // Показать фигуру игрока в ячейке
    cell.textContent = players[0].figure;

    // Проверить, выиграл игрок
    const winner = checkWinner();
    if (winner != null) {
      showEndScreen(winner);
      saveResult(winner, new Date().toLocaleTimeString(),
          new Date().toLocaleDateString());
      return;
    }

    // Сменить игроков
    players.reverse();

    // Показать информацию о следующем игроке
    currentPlayer.textContent = `Ходит Игрок ${players[0].name} (${players[0].figure})`;
  }
}

// Функция проверки победы
function checkWinner() {
  const cells = gameField.querySelectorAll('.cell');
  const playerFigure = players[0].figure;

  // Проверить горизонтальные линии
  for (let i = 0; i < 3; i++) {
    const row = [cells[i * 3], cells[i * 3 + 1], cells[i * 3 + 2]];
    if (row[0].textContent === playerFigure
        && row[1].textContent === playerFigure
        && row[2].textContent === playerFigure) {
      return players[0];
    }
  }
  // Проверить вертикальные линии
  for (let i = 0; i < 3; i++) {
    const column = [cells[i], cells[i + 3], cells[i + 6]];
    if (column[0].textContent === playerFigure
        && column[1].textContent === playerFigure
        && column[2].textContent === playerFigure) {
      return players[0];
    }
  }
  // Проверить диагональные линии
  if (cells[0].textContent === playerFigure
      && cells[4].textContent === playerFigure
      && cells[8].textContent === playerFigure) {
    return players[0];
  }
  if (cells[2].textContent === playerFigure
      && cells[4].textContent === playerFigure
      && cells[6].textContent === playerFigure) {
    return players[0];
  }
  // Проверить на ничью
  if (Array.from(cells).every(cell => cell.textContent !== '')) {
    return 'ничья';
  }
  // Если никто не выиграл и нет ничьей, вернуть null
  return null;
}

// Функция отображения экрана завершения 
function showEndScreen(winner) {

  // Скрыть экран экран игры 
  gameScreen.style.display = 'none';

  // Показать экран окончания игры
  endScreen.style.display = 'flex';

  const message = document.getElementById('winner-message');
  if (winner === players[0]) {
    message.textContent = 'Победитель: Игрок ' + players[0].name;
  } else if (winner === players[1]) {
    message.textContent = 'Победитель: Игрок ' + players[1].name;
  } else {
    message.textContent = 'Ничья';
  }

  endScreenButton.addEventListener('click', () => {
    // Скрыть экран окончания игры
    endScreen.style.display = 'none';
    startGame();
  });
}

function saveResult(winner, time, date) {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  results.push({winner: winner.name, time: time, date: date});
  localStorage.setItem('results', JSON.stringify(results));
}

function showResults() {
  const results = JSON.parse(localStorage.getItem('results')) || [];
  const resultsTableBody = document.getElementById('result-table-body');
  resultsTableBody.innerHTML = ''; // Очистить содержимое таблицы

  results.forEach(result => {
    const row = resultsTableBody.insertRow();
    const winnerCell = row.insertCell();
    winnerCell.textContent = result.winner;
    const timeCell = row.insertCell();
    timeCell.textContent = result.time;
    const dateCell = row.insertCell();
    dateCell.textContent = result.date;
  });

  resultPopup.style.display = 'block';
  resultPopupOverlay.style.display = 'block';
}

function hideResults() {
  resultPopup.style.display = 'none';
  resultPopupOverlay.style.display = 'none';
}

if (JSON.parse(localStorage.getItem('results'))) {
  resultScreen.style.display = 'block';
} else {
  resultScreen.style.display = 'none';
}

