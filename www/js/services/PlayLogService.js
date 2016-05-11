angular.module('introGame.playLogService', ['introGame.playFactory'])
  .service('PlayLogService', ['PlayFactory', function(PlayFactory) {

    var self = this;

    self.plays = [];

    self.listen = function(turnNumber, duration) {
      if(self.plays.length === turnNumber) {
        self.plays.push(new PlayFactory(duration));
      } else {
        self.plays[turnNumber].duration = duration
      }
    }

    self.guess = function(turnNumber, guessedSong) {
      if(self.plays.length === turnNumber) {
        self.plays.push(new PlayFactory(0));
      }
      self.plays[turnNumber].guess = guessedSong;
      _evaluateGuess(turnNumber);
    }

    function _evaluateGuess(turnNumber) {
      var currentSongTitle = SongsService.getSongAtPosition(turnNumber).title;
      var currentPlay = self.plays[turnNumber];
      if(currentPlay.guess.title === currentSongTitle) {
        currentPlay.score = 6 - currentPlay.duration;
      } else {
        currentPlay.score = 0
      }
    }

  }])
