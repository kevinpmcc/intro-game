angular.module('introGame.SongFetcherService', ['introGame.songFactory'])
  .service('SongFetcherService', ['$http', 'SongFactory', function($http, SongFactory){
    var sf = this;

    sf.songs = [];

    sf.getAlbum = function(albumID){
        return $http.get('https://api.spotify.com/v1/albums/' + albumID + '/tracks')
        .then(_handleResponseFromApi);
      };

      function _handleResponseFromApi(response) {
        sf.songs = shuffle(response.data.items.map(function(track){
          return sf._newSongFactory(track);
        }));
      };

      sf._newSongFactory = function(track){
        return new SongFactory(track);
      }

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

    }
  ]);
