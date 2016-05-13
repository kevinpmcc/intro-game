angular.module('introGame.answerController',['introGame.artistService'])
  .controller('AnswerController', ['GameLogicService',
                                 'CurrentSongService',
                                 'PlayLogService',
                                 'ArtistService',
                                 '$state',
                                 function(GameLogicService,
                                          CurrentSongService,
                                          PlayLogService,
                                          ArtistService,
                                          $state) {

    var self = this;

    self.artistImages = [];

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

    self.getArtistImages = function() {
      ArtistService.getArtistImages(self.currentSong().artistID)
        .then(function(response){
          self.artistImages = response;
      })
    }

    self.isCorrectGuess = function() {
      return PlayLogService.isLastGuessCorrect()
    }

    self.changeToAlbumsState = function(){
      $state.go('albums', {})
    };

    self.isGameEnd = function() {
      return GameLogicService.isGameEnd()
    }

    self.getArtistImages();


}]);
