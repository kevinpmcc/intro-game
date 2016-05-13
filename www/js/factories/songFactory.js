angular.module('introGame.songFactory', [])
  .factory('SongFactory', function() {

    var createSong = function(track) {
      this.artist = track.artists[0].name;
      this.title = track.name;
      this.previewUrl = track.preview_url;
      this.appendedPreviewUrl = "";
      this.artistID = track.artists[0].id;
    };
    return createSong;
  });
