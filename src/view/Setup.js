import Board from '../modules/Board';
import Ship from '../modules/Ship';

export default class Setup {
  constructor() {
    this.board = new Board();
    this.defaultPlayerName = 'Player';
    this.isVertical = false;
    this.shipTypes = this.getShipTypes();

    this.getPlayerName();
    this.handleBoardButtons();
    this.initDragAndDrop();
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
          this.rotateShip();
          break;
        case 'reset':
          this.reset();
          break;
        default:
          break;
      }
    });
  }

  rotateShip() {
    this.isVertical = !this.isVertical;
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

    this.board = new Board();
    this.shipTypes = this.getShipTypes();
    this.isVertical = false;
    this.initDragAndDrop();
  }

  getShipTypes() {
    const shipRows = document.querySelectorAll('.ship-row');
    return [...shipRows].map(shipRow => shipRow.firstElementChild.dataset.ship);
  }

  initDragAndDrop() {
    const shipsContainer = document.querySelector('.ships-container');
    const playerBoard = document.querySelector('.player-board');

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

    const isValidPlacement = this.board.isValidPlacement(
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
      this.board.placeShip(ship, startRow, startCol, this.isVertical);
      this.fillBoard(startRow, startCol, length, this.isVertical);
    }
  }

  disableShipRow(type) {
    const placedShip = document.querySelector(`.ship-row .ship.${type}`);
    placedShip.parentElement.classList.add('inaccessible');
  }

  showDragFeedback(startRow, startCol, length, isVertical) {
    const playerBoard = document.querySelector('.player-board');

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
    const playerBoard = document.querySelector('.player-board');
    playerBoard
      .querySelectorAll('.drag-feedback')
      .forEach(cell => cell.classList.remove('drag-feedback'));
  }

  fillBoard(startRow, startCol, length, isVertical) {
    const playerBoard = document.querySelector('.player-board');

    for (let i = 0; i < length; i++) {
      const row = isVertical ? startRow + i : startRow;
      const col = isVertical ? startCol : startCol + i;
      const targetCell = playerBoard.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );

      if (targetCell) targetCell.classList.add('occupied');
    }
  }
}
