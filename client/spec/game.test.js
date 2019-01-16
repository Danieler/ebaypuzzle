import * as CONFIG from '../source/gameConfig';
import { Game }  from '../source/game';

describe('Game', () => {
    console.log( Game);
    console.log( CONFIG);
    it('number', () => {
        expect(CONFIG.gameTypes[0].id).toBe(2);
    });
});
