export class Game {
    constructor(gameModes, gameTypes) {
        this._scorePlayer1 = 0;
        this._scorePlayer2 = 0;
        this._gameTypes = gameTypes;
        this._selectedGameType = this._gameTypes[0];
        this._gameModes = gameModes;
        this._currentRound = 0;
    }

    getGameModes() {
        return this._gameModes
    }

    play(option1, option2) {

            let won = this.checkOptions(option1, option2);
            let lastRound = false;

            if (won === 0) {
                this._scorePlayer1 += 1
            }
            else if (won === 1) {
                this._scorePlayer2 += 1
            }
            if (this._currentRound === this._selectedGameType.rounds) {
                this.resetGame();
                return null;
            } else {
                this._currentRound +=1;
                if(this._currentRound === this._selectedGameType.rounds ) {
                    lastRound = true;
                }
                return {won: won, lastRound: lastRound };
            }

    }

    checkOptions(option1, option2) {

        let cond1 = this._selectedGameType.wins[option1];
        let cond2 = this._selectedGameType.wins[option2];

        if (cond1 && cond1.indexOf(option2) >= 0) {
            //player 1 won
            return 0
        } else if (cond2 && cond2.indexOf(option1) >= 0) {
            //player 2 won
            return 1
        } else {
            //tie
            return -1
        }
    }

    getRounds() {
        return this._selectedGameType.rounds;
    }

    generateAutomaticOption() {
        let position = Math.round(Math.random() * (this._selectedGameType.options.length-1));
        return this._selectedGameType.options[position].id;
    }

    getScores() {
        return {player1: this._scorePlayer1, player2: this._scorePlayer2};
    }
    getCurrentRound() {
        return this._currentRound;
    }

    resetGame() {
        this._scorePlayer1 = 0;
        this._scorePlayer2 = 0;
        this._currentRound = 0;
    }

    getCurrentWinner() {

        if (this._scorePlayer1 > this._scorePlayer2) {
            //player 1 won
            return 0
        } else if (this._scorePlayer2 > this._scorePlayer1) {
            //player 2 won
            return 1
        } else {
            //tie
            return -1
        }
    }

}
