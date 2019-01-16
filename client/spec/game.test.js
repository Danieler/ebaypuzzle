import * as CONFIG from '../source/gameConfig';
import { Game }  from '../source/game';

describe('Game', () => {
    let game =  new Game(CONFIG.gameModes, CONFIG.gameTypes);

    describe('should have property', () => {
        it('score for player 1', () => {
            expect(game._scorePlayer1).toBeDefined();
        });
        it('score for player 2', () => {
            expect(game._scorePlayer2).toBeDefined();
        });
        it('game types', () => {
            expect(game._gameTypes).toBeDefined();
        });
        it('selected game type', () => {
            expect(game._selectedGameType).toBeDefined();
        });
        it('game mode', () => {
            expect(game._gameModes).toBeDefined();
        });
        it('current round', () => {
            expect(game._currentRound).toBeDefined();
        });
    });

    describe('should have method', () => {
        it('for get game modes provided by config', () => {

            expect(typeof game.getGameModes).toBe('function');

            let gameModes = game.getGameModes(),
                gameModesInConfig = CONFIG.gameModes;

            expect(gameModes.length).toEqual(gameModesInConfig.length);
            expect(gameModes[0].id).toEqual(gameModesInConfig[0].id);
        });

        it('for reset game', () => {
            expect(typeof game.resetGame).toBe('function');
            game.resetGame();
            expect(game.getCurrentRound()).toEqual(0);
            expect(game.getScores().player1).toEqual(0);
            expect(game.getScores().player2).toEqual(0);
        });

        it('for get scores', () => {
            expect(typeof game.getScores).toBe('function');
            expect(game.getScores().player1).toEqual(jasmine.any(Number));
            expect(game.getScores().player2).toEqual(jasmine.any(Number));
        });

        it('for get current Round', () => {
            expect(typeof game.getCurrentRound).toBe('function');
            expect(game.getCurrentRound()).toEqual(jasmine.any(Number));
        });

        it('for get selected game type (default first)', () => {

            expect(typeof game.getSelectedGameType).toBe('function');

            let selectedGameType = game.getSelectedGameType(),
                firstGameTypesInConfig = CONFIG.gameTypes[0];

            expect(selectedGameType).toEqual(firstGameTypesInConfig);
        });

        it('for get game types provided by config', () => {

            expect(typeof game.getGameTypes).toBe('function');

            let gameTypes = game.getGameTypes(),
                gameTypesInConfig = CONFIG.gameTypes;

            expect(gameTypes.length).toEqual(gameTypesInConfig.length);
            expect(gameTypes[0].id).toEqual(gameTypesInConfig[0].id);
        });

        describe('checkOptions', () => {
            it('that should exist', () => {
                expect(typeof game.checkOptions).toBe('function');
            });
            it('that should return 0 if option1(player1) won', () => {
                let option1 = game.getGameTypes()[0].options[0].id, //paper
                    option2= game.getGameTypes()[0].options[1].id; //rock
                expect(game.checkOptions(option1, option2)).toEqual(0);
            });
            it('that should return 1 if option2(player2) won', () => {
                let option1 = game.getGameTypes()[0].options[1].id, //rock
                    option2= game.getGameTypes()[0].options[0].id; //paper
                expect(game.checkOptions(option1, option2)).toEqual(1);
            });
            it('that should return -1 if its a tie', () => {
                let option1 = game.getGameTypes()[0].options[0].id, //paper
                    option2= game.getGameTypes()[0].options[0].id; //paper
                expect(game.checkOptions(option1, option2)).toEqual(-1);
            });
        });

        describe('play', () => {
            it('that should exist', () => {
                expect(typeof game.play).toBe('function');
            });

            it('that should return an indicator number of winner', () => {
                let option1 = game.getGameTypes()[0].options[0].id, //paper
                    option2= game.getGameTypes()[0].options[1].id; //rock
                expect(game.play(option1, option2).won).toEqual(jasmine.any(Number));
            });

            it('that should return an indicator boolean of lastRound', () => {
                let option1 = game.getGameTypes()[0].options[0].id, //paper
                    option2= game.getGameTypes()[0].options[1].id; //rock
                expect(typeof game.play(option1, option2).lastRound).toEqual('boolean');
            });
            it('that should increase score of player 1 if player 1 wins', () => {
                let game = new Game(CONFIG.gameModes, CONFIG.gameTypes);
                let option1 = game.getGameTypes()[0].options[0].id, //paper
                    option2= game.getGameTypes()[0].options[1].id; //rock

                expect(game.getScores().player1).toEqual(0);
                expect(game.getScores().player2).toEqual(0);
                game.play(option1,option2); //player 1 wins
                expect(game.getScores().player1).toEqual(1);
            });
            it('that should increase score of player 2 if player 2 wins', () => {
                let game = new Game(CONFIG.gameModes, CONFIG.gameTypes);
                let option1 = game.getGameTypes()[0].options[1].id, //rock
                    option2= game.getGameTypes()[0].options[0].id; //paper

                expect(game.getScores().player1).toEqual(0);
                expect(game.getScores().player2).toEqual(0);
                game.play(option1,option2); //player 2 wins
                expect(game.getScores().player2).toEqual(1);
            });

        });

        describe('generateAutomaticOption', () => {
            it('that should return an option defined in the config', () => {
                let simpleIdsArray = CONFIG.gameTypes[0].options.map((option)=>option.id)
                expect(simpleIdsArray.includes(game.generateAutomaticOption())).toBe(true);
            });
        });



    });

});
