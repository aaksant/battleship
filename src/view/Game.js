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

  getBoardState() {
    return {
      boardLogic: this.isPlayerTurn
        ? this.setup.opponentBoard
        : this.setup.playerBoard,
      boardElement: document.querySelector(
        this.isPlayerTurn ? '.opponent-board' : '.player-board'
      )
    };
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
      this.showGameOverMessage(`Game over, ${winner.name} wins!`);
      return;
    }
  }

  showGameOverMessage(message) {
    const modal = document.querySelector('.modal-gameover');
    const gameOverMessage = modal.querySelector('.gameover-message');
    const overlay = document.querySelector('.overlay');

    gameOverMessage.textContent = message;
    modal.classList.remove('hidden');  
    overlay.classList.remove('hidden');
  }

  handleAttackResult(
    row,
    col,
    isSuccesfulHit,
    boardLogic,
    boardElement,
    attacker
  ) {
    this.changeCellColor(row, col, boardElement, isSuccesfulHit);
    this.checkGameOver(boardLogic, attacker);
    this.switchTurn();
  }

  computerAttack() {
    const { boardLogic, boardElement } = this.getBoardState();
    const isSuccesfulHit = this.computer.randomAttack(boardLogic);

    const lastCoords = [...this.computer.attackedCoords].at(-1);
    const [row, col] = lastCoords.split(', ').map(Number);

    this.handleAttackResult(
      row,
      col,
      isSuccesfulHit,
      boardLogic,
      boardElement,
      this.computer
    );
  }

  handleAttack() {
    const { boardLogic, boardElement } = this.getBoardState();

    boardElement.addEventListener('click', e => {
      const cell = e.target.closest('.cell');
      if (!cell) return;
      if (!this.isPlayerTurn) return;

      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if (this.player.isAlreadyAttacked(row, col)) return;

      const isSuccesfulHit = this.player.attack(row, col, boardLogic);

      this.handleAttackResult(
        row,
        col,
        isSuccesfulHit,
        boardLogic,
        boardElement,
        this.player
      );

      setTimeout(() => {
        this.computerAttack();
      }, 500);
    });
  }
}
