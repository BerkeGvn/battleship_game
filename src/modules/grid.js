import { container } from './domElements';

function createGrid() {
  const playerMainDiv = document.createElement('div');
  const aiMainDiv = document.createElement('div');

  const player1Board = document.createElement('h1');
  player1Board.textContent = 'Your Board';
  player1Board.classList.add('grid-name');
  const player2Board = document.createElement('h1');
  player2Board.textContent = 'Enemey Board';
  player2Board.classList.add('grid-name');

  playerMainDiv.appendChild(player1Board);
  aiMainDiv.appendChild(player2Board);

  playerMainDiv.classList.add('player-grid-container');
  playerMainDiv.classList.add('grid-container');
  aiMainDiv.classList.add('ai-grid-container');
  aiMainDiv.classList.add('grid-container');
  aiMainDiv.classList.add('none');
  aiMainDiv.classList.add('invisible');
  for (let i = 0; i < 10; i += 1) {
    const row = document.createElement('div');
    row.setAttribute('id', i);
    row.classList.add(`row-${i}`);
    row.classList.add('row');

    const row2 = document.createElement('div');
    row2.setAttribute('id', i);
    row2.classList.add(`row-2-${i}`);
    row2.classList.add('row');

    for (let j = 0; j < 10; j += 1) {
      const col = document.createElement('div');
      col.classList.add('box');
      col.classList.add(`box-${j}`);
      col.setAttribute('data-y', i);
      col.setAttribute('data-x', j);
      row.appendChild(col);

      const col2 = document.createElement('div');
      col2.classList.add('box');
      col2.classList.add(`box-2-${j}`);
      row2.appendChild(col2);
    }
    playerMainDiv.appendChild(row);
    aiMainDiv.appendChild(row2);
  }
  container.appendChild(playerMainDiv);
  container.appendChild(aiMainDiv);
}
export default createGrid;
