angular.module('introGame.albumController',['ui.router'])
  .controller('AlbumController', ['SongsService',
                                  'AlbumFetcherService',
                                  'GameLogicService',
                                  '$state',
                                  function(SongsService, AlbumFetcherService, GameLogicService, $state) {

    var self = this;

    self.albums = [];

    self.loadAlbums = function() {
      return AlbumFetcherService.getAlbums()
        .then(function(results) {
          self.albums = results;
        });
    };

    self.loadSongToGuess = function(albumID) {
      return SongsService.getAlbum(albumID)
        .then(function() {
          GameLogicService.newGame();
          self._changeToSongState();
        });
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    }

    self.loadAlbums();

  }]);
