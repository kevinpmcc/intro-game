angular.module('introGame.songsService', ['introGame.songFactory'])
  .service('SongsService', ['$http', 'SongFactory', function($http, SongFactory){
    var self = this;

    self.songs =[];

    self.getAllSongs = function(){
      return self.songs;
    }

    self.getNumberOfSongs = function(){
      return self.songs.length;
    }

    self.getSongAtPosition = function(index){
      return self.songs[index];
    }

    self.getAlbum = function(album){
      return $http.get('https://api.spotify.com/v1/albums/' + album.albumID + '/tracks')
      .then(_shuffleResponseFromApi)
    };

    function _shuffleResponseFromApi(response) {
      self.songs = _shuffle(response.data.items.map(function(track){
        return self._newSongFactory(track);
      }));
    };

    self._newSongFactory = function(track){
      return new SongFactory(track);
    }

    function _shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
}]);
