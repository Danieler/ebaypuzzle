export default class ViewController {

    constructor(game) {
        this.game = game;
        this.$main =   document.getElementById('main');
        this.$roundIndicator = document.getElementById('round-indicator');
        this.$footer = document.getElementById('footer');
        this.$player1score = document.getElementById('player1score');
        this.$player2score = document.getElementById('player2score');
        this.$firstPlayerOption = document.getElementById('firstPlayerOption');
        this.$secondPlayerOption = document.getElementById('secondPlayerOption');
        this.$chooseContainer = document.getElementById('chooseContainer');
        this.$welcomeContainer = document.getElementById('welcomeContainer');
        this.$playWinner = document.getElementById('playWinner');
        this.$finalWinnerContainer = document.getElementById('finalWinnerContainer');
        this.$finalWinner = document.getElementById('finalWinner');
        this.$modeSelector =  document.getElementById('modeSelector');
        this.$automaticContainer = document.getElementById('automaticContainer');
        this.gameMode = game.getGameModes()[0].id;
        this.WINMESSAGES = [
            "Player1 Wins",
            "Player2 Wins",
            "Itś a Tie"
        ];
        this.fillModeSelector();
    }

    startGame() {
        this.$roundIndicator.innerText = this.game.getCurrentRound();

        //player vs computer =1 , computer vs computer = 2
        if(this.gameMode === 1) {
            if (this.$chooseContainer.classList.contains("hidden")) {
                this.$chooseContainer.classList.remove('hidden');
            }
        } else {
            if (!this.$chooseContainer.classList.contains("hidden")) {
                this.$chooseContainer.classList.add('hidden');
            }
            if (this.$automaticContainer.classList.contains("hidden")) {
                this.$automaticContainer.classList.remove('hidden');
            }
        }

        if (this.$main.classList.contains("hidden")) {
            this.$main.classList.remove('hidden');
        }
        if (this.$footer.classList.contains("hidden")) {
            this.$footer.classList.remove('hidden');
        }
        if (!this.$welcomeContainer.classList.contains("hidden")) {
            this.$welcomeContainer.classList.add('hidden');
        }

        if (!this.$finalWinnerContainer.classList.contains("hidden")) {
            this.$finalWinnerContainer.classList.add('hidden');
        }
        this.$firstPlayerOption.innerHTML = '';
        this.$secondPlayerOption.innerHTML ="";
        this.$playWinner.innerText = '';
        this.$player1score.innerText = "";
        this.$player2score.innerText = "";
    }

    fillModeSelector() {
        this.game.getGameModes().map((mode) =>{
            let option = document.createElement("option");
            option.text = mode.label;
            option.value = mode.id;
            this.$modeSelector.add(option);
        });
    }
    changeGameMode() {
        this.gameMode= parseInt(this.$modeSelector.value);
    }
    playAutomatic() {
        let optionPlayer1 = this.game.generateAutomaticOption();
        let optionPlayer2 = this.game.generateAutomaticOption();
        let playResult = this.game.play(optionPlayer1, optionPlayer2);
        this.showPlayResult(optionPlayer1, optionPlayer2, playResult);
    }
    selectOption(playerOption) {
        let computerOption = this.game.generateAutomaticOption();
        let playResult = this.game.play(playerOption, computerOption);
        this.showPlayResult(playerOption, computerOption, playResult);
    }

    showPlayResult(playerOption, computerOption, playResult) {
        this.paintOptions(playerOption, computerOption);
        this.paintScores(this.game.getScores());
        this.paintRound(this.game.getCurrentRound());
        this.paintPlayWinnerMsg(playResult.won, this.$playWinner);

        if (playResult.lastRound === true) {
            this.paintFinalWinnerContainer();
            this.paintPlayWinnerMsg(this.game.getCurrentWinner(), this.$finalWinner);
            this.game.resetGame();
            if (!this.$chooseContainer.classList.contains("hidden")) {
                this.$chooseContainer.classList.add('hidden');
            }
            if (!this.$automaticContainer.classList.contains("hidden")) {
                this.$automaticContainer.classList.add('hidden');
            }
        }
    }

    paintFinalWinnerContainer() {
        if (this.$finalWinnerContainer.classList.contains("hidden")) {
            this.$finalWinnerContainer.classList.remove('hidden');
        }
    }
    paintPlayWinnerMsg(winner, element) {
        switch(winner) {
            case 0:
                element.innerText = this.WINMESSAGES[0];
                break;
            case 1:
                element.innerText = this.WINMESSAGES[1];
                break;
            case -1:
                element.innerText = this.WINMESSAGES[2];
                break;
            default:
                break;
        }
    }
    paintScores(scores) {
        this.$player1score.innerText = scores.player1;
        this.$player2score.innerText = scores.player2;
    }
    paintRound(round) {
        this.$roundIndicator.innerText = round;
    }
    paintOptions(player1option, player2option) {
        let imageplayer1 = `<img src="/assets/${player1option}.svg" />`,
            imageplayer2 = `<img src="/assets/${player2option}.svg" />`;

        this.$firstPlayerOption.innerHTML = imageplayer1;
        this.$secondPlayerOption.innerHTML = imageplayer2;

    }
}
