angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['SongsService',
                                 'GameLogicService',
                                 'CurrentSongService',
                                 'PlayLogService',
                                 '$state',
                                 'ngAudio',
                                 function(SongsService,
                                          GameLogicService,
                                          CurrentSongService,
                                          PlayLogService,
                                          $state, ngAudio) {

    var self = this;

    self.loadCurrentSong = function(duration) {
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      return CurrentSongService.currentSongPreviewUrl(currentTurn, duration);
    }

    self.playCurrentSong = function(duration){
      var sound = ngAudio.load(self.loadCurrentSong(duration));
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      PlayLogService.listen(currentTurn, duration)
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
      var currentTurn = GameLogicService.getCurrentTurnNumber();
      PlayLogService.guess(currentTurn, song)
      self.changeToAnswerState();
    }

}]);
