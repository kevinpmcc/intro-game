angular.module('introGame.SongFetcherService', [])
  .service('SongFetcherService', ['$http', function($http){
    this.getAlbum = function(albumID){
        return $http.get('https://api.spotify.com/v1/albums/' + albumID + '/tracks')
        .then(_handleResponseFromApi);
      };

      function _handleResponseFromApi(response) {
        console.log("handling response")
        console.log(response.data.items[0]);
        return response.data.items.map(function(track){
          return {"artist" : track.artists[0].name, "title": track.name, "previewUrl": track.preview_url }
        });
      };
    }
  ]);
