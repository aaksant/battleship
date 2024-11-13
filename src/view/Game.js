import Player from '../modules/Player';
import Board from '../modules/Board';
import Ship from '../modules/Ship';
import Setup from './Setup';

export default class Game {
  constructor() {
    this.setup = new Setup();
    this.initPlayer();
  }

  async initPlayer() {
    const playerName = await this.setup.getPlayerName();
    this.player = new Player(playerName);
  }
}
