angular.module('introGame.answerController',[])
  .controller('AnswerController', ['GameLogicService',
                                 'CurrentSongService',
                                 'PlayLogService',
                                 '$state',
                                 function(GameLogicService,
                                          CurrentSongService,
                                          PlayLogService,
                                          $state) {

    var self = this;

    self.totalScore = function() {
      return PlayLogService.totalScore();
    }

    self.currentSong = function() {
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      return CurrentSongService.currentSong(currentTurn);
    };

    self.nextTurn = function() {
      GameLogicService.nextTurn();
      self._changeToSongState();
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    };

    self.isCorrectGuess = function() {
      return PlayLogService.isLastGuessCorrect()
    }

    self.changeToAlbumsState = function(){
      $state.go('albums', {})
    };

    self.isGameEnd = function() {
      return GameLogicService.isGameEnd()
    };

    self.guessScore = function() {
      return PlayLogService.guessScore()
    };

    self.guessDuration = function() {
      if(PlayLogService.guessDuration() === 1) {
        return PlayLogService.guessDuration() + " second"
      } else {
        return PlayLogService.guessDuration() + " seconds"
      }
    };


}]);
