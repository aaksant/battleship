import Player from '../modules/Player';
import Board from '../modules/Board';
import Ship from '../modules/Ship';
import Handlers from './Handlers';

export default class Game {
  constructor() {
    this.handlers = new Handlers();
  }
}
