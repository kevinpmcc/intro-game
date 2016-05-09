angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['SongFetcherService', '$state', 'ngAudio', function(SongFetcherService, $state, ngAudio) {

    var self = this;

    self.SONGLENGTH = 1;

    self.loadCurrentSong = function() {
      return SongFetcherService.currentSong(self.SONGLENGTH);
    }

    self.playCurrentSong = function(){
      var sound = ngAudio.load(self.loadCurrentSong().appendedPreviewUrl);
      sound.play()
    };

    self.changeToAnswerState = function(){
      $state.go('answer', {})
    }

}]);
