angular.module('introGame.albumController',['ui.router'])
  .controller('AlbumController', ['SongFetcherService', 'AlbumFetcherService', '$state', function(SongFetcherService, AlbumFetcherService, $state) {

    var self = this;

    self.albums = [];

    self.loadAlbums = function() {
      return AlbumFetcherService.getAlbums()
        .then(function(results) {
          self.albums = results;
        });
    };

    self.loadSongToGuess = function(albumID) {
      return SongFetcherService.getAlbum(albumID)
        .then(function() {
          self._changeToSongState();
        });
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    }

    self.loadAlbums();

  }]);
