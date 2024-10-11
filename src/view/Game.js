import Player from '../modules/Player';
import Board from '../modules/Board';
import Ship from '../modules/Ship';
import Setup from './Setup';

export default class Game {
  constructor() {
    this.setup = new Setup();
    this.playerBoard = new Board();
    this.opponentBoard = new Board();
    this.initPlayersBoard();
  }

  initPlayersBoard() {
    this.createBoard(
      this.playerBoard.grid,
      document.querySelector('.player-board')
    );
    this.createBoard(
      this.opponentBoard.grid,
      document.querySelector('.opponent-board')
    );
  }

  createBoard(grid, boardElement) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.classList.add('dropzone');
        cell.dataset.row = row;
        cell.dataset.col = col;

        boardElement.appendChild(cell);
      }
    }
  }
}
