angular.module('introGame.answerController', [])
  .controller('AnswerController', ['SongFetcherService', '$state', function(SongFetcherService, $state) {

    var self = this;

    self.loadSongToGuess = function() {
      SongFetcherService.nextSong();
      self._changeToSongState();
    };

    self._changeToAlbumState = function() {
      $state.go('albums', {})
    }

    self._changeToSongState = function() {
      $state.go('song', {})
    }

    self.currentSong = function() {
      return SongFetcherService.currentSong;
    }

  }])
