angular.module('introGame.playLogService', ['introGame.playFactory', 'introGame.songsService'])
  .service('PlayLogService', ['PlayFactory','SongsService', function(PlayFactory, SongsService) {

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

    self.isLastGuessCorrect = function(){
      return self.plays[self.plays.length - 1].correctGuess;
    }

    self.newGame = function(){
      self.plays = [];
    }

    self.totalScore = function(){
      return self.plays.reduce(function(total, currentPlay){
        return total + currentPlay.score;
      }, 0)
    }

    self.guessDuration = function() {
      return self.plays[self.plays.length - 1].duration;
    };

    self.guessScore = function() {
      return self.plays[self.plays.length - 1].score;
    };

    function _evaluateGuess(turnNumber) {
      var currentSongTitle = SongsService.getSongAtPosition(turnNumber).title;
      var currentPlay = self.plays[turnNumber];
      if(currentPlay.guess.title === currentSongTitle) {
        currentPlay.score = 6 - currentPlay.duration;
        currentPlay.correctGuess = true;
      }
    }


  }])
