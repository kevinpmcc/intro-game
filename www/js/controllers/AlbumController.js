angular.module('introGame.albumController',['ui.router', 'introGame.playLogService'])
  .controller('AlbumController', ['SongsService',
                                  'AlbumFetcherService',
                                  'GameLogicService',
                                  'PlayLogService',
                                  '$state',
                                  function(SongsService, AlbumFetcherService, GameLogicService, PlayLogService, $state) {

    var self = this;





    self.loadAlbums = function(search) {
      return AlbumFetcherService.getAlbums(search)
        .then(function(results){
          self.albums = results;
        });
    };

    self.loadSongToGuess = function(album) {
      return SongsService.getAlbum(album)
        .then(function() {
          GameLogicService.newGame();
          PlayLogService.newGame();
          self._changeToSongState();
        });
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    }

// spotify:album:
  self.albums = [
    {artist: "Weezer",
     title: "Weezer",
     albumID: "5n15QbYKbO4pzAV2Iy1VVG",
     imgUrl: "https://i.scdn.co/image/0959a0187154515697eb3938a981c2c44ec160ce"},
    {artist: "Blur",
     title: "Parklife",
     albumID: "0YS25Dr3hMtMFlVTfuvzl4",
     imgUrl: "https://i.scdn.co/image/f0dbe6703b0d94fc54d764ad98079f4f10b396d5"},
    {artist: "The Beatles",
    title: "1",
    albumID: "5ju5Ouzan3QwXqQt1Tihbh",
    imgUrl: "https://i.scdn.co/image/4e6916b16ce51c241c16f4d642360443aeb7b4df"},
    {artist: "Radiohead",
    title: "OK Computer",
    albumID: "7dxKtc08dYeRVHt3p9CZJn",
    imgUrl: "https://i.scdn.co/image/f89c1ecdd0cc5a23d5ad7303d4ae231d197dde98"},
    {artist: "Queen",
    title: "Greatest Hits",
    albumID: "3VWrUk4vBznMYXGMPc7dRB",
    imgUrl: "https://i.scdn.co/image/8995c45551984864859c3b7c127e3e234e3307f4"},
    {artist: "Arcade Fire",
    title: "Funeral",
    albumID: "0530hyl3GtZKWPebWVMZkK",
    imgUrl: "https://i.scdn.co/image/0545b22a34a2399ccf000951ce7b4425c720a836"}
     ];
  }]);
