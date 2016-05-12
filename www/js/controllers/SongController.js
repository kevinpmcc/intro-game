angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['GameLogicService',
                                 'CurrentSongService',
                                 'PlayLogService',
                                 '$state',
                                 function(GameLogicService,
                                          CurrentSongService,
                                          PlayLogService,
                                          $state) {

    var self = this;



    self.playCurrentSong = function(duration){
      CurrentSongService.playCurrentSong(_currentTurn(), duration);
      PlayLogService.listen(_currentTurn(), duration)
    }

    self.changeToAnswerState = function(){
      $state.go('answer', {})
    }

    self.remainingSongs = function(){
      return CurrentSongService.sortedRemainingSongs(_currentTurn());
    }

    self.guessSong = function(song) {
      PlayLogService.guess(_currentTurn(), song)
      self.changeToAnswerState();
    }

    function _currentTurn() {
      return GameLogicService.getCurrentTurnNumber()
    }

}]);
