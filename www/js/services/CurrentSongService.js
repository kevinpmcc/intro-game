angular.module('introGame.currentSongService', ['introGame.songsService'])
  .service('CurrentSongService', ['SongsService', function(SongsService){
    var self = this;
    var URL_APPEND_STRING = '#t=,'

    self.currentSongPreviewUrl = function(turnNumber, duration) {
      var song = SongsService.getSongAtPosition(turnNumber);
      return song.previewUrl + URL_APPEND_STRING + duration;
    }
}]);
