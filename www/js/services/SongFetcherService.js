angular.module('introGame.SongFetcherService', [])
  .service('SongFetcherService', ['SpotifyWebApi', function(SpotifyWebApi){
    this.getAlbum = function(albumID){
      var spotifyApi = new SpotifyWebApi();
      return spotifyApi.getAlbum(albumID)
    }
  }]);
