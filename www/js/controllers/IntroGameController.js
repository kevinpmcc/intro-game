angular.module('introGame.controller',[])
  .controller('IntroGameController', ['SongFetcherService', function(SongFetcherService) {

    var self = this;

    self.songs = [];

    self.displaySongs = function() {
      SongFetcherService.getAlbum('10v912xgTZbjAtYfyKWJCS')
      .then(function(data) {
        self.songs = data;
      });
    };

    self.displaySongs();

    function IntroGameController() {
      this.introGame = "IntroGame1";
    };

  }]);
