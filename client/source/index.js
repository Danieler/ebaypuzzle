import CONFIG from './gameConfig.js'
import { Game } from './game.js'
import { ViewController } from './controller.js'

const game = new Game(CONFIG.gameModes, CONFIG.gameTypes);
const viewController = new ViewController(game);

global.$viewController = viewController;
