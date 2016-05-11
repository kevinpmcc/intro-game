angular.module('introGame.playFactory', [])
  .factory('PlayFactory', function() {

    var MAX_SCORE = 6;

    var createPlay = function(duration) {
      this.duration = duration;
      this.score = 0;
      this.guess = undefined;
      this.correctGuess = false;
    };
    return createPlay;
  });
