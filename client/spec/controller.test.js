import * as CONFIG from '../source/gameConfig';
import { ViewController } from '../source/controller';

import { Game }  from '../source/game';

describe('ViewController', () => {
    
    let game = new Game(CONFIG.gameModes, CONFIG.gameTypes);
    global.viewController = new ViewController(game);

    describe('should have property', () => {
        beforeAll((done) => {
           document.getElementsByClassName('karma-html')[0].addEventListener('load', () => {
            window.viewController.initDomSelectors(document.getElementsByClassName('karma-html')[0].contentDocument);
            done();
           }) 
         });
    
        it('$main for main element', () => {
            let viewController = window.viewController;
            expect(viewController.$main).toBeDefined();
        });
    });

});
