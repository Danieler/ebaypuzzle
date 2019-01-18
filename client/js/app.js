(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewController = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ViewController =
/*#__PURE__*/
function () {
  function ViewController(game) {
    _classCallCheck(this, ViewController);

    this.game = game;
    this.initDomSelectors(document);
    this.gameMode = game.getGameModes()[0].id;
    this.WINMESSAGES = ["Player1 Wins", "Player2 Wins", "Itś a Tie"];
    this.fillModeSelector();
  }

  _createClass(ViewController, [{
    key: "initDomSelectors",
    value: function initDomSelectors(element) {
      this.$main = element.getElementById('main');
      this.$roundIndicator = element.getElementById('round-indicator');
      this.$footer = element.getElementById('footer');
      this.$player1score = element.getElementById('player1score');
      this.$player2score = element.getElementById('player2score');
      this.$firstPlayerOption = element.getElementById('firstPlayerOption');
      this.$secondPlayerOption = element.getElementById('secondPlayerOption');
      this.$chooseContainer = element.getElementById('chooseContainer');
      this.$welcomeContainer = element.getElementById('welcomeContainer');
      this.$playWinner = element.getElementById('playWinner');
      this.$finalWinnerContainer = element.getElementById('finalWinnerContainer');
      this.$finalWinner = element.getElementById('finalWinner');
      this.$modeSelector = element.getElementById('modeSelector');
      this.$automaticContainer = element.getElementById('automaticContainer');
    }
  }, {
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

      if (this.$modeSelector) {
        this.game.getGameModes().map(function (mode) {
          var option = document.createElement("option");
          option.text = mode.label;
          option.value = mode.id;

          _this.$modeSelector.add(option);
        });
      }
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

exports.ViewController = ViewController;

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

var _controller = require("./controller.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game.Game(_gameConfig.default.gameModes, _gameConfig.default.gameTypes);
var viewController = new _controller.ViewController(game);
global.$viewController = viewController;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controller.js":1,"./game.js":2,"./gameConfig.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc291cmNlL2NvbnRyb2xsZXIuanMiLCJjbGllbnQvc291cmNlL2dhbWUuanMiLCJjbGllbnQvc291cmNlL2dhbWVDb25maWcuanMiLCJjbGllbnQvc291cmNlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztJQ0FhLGM7OztBQUVULDBCQUFZLElBQVosRUFBa0I7QUFBQTs7QUFDZCxTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxnQkFBTCxDQUFzQixRQUF0QjtBQUNBLFNBQUssUUFBTCxHQUFnQixJQUFJLENBQUMsWUFBTCxHQUFvQixDQUFwQixFQUF1QixFQUF2QztBQUNBLFNBQUssV0FBTCxHQUFtQixDQUNmLGNBRGUsRUFFZixjQUZlLEVBR2YsV0FIZSxDQUFuQjtBQUtBLFNBQUssZ0JBQUw7QUFDSDs7OztxQ0FFZ0IsTyxFQUFTO0FBRXRCLFdBQUssS0FBTCxHQUFlLE9BQU8sQ0FBQyxjQUFSLENBQXVCLE1BQXZCLENBQWY7QUFDQSxXQUFLLGVBQUwsR0FBdUIsT0FBTyxDQUFDLGNBQVIsQ0FBdUIsaUJBQXZCLENBQXZCO0FBQ0EsV0FBSyxPQUFMLEdBQWUsT0FBTyxDQUFDLGNBQVIsQ0FBdUIsUUFBdkIsQ0FBZjtBQUNBLFdBQUssYUFBTCxHQUFxQixPQUFPLENBQUMsY0FBUixDQUF1QixjQUF2QixDQUFyQjtBQUNBLFdBQUssYUFBTCxHQUFxQixPQUFPLENBQUMsY0FBUixDQUF1QixjQUF2QixDQUFyQjtBQUNBLFdBQUssa0JBQUwsR0FBMEIsT0FBTyxDQUFDLGNBQVIsQ0FBdUIsbUJBQXZCLENBQTFCO0FBQ0EsV0FBSyxtQkFBTCxHQUEyQixPQUFPLENBQUMsY0FBUixDQUF1QixvQkFBdkIsQ0FBM0I7QUFDQSxXQUFLLGdCQUFMLEdBQXdCLE9BQU8sQ0FBQyxjQUFSLENBQXVCLGlCQUF2QixDQUF4QjtBQUNB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R0FETyxDQURBO0FBa0JYLEVBQUEsU0FBUyxFQUFFLENBQ1A7QUFBRSxJQUFBLEVBQUUsRUFBRSxDQUFOO0FBQVMsSUFBQSxLQUFLLEVBQUU7QUFBaEIsR0FETyxFQUVQO0FBQUUsSUFBQSxFQUFFLEVBQUUsQ0FBTjtBQUFTLElBQUEsS0FBSyxFQUFFO0FBQWhCLEdBRk87QUFsQkEsQ0FBZjtlQXVCZSxNOzs7Ozs7O0FDdkJmOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFKLENBQVMsb0JBQU8sU0FBaEIsRUFBMkIsb0JBQU8sU0FBbEMsQ0FBYjtBQUNBLElBQU0sY0FBYyxHQUFHLElBQUksMEJBQUosQ0FBbUIsSUFBbkIsQ0FBdkI7QUFFQSxNQUFNLENBQUMsZUFBUCxHQUF5QixjQUF6QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBjbGFzcyBWaWV3Q29udHJvbGxlciB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xyXG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICAgICAgdGhpcy5pbml0RG9tU2VsZWN0b3JzKGRvY3VtZW50KTtcclxuICAgICAgICB0aGlzLmdhbWVNb2RlID0gZ2FtZS5nZXRHYW1lTW9kZXMoKVswXS5pZDtcclxuICAgICAgICB0aGlzLldJTk1FU1NBR0VTID0gW1xyXG4gICAgICAgICAgICBcIlBsYXllcjEgV2luc1wiLFxyXG4gICAgICAgICAgICBcIlBsYXllcjIgV2luc1wiLFxyXG4gICAgICAgICAgICBcIkl0xZsgYSBUaWVcIlxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5maWxsTW9kZVNlbGVjdG9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdERvbVNlbGVjdG9ycyhlbGVtZW50KSB7XHJcbiAgICBcclxuICAgICAgICB0aGlzLiRtYWluID0gICBlbGVtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluJyk7XHJcbiAgICAgICAgdGhpcy4kcm91bmRJbmRpY2F0b3IgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKCdyb3VuZC1pbmRpY2F0b3InKTtcclxuICAgICAgICB0aGlzLiRmb290ZXIgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKTtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIxc2NvcmUgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXIxc2NvcmUnKTtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIyc2NvcmUgPSBlbGVtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXIyc2NvcmUnKTtcclxuICAgICAgICB0aGlzLiRmaXJzdFBsYXllck9wdGlvbiA9IGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0UGxheWVyT3B0aW9uJyk7XHJcbiAgICAgICAgdGhpcy4kc2Vjb25kUGxheWVyT3B0aW9uID0gZWxlbWVudC5nZXRFbGVtZW50QnlJZCgnc2Vjb25kUGxheWVyT3B0aW9uJyk7XHJcbiAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyID0gZWxlbWVudC5nZXRFbGVtZW50QnlJZCgnY2hvb3NlQ29udGFpbmVyJyk7XHJcbiAgICAgICAgdGhpcy4kd2VsY29tZUNvbnRhaW5lciA9IGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVDb250YWluZXInKTtcclxuICAgICAgICB0aGlzLiRwbGF5V2lubmVyID0gZWxlbWVudC5nZXRFbGVtZW50QnlJZCgncGxheVdpbm5lcicpO1xyXG4gICAgICAgIHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyID0gZWxlbWVudC5nZXRFbGVtZW50QnlJZCgnZmluYWxXaW5uZXJDb250YWluZXInKTtcclxuICAgICAgICB0aGlzLiRmaW5hbFdpbm5lciA9IGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsV2lubmVyJyk7XHJcbiAgICAgICAgdGhpcy4kbW9kZVNlbGVjdG9yID0gIGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGVTZWxlY3RvcicpO1xyXG4gICAgICAgIHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lciA9IGVsZW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F1dG9tYXRpY0NvbnRhaW5lcicpO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0R2FtZSgpIHtcclxuICAgICAgICB0aGlzLiRyb3VuZEluZGljYXRvci5pbm5lclRleHQgPSB0aGlzLmdhbWUuZ2V0Q3VycmVudFJvdW5kKCk7XHJcblxyXG4gICAgICAgIC8vcGxheWVyIHZzIGNvbXB1dGVyID0xICwgY29tcHV0ZXIgdnMgY29tcHV0ZXIgPSAyXHJcbiAgICAgICAgaWYodGhpcy5nYW1lTW9kZSA9PT0gMSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLiRjaG9vc2VDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLiRjaG9vc2VDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuJG1haW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLiRmb290ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGZvb3Rlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLiR3ZWxjb21lQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLiR3ZWxjb21lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcclxuICAgICAgICAgICAgdGhpcy4kZmluYWxXaW5uZXJDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuJGZpcnN0UGxheWVyT3B0aW9uLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHRoaXMuJHNlY29uZFBsYXllck9wdGlvbi5pbm5lckhUTUwgPVwiXCI7XHJcbiAgICAgICAgdGhpcy4kcGxheVdpbm5lci5pbm5lclRleHQgPSAnJztcclxuICAgICAgICB0aGlzLiRwbGF5ZXIxc2NvcmUuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIyc2NvcmUuaW5uZXJUZXh0ID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBmaWxsTW9kZVNlbGVjdG9yKCkge1xyXG4gICAgICAgIGlmKHRoaXMuJG1vZGVTZWxlY3Rvcikge1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuZ2V0R2FtZU1vZGVzKCkubWFwKChtb2RlKSA9PntcclxuICAgICAgICAgICAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBtb2RlLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gbW9kZS5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuJG1vZGVTZWxlY3Rvci5hZGQob3B0aW9uKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hhbmdlR2FtZU1vZGUoKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lTW9kZT0gcGFyc2VJbnQodGhpcy4kbW9kZVNlbGVjdG9yLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHBsYXlBdXRvbWF0aWMoKSB7XHJcbiAgICAgICAgbGV0IG9wdGlvblBsYXllcjEgPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcclxuICAgICAgICBsZXQgb3B0aW9uUGxheWVyMiA9IHRoaXMuZ2FtZS5nZW5lcmF0ZUF1dG9tYXRpY09wdGlvbigpO1xyXG4gICAgICAgIGxldCBwbGF5UmVzdWx0ID0gdGhpcy5nYW1lLnBsYXkob3B0aW9uUGxheWVyMSwgb3B0aW9uUGxheWVyMik7XHJcbiAgICAgICAgdGhpcy5zaG93UGxheVJlc3VsdChvcHRpb25QbGF5ZXIxLCBvcHRpb25QbGF5ZXIyLCBwbGF5UmVzdWx0KTtcclxuICAgIH1cclxuICAgIHNlbGVjdE9wdGlvbihwbGF5ZXJPcHRpb24pIHtcclxuICAgICAgICBsZXQgY29tcHV0ZXJPcHRpb24gPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcclxuICAgICAgICBsZXQgcGxheVJlc3VsdCA9IHRoaXMuZ2FtZS5wbGF5KHBsYXllck9wdGlvbiwgY29tcHV0ZXJPcHRpb24pO1xyXG4gICAgICAgIHRoaXMuc2hvd1BsYXlSZXN1bHQocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbiwgcGxheVJlc3VsdCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1BsYXlSZXN1bHQocGxheWVyT3B0aW9uLCBjb21wdXRlck9wdGlvbiwgcGxheVJlc3VsdCkge1xyXG4gICAgICAgIHRoaXMucGFpbnRPcHRpb25zKHBsYXllck9wdGlvbiwgY29tcHV0ZXJPcHRpb24pO1xyXG4gICAgICAgIHRoaXMucGFpbnRTY29yZXModGhpcy5nYW1lLmdldFNjb3JlcygpKTtcclxuICAgICAgICB0aGlzLnBhaW50Um91bmQodGhpcy5nYW1lLmdldEN1cnJlbnRSb3VuZCgpKTtcclxuICAgICAgICB0aGlzLnBhaW50UGxheVdpbm5lck1zZyhwbGF5UmVzdWx0LndvbiwgdGhpcy4kcGxheVdpbm5lcik7XHJcblxyXG4gICAgICAgIGlmIChwbGF5UmVzdWx0Lmxhc3RSb3VuZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhaW50RmluYWxXaW5uZXJDb250YWluZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5wYWludFBsYXlXaW5uZXJNc2codGhpcy5nYW1lLmdldEN1cnJlbnRXaW5uZXIoKSwgdGhpcy4kZmluYWxXaW5uZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBhaW50RmluYWxXaW5uZXJDb250YWluZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwYWludFBsYXlXaW5uZXJNc2cod2lubmVyLCBlbGVtZW50KSB7XHJcbiAgICAgICAgc3dpdGNoKHdpbm5lcikge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMF07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSB0aGlzLldJTk1FU1NBR0VTWzFdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMl07XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBhaW50U2NvcmVzKHNjb3Jlcykge1xyXG4gICAgICAgIHRoaXMuJHBsYXllcjFzY29yZS5pbm5lclRleHQgPSBzY29yZXMucGxheWVyMTtcclxuICAgICAgICB0aGlzLiRwbGF5ZXIyc2NvcmUuaW5uZXJUZXh0ID0gc2NvcmVzLnBsYXllcjI7XHJcbiAgICB9XHJcbiAgICBwYWludFJvdW5kKHJvdW5kKSB7XHJcbiAgICAgICAgdGhpcy4kcm91bmRJbmRpY2F0b3IuaW5uZXJUZXh0ID0gcm91bmQ7XHJcbiAgICB9XHJcbiAgICBwYWludE9wdGlvbnMocGxheWVyMW9wdGlvbiwgcGxheWVyMm9wdGlvbikge1xyXG4gICAgICAgIGxldCBpbWFnZXBsYXllcjEgPSBgPGltZyBjbGFzcz1cImFuaW1hdGlvblVwXCIgc3JjPVwiL2Fzc2V0cy8ke3BsYXllcjFvcHRpb259LnN2Z1wiIC8+YCxcclxuICAgICAgICAgICAgaW1hZ2VwbGF5ZXIyID0gYDxpbWcgY2xhc3M9XCJhbmltYXRpb25VcFwiIHNyYz1cIi9hc3NldHMvJHtwbGF5ZXIyb3B0aW9ufS5zdmdcIiAvPmA7XHJcblxyXG4gICAgICAgIHRoaXMuJGZpcnN0UGxheWVyT3B0aW9uLmlubmVySFRNTCA9IGltYWdlcGxheWVyMTtcclxuICAgICAgICB0aGlzLiRzZWNvbmRQbGF5ZXJPcHRpb24uaW5uZXJIVE1MID0gaW1hZ2VwbGF5ZXIyO1xyXG5cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgR2FtZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihnYW1lTW9kZXMsIGdhbWVUeXBlcykge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIyID0gMDtcclxuICAgICAgICB0aGlzLl9nYW1lVHlwZXMgPSBnYW1lVHlwZXM7XHJcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZSA9IHRoaXMuX2dhbWVUeXBlc1swXTtcclxuICAgICAgICB0aGlzLl9nYW1lTW9kZXMgPSBnYW1lTW9kZXM7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFJvdW5kID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZWxlY3RlZEdhbWVUeXBlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJvdW5kcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FtZU1vZGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9nYW1lTW9kZXNcclxuICAgIH1cclxuXHJcbiAgICBnZXRTY29yZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtwbGF5ZXIxOiB0aGlzLl9zY29yZVBsYXllcjEsIHBsYXllcjI6IHRoaXMuX3Njb3JlUGxheWVyMn07XHJcbiAgICB9XHJcbiAgICBnZXRDdXJyZW50Um91bmQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRSb3VuZDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRHYW1lVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dhbWVUeXBlc1xyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrT3B0aW9ucyhvcHRpb24xLCBvcHRpb24yKSB7XHJcblxyXG4gICAgICAgIGxldCBjb25kMSA9IHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUud2luc1tvcHRpb24xXTtcclxuICAgICAgICBsZXQgY29uZDIgPSB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlLndpbnNbb3B0aW9uMl07XHJcblxyXG4gICAgICAgIGlmIChjb25kMSAmJiBjb25kMS5pbmRleE9mKG9wdGlvbjIpID49IDApIHtcclxuICAgICAgICAgICAgLy9wbGF5ZXIgMSB3b25cclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9IGVsc2UgaWYgKGNvbmQyICYmIGNvbmQyLmluZGV4T2Yob3B0aW9uMSkgPj0gMCkge1xyXG4gICAgICAgICAgICAvL3BsYXllciAyIHdvblxyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGllXHJcbiAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5KG9wdGlvbjEsIG9wdGlvbjIpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCB3b24gPSB0aGlzLmNoZWNrT3B0aW9ucyhvcHRpb24xLCBvcHRpb24yKTtcclxuICAgICAgICAgICAgbGV0IGxhc3RSb3VuZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHdvbiA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIxICs9IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh3b24gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMiArPSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRSb3VuZCA9PT0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRHYW1lKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRSb3VuZCArPTE7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9jdXJyZW50Um91bmQgPT09IHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUucm91bmRzICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RSb3VuZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge3dvbjogd29uLCBsYXN0Um91bmQ6IGxhc3RSb3VuZCB9O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICBnZW5lcmF0ZUF1dG9tYXRpY09wdGlvbigpIHtcclxuICAgICAgICBsZXQgcG9zaXRpb24gPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAodGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5vcHRpb25zLmxlbmd0aC0xKSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUub3B0aW9uc1twb3NpdGlvbl0uaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzZXRHYW1lKCkge1xyXG4gICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMSA9IDA7XHJcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIyID0gMDtcclxuICAgICAgICB0aGlzLl9jdXJyZW50Um91bmQgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEN1cnJlbnRXaW5uZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zY29yZVBsYXllcjEgPiB0aGlzLl9zY29yZVBsYXllcjIpIHtcclxuICAgICAgICAgICAgLy9wbGF5ZXIgMSB3b25cclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Njb3JlUGxheWVyMiA+IHRoaXMuX3Njb3JlUGxheWVyMSkge1xyXG4gICAgICAgICAgICAvL3BsYXllciAyIHdvblxyXG4gICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vdGllXHJcbiAgICAgICAgICAgIHJldHVybiAtMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuIiwiY29uc3QgQ09ORklHID0ge1xyXG4gICAgZ2FtZVR5cGVzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgbmFtZTogXCJzdGFuZGFyZFwiLFxyXG4gICAgICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICAgICAgICB7aWQ6J3BhcGVyJywgbmFtZTonUGFwZXInfSxcclxuICAgICAgICAgICAgICAgIHtpZDoncm9jaycsIG5hbWU6J1JvY2snLH0sXHJcbiAgICAgICAgICAgICAgICB7aWQ6J3NjaXNzb3InLCBuYW1lOidTY2lzc29yJ31cclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2luczoge1xyXG4gICAgICAgICAgICAgICAgJ3BhcGVyJzogWydyb2NrJ10sXHJcbiAgICAgICAgICAgICAgICAnc2Npc3Nvcic6IFsncGFwZXInXSxcclxuICAgICAgICAgICAgICAgICdyb2NrJzogWydzY2lzc29yJ11cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcm91bmRzOiAzXHJcbiAgICAgICAgfVxyXG4gICAgXSxcclxuICAgIGdhbWVNb2RlczogW1xyXG4gICAgICAgIHsgaWQ6IDEsIGxhYmVsOiBcIlBsYXllciBWcyBDb21wdXRlclwifSxcclxuICAgICAgICB7IGlkOiAyLCBsYWJlbDogXCJDb21wdXRlciBWcyBDb21wdXRlclwifVxyXG4gICAgXVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IENPTkZJR1xyXG4iLCJpbXBvcnQgQ09ORklHIGZyb20gJy4vZ2FtZUNvbmZpZy5qcydcclxuaW1wb3J0IHsgR2FtZSB9IGZyb20gJy4vZ2FtZS5qcydcclxuaW1wb3J0IHsgVmlld0NvbnRyb2xsZXIgfSBmcm9tICcuL2NvbnRyb2xsZXIuanMnXHJcblxyXG5jb25zdCBnYW1lID0gbmV3IEdhbWUoQ09ORklHLmdhbWVNb2RlcywgQ09ORklHLmdhbWVUeXBlcyk7XHJcbmNvbnN0IHZpZXdDb250cm9sbGVyID0gbmV3IFZpZXdDb250cm9sbGVyKGdhbWUpO1xyXG5cclxuZ2xvYmFsLiR2aWV3Q29udHJvbGxlciA9IHZpZXdDb250cm9sbGVyO1xyXG4iXX0=

//# sourceMappingURL=maps/app.js.map
