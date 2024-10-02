export default class Handlers {
  constructor() {
    this.getPlayerName();
  }

  getPlayerName() {
    const form = document.getElementById('form');
    const playerNameInput = document.getElementById('playerName');

    form.addEventListener('submit', e => {
      e.preventDefault();
      this.closeModal();
      return playerNameInput.value ? playerNameInput.value : 'Player';
    });
  }

  closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');
  }
}
