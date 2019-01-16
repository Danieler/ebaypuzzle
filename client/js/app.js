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
exports.default = void 0;

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
    key: "getGameModes",
    value: function getGameModes() {
      return this._gameModes;
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
    key: "getRounds",
    value: function getRounds() {
      return this._selectedGameType.rounds;
    }
  }, {
    key: "generateAutomaticOption",
    value: function generateAutomaticOption() {
      var position = Math.round(Math.random() * (this._selectedGameType.options.length - 1));
      return this._selectedGameType.options[position].id;
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

exports.default = Game;

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

var _game = _interopRequireDefault(require("./game.js"));

var _controller = _interopRequireDefault(require("./controller.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _game.default(_gameConfig.default.gameModes, _gameConfig.default.gameTypes);
var viewController = new _controller.default(game);
global.$viewController = viewController;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controller.js":1,"./game.js":2,"./gameConfig.js":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjbGllbnQvc291cmNlL2NvbnRyb2xsZXIuanMiLCJjbGllbnQvc291cmNlL2dhbWUuanMiLCJjbGllbnQvc291cmNlL2dhbWVDb25maWcuanMiLCJjbGllbnQvc291cmNlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7OztJQ0FxQixjOzs7QUFFakIsMEJBQVksSUFBWixFQUFrQjtBQUFBOztBQUNkLFNBQUssSUFBTCxHQUFZLElBQVo7QUFDQSxTQUFLLEtBQUwsR0FBZSxRQUFRLENBQUMsY0FBVCxDQUF3QixNQUF4QixDQUFmO0FBQ0EsU0FBSyxlQUFMLEdBQXVCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGlCQUF4QixDQUF2QjtBQUNBLFNBQUssT0FBTCxHQUFlLFFBQVEsQ0FBQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQSxTQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxTQUFLLGFBQUwsR0FBcUIsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FBckI7QUFDQSxTQUFLLGtCQUFMLEdBQTBCLFFBQVEsQ0FBQyxjQUFULENBQXdCLG1CQUF4QixDQUExQjtBQUNBLFNBQUssbUJBQUwsR0FBMkIsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isb0JBQXhCLENBQTNCO0FBQ0EsU0FBSyxnQkFBTCxHQUF3QixRQUFRLENBQUMsY0FBVCxDQUF3QixpQkFBeEIsQ0FBeEI7QUFDQSxTQUFLLGlCQUFMLEdBQXlCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGtCQUF4QixDQUF6QjtBQUNBLFNBQUssV0FBTCxHQUFtQixRQUFRLENBQUMsY0FBVCxDQUF3QixZQUF4QixDQUFuQjtBQUNBLFNBQUsscUJBQUwsR0FBNkIsUUFBUSxDQUFDLGNBQVQsQ0FBd0Isc0JBQXhCLENBQTdCO0FBQ0EsU0FBSyxZQUFMLEdBQW9CLFFBQVEsQ0FBQyxjQUFULENBQXdCLGFBQXhCLENBQXBCO0FBQ0EsU0FBSyxhQUFMLEdBQXNCLFFBQVEsQ0FBQyxjQUFULENBQXdCLGNBQXhCLENBQXRCO0FBQ0EsU0FBSyxtQkFBTCxHQUEyQixRQUFRLENBQUMsY0FBVCxDQUF3QixvQkFBeEIsQ0FBM0I7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsSUFBSSxDQUFDLFlBQUwsR0FBb0IsQ0FBcEIsRUFBdUIsRUFBdkM7QUFDQSxTQUFLLFdBQUwsR0FBbUIsQ0FDZixjQURlLEVBRWYsY0FGZSxFQUdmLFdBSGUsQ0FBbkI7QUFLQSxTQUFLLGdCQUFMO0FBQ0g7Ozs7Z0NBRVc7QUFDUixXQUFLLGVBQUwsQ0FBcUIsU0FBckIsR0FBaUMsS0FBSyxJQUFMLENBQVUsZUFBVixFQUFqQyxDQURRLENBR1I7O0FBQ0EsVUFBRyxLQUFLLFFBQUwsS0FBa0IsQ0FBckIsRUFBd0I7QUFDcEIsWUFBSSxLQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBQWdDLFFBQWhDLENBQXlDLFFBQXpDLENBQUosRUFBd0Q7QUFDcEQsZUFBSyxnQkFBTCxDQUFzQixTQUF0QixDQUFnQyxNQUFoQyxDQUF1QyxRQUF2QztBQUNIO0FBQ0osT0FKRCxNQUlPO0FBQ0gsWUFBSSxDQUFDLEtBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBZ0MsUUFBaEMsQ0FBeUMsUUFBekMsQ0FBTCxFQUF5RDtBQUNyRCxlQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBQWdDLEdBQWhDLENBQW9DLFFBQXBDO0FBQ0g7O0FBQ0QsWUFBSSxLQUFLLG1CQUFMLENBQXlCLFNBQXpCLENBQW1DLFFBQW5DLENBQTRDLFFBQTVDLENBQUosRUFBMkQ7QUFDdkQsZUFBSyxtQkFBTCxDQUF5QixTQUF6QixDQUFtQyxNQUFuQyxDQUEwQyxRQUExQztBQUNIO0FBQ0o7O0FBRUQsVUFBSSxLQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLFFBQXJCLENBQThCLFFBQTlCLENBQUosRUFBNkM7QUFDekMsYUFBSyxLQUFMLENBQVcsU0FBWCxDQUFxQixNQUFyQixDQUE0QixRQUE1QjtBQUNIOztBQUNELFVBQUksS0FBSyxPQUFMLENBQWEsU0FBYixDQUF1QixRQUF2QixDQUFnQyxRQUFoQyxDQUFKLEVBQStDO0FBQzNDLGFBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsTUFBdkIsQ0FBOEIsUUFBOUI7QUFDSDs7QUFDRCxVQUFJLENBQUMsS0FBSyxpQkFBTCxDQUF1QixTQUF2QixDQUFpQyxRQUFqQyxDQUEwQyxRQUExQyxDQUFMLEVBQTBEO0FBQ3RELGFBQUssaUJBQUwsQ0FBdUIsU0FBdkIsQ0FBaUMsR0FBakMsQ0FBcUMsUUFBckM7QUFDSDs7QUFFRCxVQUFJLENBQUMsS0FBSyxxQkFBTCxDQUEyQixTQUEzQixDQUFxQyxRQUFyQyxDQUE4QyxRQUE5QyxDQUFMLEVBQThEO0FBQzFELGFBQUsscUJBQUwsQ0FBMkIsU0FBM0IsQ0FBcUMsR0FBckMsQ0FBeUMsUUFBekM7QUFDSDs7QUFDRCxXQUFLLGtCQUFMLENBQXdCLFNBQXhCLEdBQW9DLEVBQXBDO0FBQ0EsV0FBSyxtQkFBTCxDQUF5QixTQUF6QixHQUFvQyxFQUFwQztBQUNBLFdBQUssV0FBTCxDQUFpQixTQUFqQixHQUE2QixFQUE3QjtBQUNBLFdBQUssYUFBTCxDQUFtQixTQUFuQixHQUErQixFQUEvQjtBQUNBLFdBQUssYUFBTCxDQUFtQixTQUFuQixHQUErQixFQUEvQjtBQUNIOzs7dUNBRWtCO0FBQUE7O0FBQ2YsV0FBSyxJQUFMLENBQVUsWUFBVixHQUF5QixHQUF6QixDQUE2QixVQUFDLElBQUQsRUFBUztBQUNsQyxZQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsUUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLElBQUksQ0FBQyxLQUFuQjtBQUNBLFFBQUEsTUFBTSxDQUFDLEtBQVAsR0FBZSxJQUFJLENBQUMsRUFBcEI7O0FBQ0EsUUFBQSxLQUFJLENBQUMsYUFBTCxDQUFtQixHQUFuQixDQUF1QixNQUF2QjtBQUNILE9BTEQ7QUFNSDs7O3FDQUNnQjtBQUNiLFdBQUssUUFBTCxHQUFlLFFBQVEsQ0FBQyxLQUFLLGFBQUwsQ0FBbUIsS0FBcEIsQ0FBdkI7QUFDSDs7O29DQUNlO0FBQ1osVUFBSSxhQUFhLEdBQUcsS0FBSyxJQUFMLENBQVUsdUJBQVYsRUFBcEI7QUFDQSxVQUFJLGFBQWEsR0FBRyxLQUFLLElBQUwsQ0FBVSx1QkFBVixFQUFwQjtBQUNBLFVBQUksVUFBVSxHQUFHLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxhQUFmLEVBQThCLGFBQTlCLENBQWpCO0FBQ0EsV0FBSyxjQUFMLENBQW9CLGFBQXBCLEVBQW1DLGFBQW5DLEVBQWtELFVBQWxEO0FBQ0g7OztpQ0FDWSxZLEVBQWM7QUFDdkIsVUFBSSxjQUFjLEdBQUcsS0FBSyxJQUFMLENBQVUsdUJBQVYsRUFBckI7QUFDQSxVQUFJLFVBQVUsR0FBRyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsWUFBZixFQUE2QixjQUE3QixDQUFqQjtBQUNBLFdBQUssY0FBTCxDQUFvQixZQUFwQixFQUFrQyxjQUFsQyxFQUFrRCxVQUFsRDtBQUNIOzs7bUNBRWMsWSxFQUFjLGMsRUFBZ0IsVSxFQUFZO0FBQ3JELFdBQUssWUFBTCxDQUFrQixZQUFsQixFQUFnQyxjQUFoQztBQUNBLFdBQUssV0FBTCxDQUFpQixLQUFLLElBQUwsQ0FBVSxTQUFWLEVBQWpCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLEtBQUssSUFBTCxDQUFVLGVBQVYsRUFBaEI7QUFDQSxXQUFLLGtCQUFMLENBQXdCLFVBQVUsQ0FBQyxHQUFuQyxFQUF3QyxLQUFLLFdBQTdDOztBQUVBLFVBQUksVUFBVSxDQUFDLFNBQVgsS0FBeUIsSUFBN0IsRUFBbUM7QUFDL0IsYUFBSyx5QkFBTDtBQUNBLGFBQUssa0JBQUwsQ0FBd0IsS0FBSyxJQUFMLENBQVUsZ0JBQVYsRUFBeEIsRUFBc0QsS0FBSyxZQUEzRDtBQUNBLGFBQUssSUFBTCxDQUFVLFNBQVY7O0FBQ0EsWUFBSSxDQUFDLEtBQUssZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FBZ0MsUUFBaEMsQ0FBeUMsUUFBekMsQ0FBTCxFQUF5RDtBQUNyRCxlQUFLLGdCQUFMLENBQXNCLFNBQXRCLENBQWdDLEdBQWhDLENBQW9DLFFBQXBDO0FBQ0g7O0FBQ0QsWUFBSSxDQUFDLEtBQUssbUJBQUwsQ0FBeUIsU0FBekIsQ0FBbUMsUUFBbkMsQ0FBNEMsUUFBNUMsQ0FBTCxFQUE0RDtBQUN4RCxlQUFLLG1CQUFMLENBQXlCLFNBQXpCLENBQW1DLEdBQW5DLENBQXVDLFFBQXZDO0FBQ0g7QUFDSjtBQUNKOzs7Z0RBRTJCO0FBQ3hCLFVBQUksS0FBSyxxQkFBTCxDQUEyQixTQUEzQixDQUFxQyxRQUFyQyxDQUE4QyxRQUE5QyxDQUFKLEVBQTZEO0FBQ3pELGFBQUsscUJBQUwsQ0FBMkIsU0FBM0IsQ0FBcUMsTUFBckMsQ0FBNEMsUUFBNUM7QUFDSDtBQUNKOzs7dUNBQ2tCLE0sRUFBUSxPLEVBQVM7QUFDaEMsY0FBTyxNQUFQO0FBQ0ksYUFBSyxDQUFMO0FBQ0ksVUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBcEI7QUFDQTs7QUFDSixhQUFLLENBQUw7QUFDSSxVQUFBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLEtBQUssV0FBTCxDQUFpQixDQUFqQixDQUFwQjtBQUNBOztBQUNKLGFBQUssQ0FBQyxDQUFOO0FBQ0ksVUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixLQUFLLFdBQUwsQ0FBaUIsQ0FBakIsQ0FBcEI7QUFDQTs7QUFDSjtBQUNJO0FBWFI7QUFhSDs7O2dDQUNXLE0sRUFBUTtBQUNoQixXQUFLLGFBQUwsQ0FBbUIsU0FBbkIsR0FBK0IsTUFBTSxDQUFDLE9BQXRDO0FBQ0EsV0FBSyxhQUFMLENBQW1CLFNBQW5CLEdBQStCLE1BQU0sQ0FBQyxPQUF0QztBQUNIOzs7K0JBQ1UsSyxFQUFPO0FBQ2QsV0FBSyxlQUFMLENBQXFCLFNBQXJCLEdBQWlDLEtBQWpDO0FBQ0g7OztpQ0FDWSxhLEVBQWUsYSxFQUFlO0FBQ3ZDLFVBQUksWUFBWSxnQ0FBd0IsYUFBeEIsY0FBaEI7QUFBQSxVQUNJLFlBQVksZ0NBQXdCLGFBQXhCLGNBRGhCO0FBR0EsV0FBSyxrQkFBTCxDQUF3QixTQUF4QixHQUFvQyxZQUFwQztBQUNBLFdBQUssbUJBQUwsQ0FBeUIsU0FBekIsR0FBcUMsWUFBckM7QUFFSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzVJZ0IsSTs7O0FBQ2pCLGdCQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0M7QUFBQTs7QUFDOUIsU0FBSyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBSyxhQUFMLEdBQXFCLENBQXJCO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLFNBQWxCO0FBQ0EsU0FBSyxpQkFBTCxHQUF5QixLQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBekI7QUFDQSxTQUFLLFVBQUwsR0FBa0IsU0FBbEI7QUFDQSxTQUFLLGFBQUwsR0FBcUIsQ0FBckI7QUFDSDs7OzttQ0FFYztBQUNYLGFBQU8sS0FBSyxVQUFaO0FBQ0g7Ozt5QkFFSSxPLEVBQVMsTyxFQUFTO0FBRWYsVUFBSSxHQUFHLEdBQUcsS0FBSyxZQUFMLENBQWtCLE9BQWxCLEVBQTJCLE9BQTNCLENBQVY7QUFDQSxVQUFJLFNBQVMsR0FBRyxLQUFoQjs7QUFFQSxVQUFJLEdBQUcsS0FBSyxDQUFaLEVBQWU7QUFDWCxhQUFLLGFBQUwsSUFBc0IsQ0FBdEI7QUFDSCxPQUZELE1BR0ssSUFBSSxHQUFHLEtBQUssQ0FBWixFQUFlO0FBQ2hCLGFBQUssYUFBTCxJQUFzQixDQUF0QjtBQUNIOztBQUNELFVBQUksS0FBSyxhQUFMLEtBQXVCLEtBQUssaUJBQUwsQ0FBdUIsTUFBbEQsRUFBMEQ7QUFDdEQsYUFBSyxTQUFMO0FBQ0EsZUFBTyxJQUFQO0FBQ0gsT0FIRCxNQUdPO0FBQ0gsYUFBSyxhQUFMLElBQXFCLENBQXJCOztBQUNBLFlBQUcsS0FBSyxhQUFMLEtBQXVCLEtBQUssaUJBQUwsQ0FBdUIsTUFBakQsRUFBMEQ7QUFDdEQsVUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNIOztBQUNELGVBQU87QUFBQyxVQUFBLEdBQUcsRUFBRSxHQUFOO0FBQVcsVUFBQSxTQUFTLEVBQUU7QUFBdEIsU0FBUDtBQUNIO0FBRVI7OztpQ0FFWSxPLEVBQVMsTyxFQUFTO0FBRTNCLFVBQUksS0FBSyxHQUFHLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBWjtBQUNBLFVBQUksS0FBSyxHQUFHLEtBQUssaUJBQUwsQ0FBdUIsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBWjs7QUFFQSxVQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTixDQUFjLE9BQWQsS0FBMEIsQ0FBdkMsRUFBMEM7QUFDdEM7QUFDQSxlQUFPLENBQVA7QUFDSCxPQUhELE1BR08sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU4sQ0FBYyxPQUFkLEtBQTBCLENBQXZDLEVBQTBDO0FBQzdDO0FBQ0EsZUFBTyxDQUFQO0FBQ0gsT0FITSxNQUdBO0FBQ0g7QUFDQSxlQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0o7OztnQ0FFVztBQUNSLGFBQU8sS0FBSyxpQkFBTCxDQUF1QixNQUE5QjtBQUNIOzs7OENBRXlCO0FBQ3RCLFVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsTUFBaUIsS0FBSyxpQkFBTCxDQUF1QixPQUF2QixDQUErQixNQUEvQixHQUFzQyxDQUF2RCxDQUFYLENBQWY7QUFDQSxhQUFPLEtBQUssaUJBQUwsQ0FBdUIsT0FBdkIsQ0FBK0IsUUFBL0IsRUFBeUMsRUFBaEQ7QUFDSDs7O2dDQUVXO0FBQ1IsYUFBTztBQUFDLFFBQUEsT0FBTyxFQUFFLEtBQUssYUFBZjtBQUE4QixRQUFBLE9BQU8sRUFBRSxLQUFLO0FBQTVDLE9BQVA7QUFDSDs7O3NDQUNpQjtBQUNkLGFBQU8sS0FBSyxhQUFaO0FBQ0g7OztnQ0FFVztBQUNSLFdBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNBLFdBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNBLFdBQUssYUFBTCxHQUFxQixDQUFyQjtBQUNIOzs7dUNBRWtCO0FBRWYsVUFBSSxLQUFLLGFBQUwsR0FBcUIsS0FBSyxhQUE5QixFQUE2QztBQUN6QztBQUNBLGVBQU8sQ0FBUDtBQUNILE9BSEQsTUFHTyxJQUFJLEtBQUssYUFBTCxHQUFxQixLQUFLLGFBQTlCLEVBQTZDO0FBQ2hEO0FBQ0EsZUFBTyxDQUFQO0FBQ0gsT0FITSxNQUdBO0FBQ0g7QUFDQSxlQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ3pGTCxJQUFNLE1BQU0sR0FBRztBQUNYLEVBQUEsU0FBUyxFQUFFLENBQ1A7QUFDSSxJQUFBLEVBQUUsRUFBRSxDQURSO0FBRUksSUFBQSxJQUFJLEVBQUUsVUFGVjtBQUdJLElBQUEsT0FBTyxFQUFFLENBQ0w7QUFBQyxNQUFBLEVBQUUsRUFBQyxPQUFKO0FBQWEsTUFBQSxJQUFJLEVBQUM7QUFBbEIsS0FESyxFQUVMO0FBQUMsTUFBQSxFQUFFLEVBQUMsTUFBSjtBQUFZLE1BQUEsSUFBSSxFQUFDO0FBQWpCLEtBRkssRUFHTDtBQUFDLE1BQUEsRUFBRSxFQUFDLFNBQUo7QUFBZSxNQUFBLElBQUksRUFBQztBQUFwQixLQUhLLENBSGI7QUFRSSxJQUFBLElBQUksRUFBRTtBQUNGLGVBQVMsQ0FBQyxNQUFELENBRFA7QUFFRixpQkFBVyxDQUFDLE9BQUQsQ0FGVDtBQUdGLGNBQVEsQ0FBQyxTQUFEO0FBSE4sS0FSVjtBQWFJLElBQUEsTUFBTSxFQUFFO0FBYlosR0FETyxDQURBO0FBa0JYLEVBQUEsU0FBUyxFQUFFLENBQ1A7QUFBRSxJQUFBLEVBQUUsRUFBRSxDQUFOO0FBQVMsSUFBQSxLQUFLLEVBQUU7QUFBaEIsR0FETyxFQUVQO0FBQUUsSUFBQSxFQUFFLEVBQUUsQ0FBTjtBQUFTLElBQUEsS0FBSyxFQUFFO0FBQWhCLEdBRk87QUFsQkEsQ0FBZjtlQXVCZSxNOzs7Ozs7O0FDdkJmOztBQUNBOztBQUNBOzs7O0FBRUEsSUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFKLENBQVMsb0JBQU8sU0FBaEIsRUFBMkIsb0JBQU8sU0FBbEMsQ0FBYjtBQUNBLElBQU0sY0FBYyxHQUFHLElBQUksbUJBQUosQ0FBbUIsSUFBbkIsQ0FBdkI7QUFFQSxNQUFNLENBQUMsZUFBUCxHQUF5QixjQUF6QiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy4kbWFpbiA9ICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21haW4nKTtcbiAgICAgICAgdGhpcy4kcm91bmRJbmRpY2F0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm91bmQtaW5kaWNhdG9yJyk7XG4gICAgICAgIHRoaXMuJGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKTtcbiAgICAgICAgdGhpcy4kcGxheWVyMXNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllcjFzY29yZScpO1xuICAgICAgICB0aGlzLiRwbGF5ZXIyc2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyMnNjb3JlJyk7XG4gICAgICAgIHRoaXMuJGZpcnN0UGxheWVyT3B0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpcnN0UGxheWVyT3B0aW9uJyk7XG4gICAgICAgIHRoaXMuJHNlY29uZFBsYXllck9wdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWNvbmRQbGF5ZXJPcHRpb24nKTtcbiAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nob29zZUNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiR3ZWxjb21lQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlbGNvbWVDb250YWluZXInKTtcbiAgICAgICAgdGhpcy4kcGxheVdpbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5V2lubmVyJyk7XG4gICAgICAgIHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsV2lubmVyQ29udGFpbmVyJyk7XG4gICAgICAgIHRoaXMuJGZpbmFsV2lubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsV2lubmVyJyk7XG4gICAgICAgIHRoaXMuJG1vZGVTZWxlY3RvciA9ICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kZVNlbGVjdG9yJyk7XG4gICAgICAgIHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdXRvbWF0aWNDb250YWluZXInKTtcbiAgICAgICAgdGhpcy5nYW1lTW9kZSA9IGdhbWUuZ2V0R2FtZU1vZGVzKClbMF0uaWQ7XG4gICAgICAgIHRoaXMuV0lOTUVTU0FHRVMgPSBbXG4gICAgICAgICAgICBcIlBsYXllcjEgV2luc1wiLFxuICAgICAgICAgICAgXCJQbGF5ZXIyIFdpbnNcIixcbiAgICAgICAgICAgIFwiSXTFmyBhIFRpZVwiXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuZmlsbE1vZGVTZWxlY3RvcigpO1xuICAgIH1cblxuICAgIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgdGhpcy4kcm91bmRJbmRpY2F0b3IuaW5uZXJUZXh0ID0gdGhpcy5nYW1lLmdldEN1cnJlbnRSb3VuZCgpO1xuXG4gICAgICAgIC8vcGxheWVyIHZzIGNvbXB1dGVyID0xICwgY29tcHV0ZXIgdnMgY29tcHV0ZXIgPSAyXG4gICAgICAgIGlmKHRoaXMuZ2FtZU1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiRjaG9vc2VDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLiRjaG9vc2VDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRhdXRvbWF0aWNDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy4kbWFpbi5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgIHRoaXMuJG1haW4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuJGZvb3Rlci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgIHRoaXMuJGZvb3Rlci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuJHdlbGNvbWVDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGlkZGVuXCIpKSB7XG4gICAgICAgICAgICB0aGlzLiR3ZWxjb21lQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgIHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGZpcnN0UGxheWVyT3B0aW9uLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLiRzZWNvbmRQbGF5ZXJPcHRpb24uaW5uZXJIVE1MID1cIlwiO1xuICAgICAgICB0aGlzLiRwbGF5V2lubmVyLmlubmVyVGV4dCA9ICcnO1xuICAgICAgICB0aGlzLiRwbGF5ZXIxc2NvcmUuaW5uZXJUZXh0ID0gXCJcIjtcbiAgICAgICAgdGhpcy4kcGxheWVyMnNjb3JlLmlubmVyVGV4dCA9IFwiXCI7XG4gICAgfVxuXG4gICAgZmlsbE1vZGVTZWxlY3RvcigpIHtcbiAgICAgICAgdGhpcy5nYW1lLmdldEdhbWVNb2RlcygpLm1hcCgobW9kZSkgPT57XG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0ID0gbW9kZS5sYWJlbDtcbiAgICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IG1vZGUuaWQ7XG4gICAgICAgICAgICB0aGlzLiRtb2RlU2VsZWN0b3IuYWRkKG9wdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjaGFuZ2VHYW1lTW9kZSgpIHtcbiAgICAgICAgdGhpcy5nYW1lTW9kZT0gcGFyc2VJbnQodGhpcy4kbW9kZVNlbGVjdG9yLnZhbHVlKTtcbiAgICB9XG4gICAgcGxheUF1dG9tYXRpYygpIHtcbiAgICAgICAgbGV0IG9wdGlvblBsYXllcjEgPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcbiAgICAgICAgbGV0IG9wdGlvblBsYXllcjIgPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcbiAgICAgICAgbGV0IHBsYXlSZXN1bHQgPSB0aGlzLmdhbWUucGxheShvcHRpb25QbGF5ZXIxLCBvcHRpb25QbGF5ZXIyKTtcbiAgICAgICAgdGhpcy5zaG93UGxheVJlc3VsdChvcHRpb25QbGF5ZXIxLCBvcHRpb25QbGF5ZXIyLCBwbGF5UmVzdWx0KTtcbiAgICB9XG4gICAgc2VsZWN0T3B0aW9uKHBsYXllck9wdGlvbikge1xuICAgICAgICBsZXQgY29tcHV0ZXJPcHRpb24gPSB0aGlzLmdhbWUuZ2VuZXJhdGVBdXRvbWF0aWNPcHRpb24oKTtcbiAgICAgICAgbGV0IHBsYXlSZXN1bHQgPSB0aGlzLmdhbWUucGxheShwbGF5ZXJPcHRpb24sIGNvbXB1dGVyT3B0aW9uKTtcbiAgICAgICAgdGhpcy5zaG93UGxheVJlc3VsdChwbGF5ZXJPcHRpb24sIGNvbXB1dGVyT3B0aW9uLCBwbGF5UmVzdWx0KTtcbiAgICB9XG5cbiAgICBzaG93UGxheVJlc3VsdChwbGF5ZXJPcHRpb24sIGNvbXB1dGVyT3B0aW9uLCBwbGF5UmVzdWx0KSB7XG4gICAgICAgIHRoaXMucGFpbnRPcHRpb25zKHBsYXllck9wdGlvbiwgY29tcHV0ZXJPcHRpb24pO1xuICAgICAgICB0aGlzLnBhaW50U2NvcmVzKHRoaXMuZ2FtZS5nZXRTY29yZXMoKSk7XG4gICAgICAgIHRoaXMucGFpbnRSb3VuZCh0aGlzLmdhbWUuZ2V0Q3VycmVudFJvdW5kKCkpO1xuICAgICAgICB0aGlzLnBhaW50UGxheVdpbm5lck1zZyhwbGF5UmVzdWx0LndvbiwgdGhpcy4kcGxheVdpbm5lcik7XG5cbiAgICAgICAgaWYgKHBsYXlSZXN1bHQubGFzdFJvdW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0aGlzLnBhaW50RmluYWxXaW5uZXJDb250YWluZXIoKTtcbiAgICAgICAgICAgIHRoaXMucGFpbnRQbGF5V2lubmVyTXNnKHRoaXMuZ2FtZS5nZXRDdXJyZW50V2lubmVyKCksIHRoaXMuJGZpbmFsV2lubmVyKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5yZXNldEdhbWUoKTtcbiAgICAgICAgICAgIGlmICghdGhpcy4kY2hvb3NlQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNob29zZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy4kYXV0b21hdGljQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucyhcImhpZGRlblwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGF1dG9tYXRpY0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhaW50RmluYWxXaW5uZXJDb250YWluZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLiRmaW5hbFdpbm5lckNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoXCJoaWRkZW5cIikpIHtcbiAgICAgICAgICAgIHRoaXMuJGZpbmFsV2lubmVyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhaW50UGxheVdpbm5lck1zZyh3aW5uZXIsIGVsZW1lbnQpIHtcbiAgICAgICAgc3dpdGNoKHdpbm5lcikge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5XSU5NRVNTQUdFU1swXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMuV0lOTUVTU0FHRVNbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIC0xOlxuICAgICAgICAgICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5XSU5NRVNTQUdFU1syXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcGFpbnRTY29yZXMoc2NvcmVzKSB7XG4gICAgICAgIHRoaXMuJHBsYXllcjFzY29yZS5pbm5lclRleHQgPSBzY29yZXMucGxheWVyMTtcbiAgICAgICAgdGhpcy4kcGxheWVyMnNjb3JlLmlubmVyVGV4dCA9IHNjb3Jlcy5wbGF5ZXIyO1xuICAgIH1cbiAgICBwYWludFJvdW5kKHJvdW5kKSB7XG4gICAgICAgIHRoaXMuJHJvdW5kSW5kaWNhdG9yLmlubmVyVGV4dCA9IHJvdW5kO1xuICAgIH1cbiAgICBwYWludE9wdGlvbnMocGxheWVyMW9wdGlvbiwgcGxheWVyMm9wdGlvbikge1xuICAgICAgICBsZXQgaW1hZ2VwbGF5ZXIxID0gYDxpbWcgc3JjPVwiL2Fzc2V0cy8ke3BsYXllcjFvcHRpb259LnN2Z1wiIC8+YCxcbiAgICAgICAgICAgIGltYWdlcGxheWVyMiA9IGA8aW1nIHNyYz1cIi9hc3NldHMvJHtwbGF5ZXIyb3B0aW9ufS5zdmdcIiAvPmA7XG5cbiAgICAgICAgdGhpcy4kZmlyc3RQbGF5ZXJPcHRpb24uaW5uZXJIVE1MID0gaW1hZ2VwbGF5ZXIxO1xuICAgICAgICB0aGlzLiRzZWNvbmRQbGF5ZXJPcHRpb24uaW5uZXJIVE1MID0gaW1hZ2VwbGF5ZXIyO1xuXG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG4gICAgY29uc3RydWN0b3IoZ2FtZU1vZGVzLCBnYW1lVHlwZXMpIHtcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIxID0gMDtcbiAgICAgICAgdGhpcy5fc2NvcmVQbGF5ZXIyID0gMDtcbiAgICAgICAgdGhpcy5fZ2FtZVR5cGVzID0gZ2FtZVR5cGVzO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlID0gdGhpcy5fZ2FtZVR5cGVzWzBdO1xuICAgICAgICB0aGlzLl9nYW1lTW9kZXMgPSBnYW1lTW9kZXM7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRSb3VuZCA9IDA7XG4gICAgfVxuXG4gICAgZ2V0R2FtZU1vZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2FtZU1vZGVzXG4gICAgfVxuXG4gICAgcGxheShvcHRpb24xLCBvcHRpb24yKSB7XG5cbiAgICAgICAgICAgIGxldCB3b24gPSB0aGlzLmNoZWNrT3B0aW9ucyhvcHRpb24xLCBvcHRpb24yKTtcbiAgICAgICAgICAgIGxldCBsYXN0Um91bmQgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHdvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Njb3JlUGxheWVyMSArPSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3b24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY29yZVBsYXllcjIgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuX2N1cnJlbnRSb3VuZCA9PT0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0R2FtZSgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdXJyZW50Um91bmQgKz0xO1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRSb3VuZCA9PT0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5yb3VuZHMgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RSb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7d29uOiB3b24sIGxhc3RSb3VuZDogbGFzdFJvdW5kIH07XG4gICAgICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjaGVja09wdGlvbnMob3B0aW9uMSwgb3B0aW9uMikge1xuXG4gICAgICAgIGxldCBjb25kMSA9IHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUud2luc1tvcHRpb24xXTtcbiAgICAgICAgbGV0IGNvbmQyID0gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS53aW5zW29wdGlvbjJdO1xuXG4gICAgICAgIGlmIChjb25kMSAmJiBjb25kMS5pbmRleE9mKG9wdGlvbjIpID49IDApIHtcbiAgICAgICAgICAgIC8vcGxheWVyIDEgd29uXG4gICAgICAgICAgICByZXR1cm4gMFxuICAgICAgICB9IGVsc2UgaWYgKGNvbmQyICYmIGNvbmQyLmluZGV4T2Yob3B0aW9uMSkgPj0gMCkge1xuICAgICAgICAgICAgLy9wbGF5ZXIgMiB3b25cbiAgICAgICAgICAgIHJldHVybiAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3RpZVxuICAgICAgICAgICAgcmV0dXJuIC0xXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRSb3VuZHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZEdhbWVUeXBlLnJvdW5kcztcbiAgICB9XG5cbiAgICBnZW5lcmF0ZUF1dG9tYXRpY09wdGlvbigpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKHRoaXMuX3NlbGVjdGVkR2FtZVR5cGUub3B0aW9ucy5sZW5ndGgtMSkpO1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRHYW1lVHlwZS5vcHRpb25zW3Bvc2l0aW9uXS5pZDtcbiAgICB9XG5cbiAgICBnZXRTY29yZXMoKSB7XG4gICAgICAgIHJldHVybiB7cGxheWVyMTogdGhpcy5fc2NvcmVQbGF5ZXIxLCBwbGF5ZXIyOiB0aGlzLl9zY29yZVBsYXllcjJ9O1xuICAgIH1cbiAgICBnZXRDdXJyZW50Um91bmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Um91bmQ7XG4gICAgfVxuXG4gICAgcmVzZXRHYW1lKCkge1xuICAgICAgICB0aGlzLl9zY29yZVBsYXllcjEgPSAwO1xuICAgICAgICB0aGlzLl9zY29yZVBsYXllcjIgPSAwO1xuICAgICAgICB0aGlzLl9jdXJyZW50Um91bmQgPSAwO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRXaW5uZXIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Njb3JlUGxheWVyMSA+IHRoaXMuX3Njb3JlUGxheWVyMikge1xuICAgICAgICAgICAgLy9wbGF5ZXIgMSB3b25cbiAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fc2NvcmVQbGF5ZXIyID4gdGhpcy5fc2NvcmVQbGF5ZXIxKSB7XG4gICAgICAgICAgICAvL3BsYXllciAyIHdvblxuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdGllXG4gICAgICAgICAgICByZXR1cm4gLTFcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiY29uc3QgQ09ORklHID0ge1xuICAgIGdhbWVUeXBlczogW1xuICAgICAgICB7XG4gICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgIG5hbWU6IFwic3RhbmRhcmRcIixcbiAgICAgICAgICAgIG9wdGlvbnM6IFtcbiAgICAgICAgICAgICAgICB7aWQ6J3BhcGVyJywgbmFtZTonUGFwZXInfSxcbiAgICAgICAgICAgICAgICB7aWQ6J3JvY2snLCBuYW1lOidSb2NrJyx9LFxuICAgICAgICAgICAgICAgIHtpZDonc2Npc3NvcicsIG5hbWU6J1NjaXNzb3InfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHdpbnM6IHtcbiAgICAgICAgICAgICAgICAncGFwZXInOiBbJ3JvY2snXSxcbiAgICAgICAgICAgICAgICAnc2Npc3Nvcic6IFsncGFwZXInXSxcbiAgICAgICAgICAgICAgICAncm9jayc6IFsnc2Npc3NvciddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcm91bmRzOiAzXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGdhbWVNb2RlczogW1xuICAgICAgICB7IGlkOiAxLCBsYWJlbDogXCJQbGF5ZXIgVnMgQ29tcHV0ZXJcIn0sXG4gICAgICAgIHsgaWQ6IDIsIGxhYmVsOiBcIkNvbXB1dGVyIFZzIENvbXB1dGVyXCJ9XG4gICAgXVxufVxuZXhwb3J0IGRlZmF1bHQgQ09ORklHXG4iLCJpbXBvcnQgQ09ORklHIGZyb20gJy4vZ2FtZUNvbmZpZy5qcydcbmltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZS5qcydcbmltcG9ydCBWaWV3Q29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXIuanMnXG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZShDT05GSUcuZ2FtZU1vZGVzLCBDT05GSUcuZ2FtZVR5cGVzKTtcbmNvbnN0IHZpZXdDb250cm9sbGVyID0gbmV3IFZpZXdDb250cm9sbGVyKGdhbWUpO1xuXG5nbG9iYWwuJHZpZXdDb250cm9sbGVyID0gdmlld0NvbnRyb2xsZXI7XG4iXX0=

//# sourceMappingURL=maps/app.js.map
