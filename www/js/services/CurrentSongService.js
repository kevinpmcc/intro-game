angular.module('introGame.currentSongService', ['introGame.songsService', 'ngAudio'])
  .service('CurrentSongService', ['SongsService',
                                  'ngAudio',
                                  function(SongsService,
                                           ngAudio){
    var self = this;
    var URL_APPEND_STRING = '#t=,'

    self.currentSongPreviewUrl = function(turnNumber, duration) {
      var song = SongsService.getSongAtPosition(turnNumber);
      return song.previewUrl + URL_APPEND_STRING + duration;
    }

    self.currentSong = function(turnNumber) {
      return SongsService.getSongAtPosition(turnNumber);
    }

    self.sortedRemainingSongs = function(turnNumber){
      allSongs = SongsService.getAllSongs();
      return _sorted(allSongs.filter(function(currentValue, index){
        return index >= turnNumber;
      }));
    }

    self.playCurrentSong = function(turnNumber, duration){
      var sound = ngAudio.load(self.currentSongPreviewUrl(turnNumber, duration));
      sound.play()
    };

    function _sorted(songs){
      return songs.sort(_sortObjectArray);
    }

    function _sortObjectArray(a, b){
      return Number(a.title > b.title);
    }


}]);
