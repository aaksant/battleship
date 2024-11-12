import Player from '../modules/Player';
import Board from '../modules/Board';
import Ship from '../modules/Ship';
import Setup from './Setup';

export default class Game {
  constructor() {
    this.setup = new Setup();
    this.playerName = this.setup.defaultPlayerName;
    this.init();
  }

  init() {
    this.setup.initBoards();
    this.initPlayerName();
  }

  async initPlayerName() {
    this.playerName = await this.setup.getPlayerName();
  }
}
