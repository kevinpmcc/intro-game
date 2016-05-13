angular.module('introGame.albumController',['ui.router', 'introGame.playLogService'])
  .controller('AlbumController', ['SongsService',
                                  'AlbumFetcherService',
                                  'GameLogicService',
                                  'PlayLogService',
                                  '$state',
                                  function(SongsService, AlbumFetcherService, GameLogicService, PlayLogService, $state) {

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
          PlayLogService.newGame();
          self._changeToSongState();
        });
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    }

    self.loadAlbums();
  }]);
