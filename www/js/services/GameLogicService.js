angular.module('introGame.gameLogicService', ['introGame.songsService'])
  .service('GameLogicService', ['SongsService', function(SongsService){
    var self = this;

    self.turnsInGame;
    self.turnNumber;

    self.isGameEnd = function() {
      return self.turnNumber >= self.turnsInGame - 1;
    }

    self.nextTurn = function() {
      self.turnNumber += 1;
    }

    self.newGame = function() {
      _setTurnsInGame()
      self.turnNumber = 0;
    }

    self.getCurrentTurnNumber = function() {
      return self.turnNumber;
    }

    function _setTurnsInGame(){
      self.turnsInGame = SongsService.getNumberOfSongs();
    }
}]);
