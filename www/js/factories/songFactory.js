angular.module('introGame.songFactory', [])
  .factory('SongFactory', function() {

    var createSong = function(track) {
      // console.log("**** IN REAL FACTORY ****" + track.name)
      this.artist = track.artists[0].name;
      this.title = track.name;
      this.previewUrl = track.preview_url + "#t=,1";
    };
    return createSong;
  });
