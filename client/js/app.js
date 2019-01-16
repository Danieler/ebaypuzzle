(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewController =
/*#__PURE__*/
function () {
  function ViewController(game) {
    _classCallCheck(this, ViewController);

    this.game = game;
    this.$main = document.getElementById('main');
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
    this.$modeSelector = document.getElementById('modeSelector');
    this.$automaticContainer = document.getElementById('automaticContainer');
    this.gameMode = game.getGameModes()[0].id;
    this.WINMESSAGES = ["Player1 Wins", "Player2 Wins", "Itś a Tie"];
    this.fillModeSelector();
  }

  _createClass(ViewController, [{
    key: "startGame",
    value: function startGame() {
      this.$roundIndicator.innerText = this.game.getCurrentRound(); //player vs computer =1 , computer vs computer = 2

      if (this.gameMode === 1) {
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
      this.$secondPlayerOption.innerHTML = "";
      this.$playWinner.innerText = '';
      this.$player1score.innerText = "";
      this.$player2score.innerText = "";
    }
  }, {
    key: "fillModeSelector",
    value: function fillModeSelector() {
      var _this = this;

      this.game.getGameModes().map(function (mode) {
        var option = document.createElement("option");
        option.text = mode.label;
        option.value = mode.id;

        _this.$modeSelector.add(option);
      });
    }
  }, {
    key: "changeGameMode",
    value: function changeGameMode() {
      this.gameMode = parseInt(this.$modeSelector.value);
    }
  }, {
    key: "playAutomatic",
    value: function playAutomatic() {
      var optionPlayer1 = this.game.generateAutomaticOption();
      var optionPlayer2 = this.game.generateAutomaticOption();
      var playResult = this.game.play(optionPlayer1, optionPlayer2);
      this.showPlayResult(optionPlayer1, optionPlayer2, playResult);
    }
  }, {
    key: "selectOption",
    value: function selectOption(playerOption) {
      var computerOption = this.game.generateAutomaticOption();
      var playResult = this.game.play(playerOption, computerOption);
      this.showPlayResult(playerOption, computerOption, playResult);
    }
  }, {
    key: "showPlayResult",
    value: function showPlayResult(playerOption, computerOption, playResult) {
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
  }, {
    key: "paintFinalWinnerContainer",
    value: function paintFinalWinnerContainer() {
      if (this.$finalWinnerContainer.classList.contains("hidden")) {
        this.$finalWinnerContainer.classList.remove('hidden');
      }
    }
  }, {
    key: "paintPlayWinnerMsg",
    value: function paintPlayWinnerMsg(winner, element) {
      switch (winner) {
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
  }, {
    key: "paintScores",
    value: function paintScores(scores) {
      this.$player1score.innerText = scores.player1;
      this.$player2score.innerText = scores.player2;
    }
  }, {
    key: "paintRound",
    value: function paintRound(round) {
      this.$roundIndicator.innerText = round;
    }
  }, {
    key: "paintOptions",
    value: function paintOptions(player1option, player2option) {
      var imageplayer1 = "<img src=\"/assets/".concat(player1option, ".svg\" />"),
          imageplayer2 = "<img src=\"/assets/".concat(player2option, ".svg\" />");
      this.$firstPlayerOption.innerHTML = imageplayer1;
      this.$secondPlayerOption.innerHTML = imageplayer2;
    }
  }]);

  return ViewController;
}();

exports.default = ViewController;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Game =
/*#__PURE__*/
function () {
  function Game(gameModes, gameTypes) {
    _classCallCheck(this, Game);

    this._scorePlayer1 = 0;
    this._scorePlayer2 = 0;
    this._gameTypes = gameTypes;
    this._selectedGameType = this._gameTypes[0];
    this._gameModes = gameModes;
    this._currentRound = 0;
  }

  _createClass(Game, [{
    key: "getSelectedGameType",
    value: function getSelectedGameType() {
      return this._selectedGameType;
    }
  }, {
    key: "getRounds",
    value: function getRounds() {
      return this._selectedGameType.rounds;
    }
  }, {
    key: "getGameModes",
    value: function getGameModes() {
      return this._gameModes;
    }
  }, {
    key: "getScores",
    value: function getScores() {
      return {
        player1: this._scorePlayer1,
        player2: this._scorePlayer2
      };
    }
  }, {
    key: "getCurrentRound",
    value: function getCurrentRound() {
      return this._currentRound;
    }
  }, {
    key: "getGameTypes",
    value: function getGameTypes() {
      return this._gameTypes;
    }
  }, {
    key: "checkOptions",
    value: function checkOptions(option1, option2) {
      var cond1 = this._selectedGameType.wins[option1];
      var cond2 = this._selectedGameType.wins[option2];

      if (cond1 && cond1.indexOf(option2) >= 0) {
        //player 1 won
        return 0;
      } else if (cond2 && cond2.indexOf(option1) >= 0) {
        //player 2 won
        return 1;
      } else {
        //tie
        return -1;
      }
    }
  }, {
    key: "play",
    value: function play(option1, option2) {
      var won = this.checkOptions(option1, option2);
      var lastRound = false;

      if (won === 0) {
        this._scorePlayer1 += 1;
      } else if (won === 1) {
        this._scorePlayer2 += 1;
      }

      if (this._currentRound === this._selectedGameType.rounds) {
        this.resetGame();
        return null;
      } else {
        this._currentRound += 1;

        if (this._currentRound === this._selectedGameType.rounds) {
          lastRound = true;
        }

        return {
          won: won,
          lastRound: lastRound
        };
      }
    }
  }, {
    key: "generateAutomaticOption",
    value: function generateAutomaticOption() {
      var position = Math.round(Math.random() * (this._selectedGameType.options.length - 1));
      return this._selectedGameType.options[position].id;
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      this._scorePlayer1 = 0;
      this._scorePlayer2 = 0;
      this._currentRound = 0;
    }
  }, {
    key: "getCurrentWinner",
    value: function getCurrentWinner() {
      if (this._scorePlayer1 > this._scorePlayer2) {
        //player 1 won
        return 0;
      } else if (this._scorePlayer2 > this._scorePlayer1) {
        //player 2 won
        return 1;
      } else {
        //tie
        return -1;
      }
    }
  }]);

  return Game;
}();

exports.Game = Game;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var CONFIG = {
  gameTypes: [{
    id: 1,
    name: "standard",
    options: [{
      id: 'paper',
      name: 'Paper'
    }, {
      id: 'rock',
      name: 'Rock'
    }, {
      id: 'scissor',
      name: 'Scissor'
    }],
    wins: {
      'paper': ['rock'],
      'scissor': ['paper'],
      'rock': ['scissor']
    },
    rounds: 3
  }],
  gameModes: [{
    id: 1,
    label: "Player Vs Computer"
  }, {
    id: 2,
    label: "Computer Vs Computer"
  }]
};
var _default = CONFIG;
exports.default = _default;

},{}],4:[function(require,module,exports){
(function (global){
"use strict";

var _gameConfig = _interopRequireDefault(require("./gameConfig.js"));

var _game = require("./game.js");

var _controller = _interopRequireDefault(require("./controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game.Game(_gameConfig.default.gameModes, _gameConfig.default.gameTypes);
var viewController = new _controller.default(game);
global.$viewController = viewController;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controller.js":1,"./game.js":2,"./gameConfig.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc291cmNlL2NvbnRyb2xsZXIuanMiLCJjbGllbnQvc291cmNlL2dhbWUuanMiLCJjbGllbnQvc291cmNlL2dhbWVDb25maWcuanMiLCJjbGllbnQvc291cmNlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztJQ0FxQixjOzs7QUFFakIsMEJBQVksSUFBWixFQUFrQjtBQUFBOztBQUNkLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLEtBQUwsR0FBZSxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4QixDQUFmO0FBQ0EsU0FBSyxlQUFMLEdBQXVCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixDQUF2QjtBQUNBLFNBQUssT0FBTCxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxTQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxTQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxTQUFLLGtCQUFMLEdBQTBCLFFBQVEsQ0FBQyxjQUFULENBQXdCLG1CQUF4QixDQUExQjtBQUNBLFNBQUssbUJBQUwsR0FBMkIsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isb0JBQXhCLENBQTNCO0FBQ0EsU0FBSyxnQkFBTCxHQUF3QixRQUFRLENBQUMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7QUFDQSxTQUFLLGlCQUFMLEdBQXlCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4QixDQUF6QjtBQUNBLFNBQUssV0FBTCxHQUFtQixRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4QixDQUFuQjtBQUNBLFNBQUsscUJBQUwsR0FBNkIsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isc0JBQXhCLENBQTdCO0FBQ0EsU0FBSyxZQUFMLEdBQW9C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SSxHQUFHLElBQUksVUFBSixDQUFTLG9CQUFPLFNBQWhCLEVBQTJCLG9CQUFPLFNBQWxDLENBQWI7QUFDQSxJQUFNLGNBQWMsR0FBRyxJQUFJLG1CQUFKLENBQW1CLElBQW5CLENBQXZCO0FBRUEsTUFBTSxDQUFDLGVBQVAsR0FBeUIsY0FBekIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuJG1haW4gPSAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XG4gICAgICAgIHRoaXMuJHJvdW5kSW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdW5kLWluZGljYXRvcicpO1xuICAgICAgICB0aGlzLiRmb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJyk7XG4gICAgICAgIHRoaXMuJHBsYXllcjFzY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXIxc2NvcmUnKTtcbiAgICAgICAgdGhpcy4kcGxheWVyMnNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcjJzY29yZScpO1xuICAgICAgICB0aGlzLiRmaXJzdFBsYXllck9wdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdFBsYXllck9wdGlvbicpO1xuICAgICAgICB0aGlzLiRzZWNvbmRQbGF5ZXJPcHRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2Vjb25kUGxheWVyT3B0aW9uJyk7XG4gICAgICAgIHRoaXMuJGNob29zZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaG9vc2VDb250YWluZXInKTtcbiAgICAgICAgdGhpcy4kd2VsY29tZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lQ29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuJHBsYXlXaW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheVdpbm5lcicpO1xuICAgICAgICB0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5hbFdpbm5lckNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRmaW5hbFdpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5hbFdpbm5lcicpO1xuICAgICAgICB0aGlzLiRtb2RlU2VsZWN0b3IgPSAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVTZWxlY3RvcicpO1xuICAgICAgICB0aGlzLiRhdXRvbWF0aWNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0b21hdGljQ29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGUgPSBnYW1lLmdldEdhbWVNb2RlcygpWzBdLmlkO1xuICAgICAgICB0aGlzLldJTk1FU1NBR0VTID0gW1xuICAgICAgICAgICAgXCJQbGF5ZXIxIFdpbnNcIixcbiAgICAgICAgICAgIFwiUGxheWVyMiBXaW5zXCIsXG4gICAgICAgICAgICBcIkl0xZsgYSBUaWVcIlxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmZpbGxNb2RlU2VsZWN0b3IoKTtcbiAgICB9XG5cbiAgICBzdGFydEdhbWUoKSB7XG4gICAgICAgIHRoaXMuJHJvdW5kSW5kaWNhdG9yLmlubmVyVGV4dCA9IHRoaXMuZ2FtZS5nZXRDdXJyZW50Um91bmQoKTtcblxuICAgICAgICAvL3BsYXllciB2cyBjb21wdXRlciA9MSAsIGNvbXB1dGVyIHZzIGNvbXB1dGVyID0gMlxuICAgICAgICBpZih0aGlzLmdhbWVNb2RlID09PSAxKSB7XG4gICAgICAgICAgICBpZiAodGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNob29zZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNob29zZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRhdXRvbWF0aWNDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuJG1haW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiRtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiRmb290ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiRmb290ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLiR3ZWxjb21lQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xuICAgICAgICAgICAgdGhpcy4kd2VsY29tZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy4kZmluYWxXaW5uZXJDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRmaXJzdFBsYXllck9wdGlvbi5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdGhpcy4kc2Vjb25kUGxheWVyT3B0aW9uLmlubmVySFRNTCA9XCJcIjtcbiAgICAgICAgdGhpcy4kcGxheVdpbm5lci5pbm5lclRleHQgPSAnJztcbiAgICAgICAgdGhpcy4kcGxheWVyMXNjb3JlLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgICAgIHRoaXMuJHBsYXllcjJzY29yZS5pbm5lclRleHQgPSBcIlwiO1xuICAgIH1cblxuICAgIGZpbGxNb2RlU2VsZWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5nZXRHYW1lTW9kZXMoKS5tYXAoKG1vZGUpID0+e1xuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICBvcHRpb24udGV4dCA9IG1vZGUubGFiZWw7XG4gICAgICAgICAgICBvcHRpb24udmFsdWUgPSBtb2RlLmlkO1xuICAgICAgICAgICAgdGhpcy4kbW9kZVNlbGVjdG9yLmFkZChvcHRpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2hhbmdlR2FtZU1vZGUoKSB7XG4gICAgICAgIHRoaXMuZ2FtZU1vZGU9IHBhcnNlSW50KHRoaXMuJG1vZGVTZWxlY3Rvci52YWx1ZSk7XG4gICAgfVxuICAgIHBsYXlBdXRvbWF0aWMoKSB7XG4gICAgICAgIGxldCBvcHRpb25QbGF5ZXIxID0gdGhpcy5nYW1lLmdlbmVyYXRlQXV0b21hdGljT3B0aW9uKCk7XG4gICAgICAgIGxldCBvcHRpb25QbGF5ZXIyID0gdGhpcy5nYW1lLmdlbmVyYXRlQXV0b21hdGljT3B0aW9uKCk7XG4gICAgICAgIGxldCBwbGF5UmVzdWx0ID0gdGhpcy5nYW1lLnBsYXkob3B0aW9uUGxheWVyMSwgb3B0aW9uUGxheWVyMik7XG4gICAgICAgIHRoaXMuc2hvd1BsYXlSZXN1bHQob3B0aW9uUGxheWVyMSwgb3B0aW9uUGxheWVyMiwgcGxheVJlc3VsdCk7XG4gICAgfVxuICAgIHNlbGVjdE9wdGlvbihwbGF5ZXJPcHRpb24pIHtcbiAgICAgICAgbGV0IGNvbXB1dGVyT3B0aW9uID0gdGhpcy5nYW1lLmdlbmVyYXRlQXV0b21hdGljT3B0aW9uKCk7XG4gICAgICAgIGxldCBwbGF5UmVzdWx0ID0gdGhpcy5nYW1lLnBsYXkocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbik7XG4gICAgICAgIHRoaXMuc2hvd1BsYXlSZXN1bHQocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbiwgcGxheVJlc3VsdCk7XG4gICAgfVxuXG4gICAgc2hvd1BsYXlSZXN1bHQocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbiwgcGxheVJlc3VsdCkge1xuICAgICAgICB0aGlzLnBhaW50T3B0aW9ucyhwbGF5ZXJPcHRpb24sIGNvbXB1dGVyT3B0aW9uKTtcbiAgICAgICAgdGhpcy5wYWludFNjb3Jlcyh0aGlzLmdhbWUuZ2V0U2NvcmVzKCkpO1xuICAgICAgICB0aGlzLnBhaW50Um91bmQodGhpcy5nYW1lLmdldEN1cnJlbnRSb3VuZCgpKTtcbiAgICAgICAgdGhpcy5wYWludFBsYXlXaW5uZXJNc2cocGxheVJlc3VsdC53b24sIHRoaXMuJHBsYXlXaW5uZXIpO1xuXG4gICAgICAgIGlmIChwbGF5UmVzdWx0Lmxhc3RSb3VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5wYWludEZpbmFsV2lubmVyQ29udGFpbmVyKCk7XG4gICAgICAgICAgICB0aGlzLnBhaW50UGxheVdpbm5lck1zZyh0aGlzLmdhbWUuZ2V0Q3VycmVudFdpbm5lcigpLCB0aGlzLiRmaW5hbFdpbm5lcik7XG4gICAgICAgICAgICB0aGlzLmdhbWUucmVzZXRHYW1lKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuJGNob29zZUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjaG9vc2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhdXRvbWF0aWNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwYWludEZpbmFsV2lubmVyQ29udGFpbmVyKCkge1xuICAgICAgICBpZiAodGhpcy4kZmluYWxXaW5uZXJDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYWludFBsYXlXaW5uZXJNc2cod2lubmVyLCBlbGVtZW50KSB7XG4gICAgICAgIHN3aXRjaCh3aW5uZXIpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLldJTk1FU1NBR0VTWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAtMTpcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMl07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhaW50U2NvcmVzKHNjb3Jlcykge1xuICAgICAgICB0aGlzLiRwbGF5ZXIxc2NvcmUuaW5uZXJUZXh0ID0gc2NvcmVzLnBsYXllcjE7XG4gICAgICAgIHRoaXMuJHBsYXllcjJzY29yZS5pbm5lclRleHQgPSBzY29yZXMucGxheWVyMjtcbiAgICB9XG4gICAgcGFpbnRSb3VuZChyb3VuZCkge1xuICAgICAgICB0aGlzLiRyb3VuZEluZGljYXRvci5pbm5lclRleHQgPSByb3VuZDtcbiAgICB9XG4gICAgcGFpbnRPcHRpb25zKHBsYXllcjFvcHRpb24sIHBsYXllcjJvcHRpb24pIHtcbiAgICAgICAgbGV0IGltYWdlcGxheWVyMSA9IGA8aW1nIHNyYz1cIi9hc3NldHMvJHtwbGF5ZXIxb3B0aW9ufS5zdmdcIiAvPmAsXG4gICAgICAgICAgICBpbWFnZXBsYXllcjIgPSBgPGltZyBzcmM9XCIvYXNzZXRzLyR7cGxheWVyMm9wdGlvbn0uc3ZnXCIgLz5gO1xuXG4gICAgICAgIHRoaXMuJGZpcnN0UGxheWVyT3B0aW9uLmlubmVySFRNTCA9IGltYWdlcGxheWVyMTtcbiAgICAgICAgdGhpcy4kc2Vjb25kUGxheWVyT3B0aW9uLmlubmVySFRNTCA9IGltYWdlcGxheWVyMjtcblxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lTW9kZXMsIGdhbWVUeXBlcykge1xuICAgICAgICB0aGlzLl9zY29yZVBsYXllcjEgPSAwO1xuICAgICAgICB0aGlzLl9zY29yZVBsYXllcjIgPSAwO1xuICAgICAgICB0aGlzLl9nYW1lVHlwZXMgPSBnYW1lVHlwZXM7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUgPSB0aGlzLl9nYW1lVHlwZXNbMF07XG4gICAgICAgIHRoaXMuX2dhbWVNb2RlcyA9IGdhbWVNb2RlcztcbiAgICAgICAgdGhpcy5fY3VycmVudFJvdW5kID0gMDtcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEdhbWVUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZTtcbiAgICB9XG5cbiAgICBnZXRSb3VuZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlLnJvdW5kcztcbiAgICB9XG5cbiAgICBnZXRHYW1lTW9kZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lTW9kZXNcbiAgICB9XG5cbiAgICBnZXRTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB7cGxheWVyMTogdGhpcy5fc2NvcmVQbGF5ZXIxLCBwbGF5ZXIyOiB0aGlzLl9zY29yZVBsYXllcjJ9O1xuICAgIH1cbiAgICBnZXRDdXJyZW50Um91bmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Um91bmQ7XG4gICAgfVxuXG4gICAgZ2V0R2FtZVR5cGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZVR5cGVzXG4gICAgfVxuXG4gICAgY2hlY2tPcHRpb25zKG9wdGlvbjEsIG9wdGlvbjIpIHtcblxuICAgICAgICBsZXQgY29uZDEgPSB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlLndpbnNbb3B0aW9uMV07XG4gICAgICAgIGxldCBjb25kMiA9IHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUud2luc1tvcHRpb24yXTtcblxuICAgICAgICBpZiAoY29uZDEgJiYgY29uZDEuaW5kZXhPZihvcHRpb24yKSA+PSAwKSB7XG4gICAgICAgICAgICAvL3BsYXllciAxIHdvblxuICAgICAgICAgICAgcmV0dXJuIDBcbiAgICAgICAgfSBlbHNlIGlmIChjb25kMiAmJiBjb25kMi5pbmRleE9mKG9wdGlvbjEpID49IDApIHtcbiAgICAgICAgICAgIC8vcGxheWVyIDIgd29uXG4gICAgICAgICAgICByZXR1cm4gMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy90aWVcbiAgICAgICAgICAgIHJldHVybiAtMVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheShvcHRpb24xLCBvcHRpb24yKSB7XG5cbiAgICAgICAgICAgIGxldCB3b24gPSB0aGlzLmNoZWNrT3B0aW9ucyhvcHRpb24xLCBvcHRpb24yKTtcbiAgICAgICAgICAgIGxldCBsYXN0Um91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHdvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMSArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3b24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVBsYXllcjIgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRSb3VuZCA9PT0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0R2FtZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Um91bmQgKz0xO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRSb3VuZCA9PT0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RSb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7d29uOiB3b24sIGxhc3RSb3VuZDogbGFzdFJvdW5kIH07XG4gICAgICAgICAgICB9XG5cbiAgICB9XG5cblxuXG5cblxuICAgIGdlbmVyYXRlQXV0b21hdGljT3B0aW9uKCkge1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5vcHRpb25zLmxlbmd0aC0xKSk7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlLm9wdGlvbnNbcG9zaXRpb25dLmlkO1xuICAgIH1cblxuICAgIHJlc2V0R2FtZSgpIHtcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIxID0gMDtcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIyID0gMDtcbiAgICAgICAgdGhpcy5fY3VycmVudFJvdW5kID0gMDtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50V2lubmVyKCkge1xuXG4gICAgICAgIGlmICh0aGlzLl9zY29yZVBsYXllcjEgPiB0aGlzLl9zY29yZVBsYXllcjIpIHtcbiAgICAgICAgICAgIC8vcGxheWVyIDEgd29uXG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Njb3JlUGxheWVyMiA+IHRoaXMuX3Njb3JlUGxheWVyMSkge1xuICAgICAgICAgICAgLy9wbGF5ZXIgMiB3b25cbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3RpZVxuICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImNvbnN0IENPTkZJRyA9IHtcbiAgICBnYW1lVHlwZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBuYW1lOiBcInN0YW5kYXJkXCIsXG4gICAgICAgICAgICBvcHRpb25zOiBbXG4gICAgICAgICAgICAgICAge2lkOidwYXBlcicsIG5hbWU6J1BhcGVyJ30sXG4gICAgICAgICAgICAgICAge2lkOidyb2NrJywgbmFtZTonUm9jaycsfSxcbiAgICAgICAgICAgICAgICB7aWQ6J3NjaXNzb3InLCBuYW1lOidTY2lzc29yJ31cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB3aW5zOiB7XG4gICAgICAgICAgICAgICAgJ3BhcGVyJzogWydyb2NrJ10sXG4gICAgICAgICAgICAgICAgJ3NjaXNzb3InOiBbJ3BhcGVyJ10sXG4gICAgICAgICAgICAgICAgJ3JvY2snOiBbJ3NjaXNzb3InXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJvdW5kczogM1xuICAgICAgICB9XG4gICAgXSxcbiAgICBnYW1lTW9kZXM6IFtcbiAgICAgICAgeyBpZDogMSwgbGFiZWw6IFwiUGxheWVyIFZzIENvbXB1dGVyXCJ9LFxuICAgICAgICB7IGlkOiAyLCBsYWJlbDogXCJDb21wdXRlciBWcyBDb21wdXRlclwifVxuICAgIF1cbn1cbmV4cG9ydCBkZWZhdWx0IENPTkZJR1xuIiwiaW1wb3J0IENPTkZJRyBmcm9tICcuL2dhbWVDb25maWcuanMnXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lLmpzJ1xuaW1wb3J0IFZpZXdDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci5qcydcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKENPTkZJRy5nYW1lTW9kZXMsIENPTkZJRy5nYW1lVHlwZXMpO1xuY29uc3Qgdmlld0NvbnRyb2xsZXIgPSBuZXcgVmlld0NvbnRyb2xsZXIoZ2FtZSk7XG5cbmdsb2JhbC4kdmlld0NvbnRyb2xsZXIgPSB2aWV3Q29udHJvbGxlcjtcbiJdfQ==

//# sourceMappingURL=maps/app.js.map
