// TODO: copy preview board to player

import Board from '../modules/Board';
import Ship from '../modules/Ship';

export default class Setup {
  constructor() {
    this.previewBoard = new Board();
    this.playerBoard = new Board();
    this.opponentBoard = new Board();

    this.defaultPlayerName = 'Player';
    this.isVertical = false;
    this.shipTypes = this.getShipTypes();

    this.getPlayerName();
    this.handleBoardButtons();
    this.initDragAndDrop();
    this.disableStartGameButton();
  }

  createBoard(grid, boardSelector) {
    const boardElement = document.querySelector(boardSelector);

    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const cell = document.createElement('div');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.classList.add('cell');
        if (boardSelector === '.preview-board') cell.classList.add('dropzone');

        boardElement.appendChild(cell);
      }
    }
  }

  initBoards() {
    this.createBoard(this.previewBoard.grid, '.preview-board');
    this.createBoard(this.playerBoard.grid, '.player-board');
    this.createBoard(this.opponentBoard.grid, '.opponent-board');
  }

  enableStartGameButton() {
    document
      .querySelector('.btn[data-action="start"]')
      .removeAttribute('disabled');
  }

  disableStartGameButton() {
    document
      .querySelector('.btn[data-action="start"]')
      .setAttribute('disabled', '');
  }

  getPlayerName() {
    const form = document.getElementById('form');
    const playerNameInput = document.getElementById('playerName');

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.closeModal(form.parentElement);
      this.openPreviewModal();

      return playerNameInput.value
        ? playerNameInput.value.trim()
        : this.defaultPlayerName;
    });
  }

  openPreviewModal() {
    const previewModal = document.querySelector('.modal-preview');
    previewModal.classList.remove('hidden');
  }

  closeModal(modal) {
    modal.classList.add('hidden');
  }

  handleBoardButtons() {
    document.querySelector('.board-buttons').addEventListener('click', e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;

      switch (btn.dataset.action) {
        case 'rotate':
          this.rotate();
          break;
        case 'reset':
          this.reset();
          break;
        case 'random':
          this.placeRandom();
          break;
        case 'start':
          this.start();
          break;
        default:
          break;
      }
    });
  }

  rotate() {
    this.isVertical = !this.isVertical;
  }

  placeRandom() {
    this.reset();

    this.shipTypes.forEach(shipType => {
      const shipElement = document.querySelector(
        `.ship[data-ship=${shipType}]`
      );
      const length = parseInt(shipElement.dataset.length);
      const ship = new Ship(length);

      let currentPlacedShip = null;
      while (!currentPlacedShip) {
        const { row, col, isVertical } = this.getRandomPosition();
        currentPlacedShip = this.previewBoard.placeShip(
          ship,
          row,
          col,
          isVertical
        );

        if (currentPlacedShip) {
          this.fillBoard(row, col, length, isVertical);
          this.disableShipRow(shipType);
        }
      }
    });

    this.shipTypes = [];
    this.enableStartGameButton();
  }

  reset() {
    const shipRows = document.querySelectorAll('.ship-row');
    const cells = document.querySelectorAll('.cell');
    const occupiedCells = [...cells].filter(cell =>
      cell.classList.contains('occupied')
    );

    occupiedCells.forEach(occupiedCell =>
      occupiedCell.classList.remove('occupied')
    );
    shipRows.forEach(shipRow => {
      shipRow.setAttribute('draggable', 'true');
      shipRow.classList.add('draggable');
      shipRow.classList.remove('inaccessible');
      shipRow.style.cursor = 'grab';
    });

    this.previewBoard = new Board();
    this.shipTypes = this.getShipTypes();
    this.isVertical = false;
    this.initDragAndDrop();
    this.disableStartGameButton();
  }

  start() {
    const modalPreview = document.querySelector('.modal-preview');
    const main = document.querySelector('.main');

    this.playerBoard.copyFrom(this.previewBoard);
    this.updatePlayerBoard();

    modalPreview.classList.add('hidden');
    main.classList.remove('hidden');
  }

  updatePlayerBoard() {
    for (let row = 0; row < this.playerBoard.size; row++) {
      for (let col = 0; col < this.playerBoard.size; col++) {
        if (this.playerBoard.grid[row][col] instanceof Ship) {
          const ship = this.playerBoard.grid[row][col];
          const { startRow, startCol, length, isVertical } =
            this.playerBoard.getShipPosition(ship);

          if (startRow === row && startCol === col) {
            this.fillBoard(row, col, length, isVertical, '.player-board');
          }
        }
      }
    }
  }

  getRandomPosition() {
    const row = Math.floor(Math.random() * this.previewBoard.size);
    const col = Math.floor(Math.random() * this.previewBoard.size);
    const isVertical = Math.random() < 0.5;

    return { row, col, isVertical };
  }

  getShipTypes() {
    const shipRows = document.querySelectorAll('.ship-row');
    return [...shipRows].map(shipRow => shipRow.firstElementChild.dataset.ship);
  }

  initDragAndDrop() {
    const shipsContainer = document.querySelector('.ships-container');
    const playerBoard = document.querySelector('.preview-board');

    shipsContainer.addEventListener(
      'dragstart',
      this.handleDragStart.bind(this)
    );
    playerBoard.addEventListener('dragover', this.handleOver.bind(this));
    playerBoard.addEventListener('drop', this.handleDrop.bind(this));

    playerBoard.addEventListener(
      'dragleave',
      this.clearDragFeedback.bind(this)
    );
    document.addEventListener('dragend', this.clearDragFeedback.bind(this));
  }

  handleDragStart(e) {
    let dragObject = e.target.closest('.draggable');
    if (!dragObject) return;

    if (dragObject.classList.contains('draggable')) {
      dragObject = dragObject.firstElementChild;

      if (this.isVertical) dragObject.classList.add('vertical');
    }

    const shipData = {
      length: parseInt(dragObject.dataset.length),
      type: dragObject.dataset.ship
    };

    e.dataTransfer.setData('application/json', JSON.stringify(shipData));
    e.dataTransfer.setData(`ship-length-${shipData.length}/plain`, '');
  }

  handleOver(e) {
    let dropzone = e.target;
    if (!dropzone.classList.contains('dropzone')) return;
    e.preventDefault();

    this.clearDragFeedback();

    const startRow = parseInt(dropzone.dataset.row);
    const startCol = parseInt(dropzone.dataset.col);

    const lengthType = e.dataTransfer.types.find(type =>
      type.startsWith('ship-length-')
    );
    if (!lengthType) return;

    const length = parseInt(lengthType.split('-').at(-1));
    const ship = new Ship(length);

    const isValidPlacement = this.previewBoard.isValidPlacement(
      ship,
      startRow,
      startCol,
      this.isVertical
    );

    if (isValidPlacement) {
      this.showDragFeedback(startRow, startCol, length, this.isVertical);
    }

    return { startRow, startCol, length, isValidPlacement };
  }

  handleDrop(e) {
    let dropzone = e.target;
    if (!dropzone.classList.contains('dropzone')) return;
    e.preventDefault();

    const dropData = this.handleOver(e);
    if (!dropData) return;

    const { startRow, startCol, length, isValidPlacement } = dropData;

    if (isValidPlacement) {
      const data = JSON.parse(e.dataTransfer.getData('application/json'));
      const ship = new Ship(data.length);

      this.disableShipRow(data.type);
      this.shipTypes.splice(this.shipTypes.indexOf(data.type), 1);
      this.previewBoard.placeShip(ship, startRow, startCol, this.isVertical);
      this.fillBoard(startRow, startCol, length, this.isVertical);

      if (!this.shipTypes.length) this.enableStartGameButton();
    }
  }

  disableShipRow(type) {
    const placedShip = document.querySelector(`.ship-row .ship.${type}`);
    placedShip.parentElement.classList.add('inaccessible');
  }

  showDragFeedback(startRow, startCol, length, isVertical) {
    const playerBoard = document.querySelector('.preview-board');

    for (let i = 0; i < length; i++) {
      const row = isVertical ? startRow + i : startRow;
      const col = isVertical ? startCol : startCol + i;
      const cell = playerBoard.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (cell) {
        cell.classList.add('drag-feedback');
      }
    }
  }

  clearDragFeedback() {
    const playerBoard = document.querySelector('.preview-board');
    playerBoard
      .querySelectorAll('.drag-feedback')
      .forEach(cell => cell.classList.remove('drag-feedback'));
  }

  fillBoard(
    startRow,
    startCol,
    length,
    isVertical,
    boardSelector = '.preview-board'
  ) {
    // const playerBoard = document.querySelector('.preview-board');
    const board = document.querySelector(boardSelector);

    for (let i = 0; i < length; i++) {
      const row = isVertical ? startRow + i : startRow;
      const col = isVertical ? startCol : startCol + i;
      const targetCell = board.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

      if (targetCell) targetCell.classList.add('occupied');
    }
  }
}
