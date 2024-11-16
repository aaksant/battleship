import Player from '../modules/Player';
import Board from '../modules/Board';
import Ship from '../modules/Ship';
import Setup from './Setup';

export default class Game {
  constructor() {
    this.setup = new Setup();
    this.isPlayerTurn = true;

    this.initPlayer();
    this.handleAttack();
  }

  async initPlayer() {
    const playerName = await this.setup.getPlayerName();
    this.player = new Player(playerName);
    this.computer = new Player('Computer');
  }

  changeTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;
  }

  getBoardInfo(isPlayerTurn) {
    const boardLogic = isPlayerTurn
      ? this.setup.opponentBoard
      : this.setup.playerBoard;
    const boardElement = document.querySelector(
      isPlayerTurn ? '.opponent-board' : '.player-board'
    );

    return { boardLogic, boardElement };
  }

  changeCellColor(row, col, board) {
    const HIT_RED = '#ef4444';
    const MISS_GREEN = '#22c55e';
    const targetCell = board.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`
    );

    targetCell.style.backgroundColor = HIT_RED;
  }

  handleAttack() {
    const { boardLogic, boardElement } = this.getBoardInfo(this.isPlayerTurn);

    boardElement.addEventListener('click', e => {
      const cell = e.target.closest('.cell');
      if (!cell) return;

      const row = cell.dataset.row;
      const col = cell.dataset.col;

      if (this.player.attack(row, col, boardLogic)) {
        this.changeCellColor(row, col, boardElement);
      }
    });
  }
}
