angular.module('introGame.answerController',[])
  .controller('AnswerController', ['SongFetcherService',
                                 'SongsService',
                                 'GameLogicService',
                                 'CurrentSongService',
                                 '$state',
                                 function(SongFetcherService,
                                          SongsService,
                                          GameLogicService,
                                          CurrentSongService,
                                          $state) {

    var self = this;

    self.totalScore = function() {
      return SongFetcherService.fetchTotalScore();
    }

    self.currentSong = function() {
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      return CurrentSongService.currentSong(currentTurn);
    };

    self.loadSongToGuess = function() {
      SongFetcherService.nextSong();
      self._changeToSongState();
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    };

    self.isCorrectGuess = function() {
      return SongFetcherService.isCorrectGuess()
    }

    self.changeToAlbumsState = function(){
      SongFetcherService.resetScore()
      $state.go('albums', {})
    };

    self.isGameEnd = function() {
      return SongFetcherService.isGameEnd()
    }


}]);
