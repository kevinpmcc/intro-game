angular.module('introGame.currentSongService', ['introGame.songsService'])
  .service('CurrentSongService', ['SongsService', function(SongsService){
    var self = this;
    var URL_APPEND_STRING = '#t=,'

    self.currentSongPreviewUrl = function(turnNumber, duration) {
      var song = SongsService.getSongAtPosition(turnNumber);
      return song.previewUrl + URL_APPEND_STRING + duration;
    }

    self.sortedRemainingSongs = function(turnNumber){
      allSongs = SongsService.getAllSongs();
      return _sorted(allSongs.filter(function(currentValue, index){
        return index >= turnNumber;
      }));
    }

    function _sorted(songs){
      return songs.sort(_sortObjectArray);
    }

    function _sortObjectArray(a, b){
      return Number(a.title > b.title);
    }
}]);
