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

    self.isCorrectGuess = function() {
      console.log(SongFetcherService.isCorrectGuess())
      return SongFetcherService.isCorrectGuess()
    }

    self.changeToAlbumsState = function(){
      $state.go('albums', {})
    };


}]);
