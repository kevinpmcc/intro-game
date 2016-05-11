angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['SongFetcherService',
                                 'SongsService',
                                 'GameLogicService',
                                 'CurrentSongService',
                                 '$state',
                                 'ngAudio',
                                 function(SongFetcherService,
                                          SongsService,
                                          GameLogicService,
                                          CurrentSongService,
                                          $state, ngAudio) {

    var self = this;

    self.loadCurrentSong = function(duration) {
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      return CurrentSongService.currentSongPreviewUrl(currentTurn, duration);
    }

    self.playCurrentSong = function(duration){
      var sound = ngAudio.load(self.loadCurrentSong(duration));
      sound.play()
    };

    self.changeToAnswerState = function(){
      $state.go('answer', {})
    }

    self.remainingSongs = function(){
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      return CurrentSongService.sortedRemainingSongs(currentTurn);
    }

    self.guessSong = function(song) {
      SongFetcherService.storeGuessAndCalculate(song)
      self.changeToAnswerState();
    }

}]);
