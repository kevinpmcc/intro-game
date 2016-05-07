angular.module('introGame.songController',['ngAudio'])
  .controller('SongController', ['SongFetcherService', '$state', 'ngAudio', function(SongFetcherService, $state, ngAudio) {

    var self = this;

    function _loadPreviewUrl() {
      return SongFetcherService.currentSong().previewUrl;
    }

    self.playCurrentSong = function(){
      sound = ngAudio.load(_loadPreviewUrl());
      sound.play()
    }

    self._changeToAnswerState = function(){
      $state.go('answer', {})
    }

}]);
