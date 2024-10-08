export default class Handlers {
  constructor() {
    this.defaultPlayerName = 'Player';
    this.getPlayerName();
    this.handleShipDrag();
    this.handleReset();
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

  handleReset() {
    const btnReset = document.querySelector('.btn-reset');
    btnReset.addEventListener('click', this.clearBoard.bind(this));
  }

  handleShipDrag() {
    const shipsContainer = document.querySelector('.ships-container');
    const playerBoard = document.querySelector('.player-board');
    // call dragstart
    shipsContainer.addEventListener(
      'dragstart',
      this.handleDragStart.bind(this)
    );
    // call dragover
    playerBoard.addEventListener('dragover', this.handleOver.bind(this));
    // call drop
    playerBoard.addEventListener('drop', this.handleDrop.bind(this));
  }

  handleDragStart(e) {
    let dragObject = e.target.closest('.draggable');
    if (!dragObject) return;

    if (dragObject.classList.contains('draggable')) {
      dragObject = dragObject.firstElementChild;
    }

    e.dataTransfer.setData(`length-${dragObject.dataset.length}/plain`, '');
  }

  handleOver(e) {
    let dropzone = e.target;
    if (!dropzone.classList.contains('dropzone')) return;
    e.preventDefault();

    const startRow = parseInt(dropzone.dataset.row);
    const startCol = parseInt(dropzone.dataset.col);
    const lengthType = e.dataTransfer.types.find(type =>
      type.startsWith('length-')
    );
    const length = +lengthType.split('-')[1].split('/')[0];

    return { startRow, startCol, length };
  }

  handleDrop(e) {
    let dropzone = e.target;
    if (!dropzone.classList.contains('dropzone')) return;
    e.preventDefault();

    const { startRow, startCol, length } = this.handleOver(e);
    this.fillBoard(startRow, startCol, length);
  }

  fillBoard(startRow, startCol, length) {
    const playerBoard = document.querySelector('.player-board');

    for (let col = startCol; col < startCol + length; col++) {
      const targetCell = playerBoard.querySelector(
        `[data-row="${startRow}"][data-col="${col}"]`
      );

      if (targetCell) targetCell.classList.add('occupied');
    }
  }

  clearBoard() {
    const cells = document.querySelectorAll('.cell');
    const occupiedCells = [...cells].filter(cell =>
      cell.classList.contains('occupied')
    );

    occupiedCells.forEach(occupiedCell =>
      occupiedCell.classList.remove('occupied')
    );
  }
}
