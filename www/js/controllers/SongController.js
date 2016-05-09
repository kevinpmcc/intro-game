angular.module('introGame.songController',['ui.router'])
  .controller('SongController', ['SongFetcherService', '$state', function(SongFetcherService, $state) {

    var self = this;

    self.SONGLENGTH = 1;

    self.loadCurrentSong = function() {
      return SongFetcherService.currentSong(self.SONGLENGTH);
    }
}]);
