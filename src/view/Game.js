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
    this.player = new Player(await this.setup.getPlayerName());
    this.computer = new Player('Computer');
  }

  switchTurn() {
    this.isPlayerTurn = !this.isPlayerTurn;

    const turnDisplay = document.querySelector('.turn');
    turnDisplay.textContent = `It's ${
      this.isPlayerTurn ? this.player.name : this.computer.name
    }'s turn`;
  }

  getBoardInfo() {
    const boardLogic = this.isPlayerTurn
      ? this.setup.opponentBoard
      : this.setup.playerBoard;
    const boardElement = document.querySelector(
      this.isPlayerTurn ? '.opponent-board' : '.player-board'
    );

    return { boardLogic, boardElement };
  }

  changeCellColor(row, col, board, isSuccesfulHit) {
    const HIT_RED = '#f87171';
    const MISS_GREEN = '#4ade80';
    const targetCell = board.querySelector(
      `.cell[data-row="${row}"][data-col="${col}"]`
    );

    targetCell.style.backgroundColor = isSuccesfulHit ? HIT_RED : MISS_GREEN;
  }

  checkGameOver(board, winner) {
    if (board.isGameOver()) {
      alert(`Game over, ${winner.name} wins!`);
      return;
    }
  }

  computerMove() {
    const { boardLogic, boardElement } = this.getBoardInfo();
    const isSuccesfulHit = this.computer.randomAttack(boardLogic);

    // get the last attack coords
    const lastCoords = [...this.computer.attackedCoords].at(-1);
    const [row, col] = lastCoords.split(', ').map(Number);

    this.changeCellColor(row, col, boardElement, isSuccesfulHit);
    this.checkGameOver(boardLogic, this.computer);
    this.switchTurn();
  }

  handleAttack() {
    const { boardLogic, boardElement } = this.getBoardInfo();

    boardElement.addEventListener('click', e => {
      const cell = e.target.closest('.cell');
      if (!cell) return;

      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (this.player.isAlreadyAttacked(row, col)) return;

      const isSuccesfulHit = this.player.attack(row, col, boardLogic);

      this.changeCellColor(row, col, boardElement, isSuccesfulHit);
      this.checkGameOver(boardLogic, this.player);
      this.switchTurn();

      setTimeout(() => {
        this.computerMove();
      }, 500);
    });
  }
}
