angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['SongFetcherService', '$state', function(SongFetcherService, $state) {

    var self = this;

    self.currentSong;

    self.loadCurrentSong = function() {
      self.currentSong = SongFetcherService.currentSongFunction();
    }

    self.loadCurrentSong();
}]);
