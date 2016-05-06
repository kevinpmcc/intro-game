angular.module('introGame.songController',['ngAudio'])
  .controller('SongController', ['SongFetcherService', 'ngAudio', function(SongFetcherService, ngAudio) {

    var self = this;

    function _loadPreviewUrl() {
      console.log(SongFetcherService.currentSong.previewUrl)
      return SongFetcherService.currentSong.previewUrl;
    }

    self.playCurrentSong = function(){
      console.log("playCurrentSong")
      sound = ngAudio.load(_loadPreviewUrl());
      sound.play()
    }

}]);
