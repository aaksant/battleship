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
    this.toggleStartGameButton(false);
    this.initBoards();
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

  toggleStartGameButton(isEnabled) {
    const btnStart = document.querySelector('.btn[data-action="start"');

    if (isEnabled) {
      btnStart.removeAttribute('disabled');
    } else {
      btnStart.setAttribute('disabled', '');
    }
  }

  getPlayerName() {
    return new Promise((resolve, _) => {
      const form = document.getElementById('form');
      const playerNameInput = document.getElementById('playerName');

      form.addEventListener('submit', e => {
        e.preventDefault();
        this.hideForm();

        resolve(playerNameInput.value.trim() || this.defaultPlayerName);
      });
    });
  }

  hideForm() {
    const modalForm = document.querySelector('.modal-input');
    const previewModal = document.querySelector('.modal-preview');

    modalForm.classList.add('hidden');
    previewModal.classList.remove('hidden');
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
          this.random();
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

  random() {
    this.reset();
    this.placeRandom(true);
    this.toggleStartGameButton(true);
  }

  placeRandom(isPlayer) {
    const board = isPlayer ? this.previewBoard : this.opponentBoard;

    for (const { type, length } of this.getShipTypes()) {
      let placed = false;

      while (!placed) {
        const { row, col, isVertical } = this.getRandomPosition();
        const ship = new Ship(length);

        if (board.isValidPlacement(ship, row, col, isVertical)) {
          board.placeShip(ship, row, col, isVertical);

          if (isPlayer) {
            this.playerBoard.placeShip(ship, row, col, isVertical);
            this.fillBoard(row, col, length, isVertical, '.preview-board');
            this.fillBoard(row, col, length, isVertical, '.player-board');
          } else {
            this.opponentBoard.placeShip(ship, row, col, isVertical);
            this.fillBoard(row, col, length, isVertical, '.opponent-board');
          }
          this.disableShipRow(type);
          this.shipTypes.splice(this.shipTypes.indexOf(type), 1);
          placed = true;
        }
      }
    }
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
    this.playerBoard = new Board();

    this.shipTypes = this.getShipTypes();
    this.isVertical = false;
    this.initDragAndDrop();
    this.toggleStartGameButton(false);
  }

  start() {
    const modalPreview = document.querySelector('.modal-preview');
    const main = document.querySelector('.main');

    this.placeRandom(false);
    modalPreview.classList.add('hidden');
    main.classList.remove('hidden');
  }

  getRandomPosition() {
    const row = Math.floor(Math.random() * this.previewBoard.size);
    const col = Math.floor(Math.random() * this.previewBoard.size);
    const isVertical = Math.random() < 0.5;

    return { row, col, isVertical };
  }

  getShipTypes() {
    const shipRows = document.querySelectorAll('.ship-row');
    return [...shipRows].map(shipRow => ({
      type: shipRow.firstElementChild.dataset.ship,
      length: parseInt(shipRow.firstElementChild.dataset.length)
    }));
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
      this.playerBoard.placeShip(ship, startRow, startCol, this.isVertical);

      this.fillBoard(
        startRow,
        startCol,
        length,
        this.isVertical,
        '.preview-board'
      );
      this.fillBoard(
        startRow,
        startCol,
        length,
        this.isVertical,
        '.player-board'
      );

      if (!this.shipTypes.length) this.toggleStartGameButton(true);
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

  fillBoard(startRow, startCol, length, isVertical, boardSelector) {
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
