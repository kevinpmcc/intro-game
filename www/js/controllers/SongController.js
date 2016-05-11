angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['SongFetcherService', '$state', 'ngAudio', function(SongFetcherService, $state, ngAudio) {

    var self = this;

    self.loadCurrentSong = function(duration) {
      return SongFetcherService.currentSong(duration);
    }

    self.playCurrentSong = function(duration){
      var sound = ngAudio.load(self.loadCurrentSong(duration).appendedPreviewUrl);
      sound.play()
    };

    self.changeToAnswerState = function(){
      $state.go('answer', {})
    }

    self.remainingSongs = function(){
      return SongFetcherService.remainingSongs();
    }

    self.guessSong = function(song) {
      SongFetcherService.storeGuessAndCalculate(song)
      self.changeToAnswerState();
    }

}]);
