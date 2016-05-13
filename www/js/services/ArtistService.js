angular.module('introGame.artistService', [])
  .service('ArtistService', ['$http', function($http){
    var self = this;

    self.artistImages=[]

    self.getArtistImages = function(artistID){
      return $http.get('https://api.spotify.com/v1/artists/' + artistID)
      .then(function(response){
        self.artistImages =  response.data.images;
      });
    };
  }]);
