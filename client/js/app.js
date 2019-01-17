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

        if (!this.$automaticContainer.classList.contains("hidden")) {
          this.$automaticContainer.classList.add('hidden');
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
      var imageplayer1 = "<img class=\"animationUp\" src=\"/assets/".concat(player1option, ".svg\" />"),
          imageplayer2 = "<img class=\"animationUp\" src=\"/assets/".concat(player2option, ".svg\" />");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc291cmNlL2NvbnRyb2xsZXIuanMiLCJjbGllbnQvc291cmNlL2dhbWUuanMiLCJjbGllbnQvc291cmNlL2dhbWVDb25maWcuanMiLCJjbGllbnQvc291cmNlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztJQ0FxQixjOzs7QUFFakIsMEJBQVksSUFBWixFQUFrQjtBQUFBOztBQUNkLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLEtBQUwsR0FBZSxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4QixDQUFmO0FBQ0EsU0FBSyxlQUFMLEdBQXVCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixDQUF2QjtBQUNBLFNBQUssT0FBTCxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxTQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxTQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxTQUFLLGtCQUFMLEdBQTBCLFFBQVEsQ0FBQyxjQUFULENBQXdCLG1CQUF4QixDQUExQjtBQUNBLFNBQUssbUJBQUwsR0FBMkIsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isb0JBQXhCLENBQTNCO0FBQ0EsU0FBSyxnQkFBTCxHQUF3QixRQUFRLENBQUMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7QUFDQSxTQUFLLGlCQUFMLEdBQXlCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4QixDQUF6QjtBQUNBLFNBQUssV0FBTCxHQUFtQixRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4QixDQUFuQjtBQUNBLFNBQUsscUJBQUwsR0FBNkIsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isc0JBQXhCLENBQTdCO0FBQ0EsU0FBSyxZQUFMLEdBQW9C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O0FBQWhCLEdBRE8sRUFFUDtBQUFFLElBQUEsRUFBRSxFQUFFLENBQU47QUFBUyxJQUFBLEtBQUssRUFBRTtBQUFoQixHQUZPO0FBbEJBLENBQWY7ZUF1QmUsTTs7Ozs7OztBQ3ZCZjs7QUFDQTs7QUFDQTs7OztBQUVBLElBQU0sSUFBSSxHQUFHLElBQUksVUFBSixDQUFTLG9CQUFPLFNBQWhCLEVBQTJCLG9CQUFPLFNBQWxDLENBQWI7QUFDQSxJQUFNLGNBQWMsR0FBRyxJQUFJLG1CQUFKLENBQW1CLElBQW5CLENBQXZCO0FBRUEsTUFBTSxDQUFDLGVBQVAsR0FBeUIsY0FBekIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3Q29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy4kbWFpbiA9ICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcclxuICAgICAgICB0aGlzLiRyb3VuZEluZGljYXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3VuZC1pbmRpY2F0b3InKTtcclxuICAgICAgICB0aGlzLiRmb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJyk7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyMXNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcjFzY29yZScpO1xyXG4gICAgICAgIHRoaXMuJHBsYXllcjJzY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXIyc2NvcmUnKTtcclxuICAgICAgICB0aGlzLiRmaXJzdFBsYXllck9wdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaXJzdFBsYXllck9wdGlvbicpO1xyXG4gICAgICAgIHRoaXMuJHNlY29uZFBsYXllck9wdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWNvbmRQbGF5ZXJPcHRpb24nKTtcclxuICAgICAgICB0aGlzLiRjaG9vc2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hvb3NlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy4kd2VsY29tZUNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWxjb21lQ29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy4kcGxheVdpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5V2lubmVyJyk7XHJcbiAgICAgICAgdGhpcy4kZmluYWxXaW5uZXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluYWxXaW5uZXJDb250YWluZXInKTtcclxuICAgICAgICB0aGlzLiRmaW5hbFdpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaW5hbFdpbm5lcicpO1xyXG4gICAgICAgIHRoaXMuJG1vZGVTZWxlY3RvciA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZVNlbGVjdG9yJyk7XHJcbiAgICAgICAgdGhpcy4kYXV0b21hdGljQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG9tYXRpY0NvbnRhaW5lcicpO1xyXG4gICAgICAgIHRoaXMuZ2FtZU1vZGUgPSBnYW1lLmdldEdhbWVNb2RlcygpWzBdLmlkO1xyXG4gICAgICAgIHRoaXMuV0lOTUVTU0FHRVMgPSBbXHJcbiAgICAgICAgICAgIFwiUGxheWVyMSBXaW5zXCIsXHJcbiAgICAgICAgICAgIFwiUGxheWVyMiBXaW5zXCIsXHJcbiAgICAgICAgICAgIFwiSXTFmyBhIFRpZVwiXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLmZpbGxNb2RlU2VsZWN0b3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEdhbWUoKSB7XHJcbiAgICAgICAgdGhpcy4kcm91bmRJbmRpY2F0b3IuaW5uZXJUZXh0ID0gdGhpcy5nYW1lLmdldEN1cnJlbnRSb3VuZCgpO1xyXG5cclxuICAgICAgICAvL3BsYXllciB2cyBjb21wdXRlciA9MSAsIGNvbXB1dGVyIHZzIGNvbXB1dGVyID0gMlxyXG4gICAgICAgIGlmKHRoaXMuZ2FtZU1vZGUgPT09IDEpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuJGNob29zZUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGNob29zZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLiRhdXRvbWF0aWNDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRhdXRvbWF0aWNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLiRtYWluLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLiRtYWluLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy4kZm9vdGVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLiRmb290ZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy4kd2VsY29tZUNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgICAgICAgdGhpcy4kd2VsY29tZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy4kZmluYWxXaW5uZXJDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLiRmaXJzdFBsYXllck9wdGlvbi5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB0aGlzLiRzZWNvbmRQbGF5ZXJPcHRpb24uaW5uZXJIVE1MID1cIlwiO1xyXG4gICAgICAgIHRoaXMuJHBsYXlXaW5uZXIuaW5uZXJUZXh0ID0gJyc7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyMXNjb3JlLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy4kcGxheWVyMnNjb3JlLmlubmVyVGV4dCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZmlsbE1vZGVTZWxlY3RvcigpIHtcclxuICAgICAgICB0aGlzLmdhbWUuZ2V0R2FtZU1vZGVzKCkubWFwKChtb2RlKSA9PntcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XHJcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gbW9kZS5sYWJlbDtcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gbW9kZS5pZDtcclxuICAgICAgICAgICAgdGhpcy4kbW9kZVNlbGVjdG9yLmFkZChvcHRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY2hhbmdlR2FtZU1vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTW9kZT0gcGFyc2VJbnQodGhpcy4kbW9kZVNlbGVjdG9yLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHBsYXlBdXRvbWF0aWMoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvblBsYXllcjEgPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcclxuICAgICAgICBsZXQgb3B0aW9uUGxheWVyMiA9IHRoaXMuZ2FtZS5nZW5lcmF0ZUF1dG9tYXRpY09wdGlvbigpO1xyXG4gICAgICAgIGxldCBwbGF5UmVzdWx0ID0gdGhpcy5nYW1lLnBsYXkob3B0aW9uUGxheWVyMSwgb3B0aW9uUGxheWVyMik7XHJcbiAgICAgICAgdGhpcy5zaG93UGxheVJlc3VsdChvcHRpb25QbGF5ZXIxLCBvcHRpb25QbGF5ZXIyLCBwbGF5UmVzdWx0KTtcclxuICAgIH1cclxuICAgIHNlbGVjdE9wdGlvbihwbGF5ZXJPcHRpb24pIHtcclxuICAgICAgICBsZXQgY29tcHV0ZXJPcHRpb24gPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcclxuICAgICAgICBsZXQgcGxheVJlc3VsdCA9IHRoaXMuZ2FtZS5wbGF5KHBsYXllck9wdGlvbiwgY29tcHV0ZXJPcHRpb24pO1xyXG4gICAgICAgIHRoaXMuc2hvd1BsYXlSZXN1bHQocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbiwgcGxheVJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BsYXlSZXN1bHQocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbiwgcGxheVJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMucGFpbnRPcHRpb25zKHBsYXllck9wdGlvbiwgY29tcHV0ZXJPcHRpb24pO1xyXG4gICAgICAgIHRoaXMucGFpbnRTY29yZXModGhpcy5nYW1lLmdldFNjb3JlcygpKTtcclxuICAgICAgICB0aGlzLnBhaW50Um91bmQodGhpcy5nYW1lLmdldEN1cnJlbnRSb3VuZCgpKTtcclxuICAgICAgICB0aGlzLnBhaW50UGxheVdpbm5lck1zZyhwbGF5UmVzdWx0LndvbiwgdGhpcy4kcGxheVdpbm5lcik7XHJcblxyXG4gICAgICAgIGlmIChwbGF5UmVzdWx0Lmxhc3RSb3VuZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50RmluYWxXaW5uZXJDb250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5wYWludFBsYXlXaW5uZXJNc2codGhpcy5nYW1lLmdldEN1cnJlbnRXaW5uZXIoKSwgdGhpcy4kZmluYWxXaW5uZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhaW50RmluYWxXaW5uZXJDb250YWluZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYWludFBsYXlXaW5uZXJNc2cod2lubmVyLCBlbGVtZW50KSB7XHJcbiAgICAgICAgc3dpdGNoKHdpbm5lcikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMF07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLldJTk1FU1NBR0VTWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMl07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBhaW50U2NvcmVzKHNjb3Jlcykge1xyXG4gICAgICAgIHRoaXMuJHBsYXllcjFzY29yZS5pbm5lclRleHQgPSBzY29yZXMucGxheWVyMTtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIyc2NvcmUuaW5uZXJUZXh0ID0gc2NvcmVzLnBsYXllcjI7XHJcbiAgICB9XHJcbiAgICBwYWludFJvdW5kKHJvdW5kKSB7XHJcbiAgICAgICAgdGhpcy4kcm91bmRJbmRpY2F0b3IuaW5uZXJUZXh0ID0gcm91bmQ7XHJcbiAgICB9XHJcbiAgICBwYWludE9wdGlvbnMocGxheWVyMW9wdGlvbiwgcGxheWVyMm9wdGlvbikge1xyXG4gICAgICAgIGxldCBpbWFnZXBsYXllcjEgPSBgPGltZyBjbGFzcz1cImFuaW1hdGlvblVwXCIgc3JjPVwiL2Fzc2V0cy8ke3BsYXllcjFvcHRpb259LnN2Z1wiIC8+YCxcclxuICAgICAgICAgICAgaW1hZ2VwbGF5ZXIyID0gYDxpbWcgY2xhc3M9XCJhbmltYXRpb25VcFwiIHNyYz1cIi9hc3NldHMvJHtwbGF5ZXIyb3B0aW9ufS5zdmdcIiAvPmA7XHJcblxyXG4gICAgICAgIHRoaXMuJGZpcnN0UGxheWVyT3B0aW9uLmlubmVySFRNTCA9IGltYWdlcGxheWVyMTtcclxuICAgICAgICB0aGlzLiRzZWNvbmRQbGF5ZXJPcHRpb24uaW5uZXJIVE1MID0gaW1hZ2VwbGF5ZXIyO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lTW9kZXMsIGdhbWVUeXBlcykge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIyID0gMDtcclxuICAgICAgICB0aGlzLl9nYW1lVHlwZXMgPSBnYW1lVHlwZXM7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZSA9IHRoaXMuX2dhbWVUeXBlc1swXTtcclxuICAgICAgICB0aGlzLl9nYW1lTW9kZXMgPSBnYW1lTW9kZXM7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFJvdW5kID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZEdhbWVUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJvdW5kcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZU1vZGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lTW9kZXNcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY29yZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtwbGF5ZXIxOiB0aGlzLl9zY29yZVBsYXllcjEsIHBsYXllcjI6IHRoaXMuX3Njb3JlUGxheWVyMn07XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50Um91bmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVUeXBlc1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrT3B0aW9ucyhvcHRpb24xLCBvcHRpb24yKSB7XHJcblxyXG4gICAgICAgIGxldCBjb25kMSA9IHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUud2luc1tvcHRpb24xXTtcclxuICAgICAgICBsZXQgY29uZDIgPSB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlLndpbnNbb3B0aW9uMl07XHJcblxyXG4gICAgICAgIGlmIChjb25kMSAmJiBjb25kMS5pbmRleE9mKG9wdGlvbjIpID49IDApIHtcclxuICAgICAgICAgICAgLy9wbGF5ZXIgMSB3b25cclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmQyICYmIGNvbmQyLmluZGV4T2Yob3B0aW9uMSkgPj0gMCkge1xyXG4gICAgICAgICAgICAvL3BsYXllciAyIHdvblxyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGllXHJcbiAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5KG9wdGlvbjEsIG9wdGlvbjIpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3b24gPSB0aGlzLmNoZWNrT3B0aW9ucyhvcHRpb24xLCBvcHRpb24yKTtcclxuICAgICAgICAgICAgbGV0IGxhc3RSb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIxICs9IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3b24gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMiArPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRSb3VuZCA9PT0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSb3VuZCArPTE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9jdXJyZW50Um91bmQgPT09IHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUucm91bmRzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RSb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dvbjogd29uLCBsYXN0Um91bmQ6IGxhc3RSb3VuZCB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBnZW5lcmF0ZUF1dG9tYXRpY09wdGlvbigpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5vcHRpb25zLmxlbmd0aC0xKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUub3B0aW9uc1twb3NpdGlvbl0uaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRHYW1lKCkge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIyID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Um91bmQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRXaW5uZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zY29yZVBsYXllcjEgPiB0aGlzLl9zY29yZVBsYXllcjIpIHtcclxuICAgICAgICAgICAgLy9wbGF5ZXIgMSB3b25cclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Njb3JlUGxheWVyMiA+IHRoaXMuX3Njb3JlUGxheWVyMSkge1xyXG4gICAgICAgICAgICAvL3BsYXllciAyIHdvblxyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGllXHJcbiAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiY29uc3QgQ09ORklHID0ge1xyXG4gICAgZ2FtZVR5cGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgbmFtZTogXCJzdGFuZGFyZFwiLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICB7aWQ6J3BhcGVyJywgbmFtZTonUGFwZXInfSxcclxuICAgICAgICAgICAgICAgIHtpZDoncm9jaycsIG5hbWU6J1JvY2snLH0sXHJcbiAgICAgICAgICAgICAgICB7aWQ6J3NjaXNzb3InLCBuYW1lOidTY2lzc29yJ31cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2luczoge1xyXG4gICAgICAgICAgICAgICAgJ3BhcGVyJzogWydyb2NrJ10sXHJcbiAgICAgICAgICAgICAgICAnc2Npc3Nvcic6IFsncGFwZXInXSxcclxuICAgICAgICAgICAgICAgICdyb2NrJzogWydzY2lzc29yJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm91bmRzOiAzXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGdhbWVNb2RlczogW1xyXG4gICAgICAgIHsgaWQ6IDEsIGxhYmVsOiBcIlBsYXllciBWcyBDb21wdXRlclwifSxcclxuICAgICAgICB7IGlkOiAyLCBsYWJlbDogXCJDb21wdXRlciBWcyBDb21wdXRlclwifVxyXG4gICAgXVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENPTkZJR1xyXG4iLCJpbXBvcnQgQ09ORklHIGZyb20gJy4vZ2FtZUNvbmZpZy5qcydcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vZ2FtZS5qcydcclxuaW1wb3J0IFZpZXdDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlci5qcydcclxuXHJcbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShDT05GSUcuZ2FtZU1vZGVzLCBDT05GSUcuZ2FtZVR5cGVzKTtcclxuY29uc3Qgdmlld0NvbnRyb2xsZXIgPSBuZXcgVmlld0NvbnRyb2xsZXIoZ2FtZSk7XHJcblxyXG5nbG9iYWwuJHZpZXdDb250cm9sbGVyID0gdmlld0NvbnRyb2xsZXI7XHJcbiJdfQ==

//# sourceMappingURL=maps/app.js.map
