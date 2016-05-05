angular.module('introGame.SongFetcherService', ['introGame.songFactory'])
  .service('SongFetcherService', ['$http', 'SongFactory', function($http, SongFactory){
    var sf = this;

    sf.getAlbum = function(albumID){
        return $http.get('https://api.spotify.com/v1/albums/' + albumID + '/tracks')
        .then(_handleResponseFromApi);
      };

      function _handleResponseFromApi(response) {
        return response.data.items.map(function(track){
          return sf._newSongFactory(track);
        });
      };

      sf._newSongFactory = function(track){
        return new SongFactory(track);
      }
    }
  ]);
