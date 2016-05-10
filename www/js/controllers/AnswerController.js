angular.module('introGame.answerController', [])
  .controller('AnswerController', ['SongFetcherService', '$state', function(SongFetcherService, $state) {
    var self = this;


    self.currentSong = function() {
      return SongFetcherService.currentSong();
    };

    self.loadSongToGuess = function() {
      SongFetcherService.nextSong();
      self._changeToSongState();
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    };

    self.totalScore = function() {
      return SongFetcherService.totalScore
    }

    self.isCorrectGuess = function() {
      return SongFetcherService.isCorrectGuess()
    }

    self.changeToAlbumsState = function(){
      SongFetcherService.resetScore();
      $state.go('albums', {})
    };

    self.isGameEnd = function() {
      return SongFetcherService.isGameEnd()
    }


}]);
