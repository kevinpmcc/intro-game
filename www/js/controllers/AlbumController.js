angular.module('introGame.albumController',[])
  .controller('AlbumController', ['SongFetcherService', function(SongFetcherService) {

    var self = this;
    self.albums = [];

    self.loadAlbum = function() {
      self.albums.push(album1);
    };

    self.fetchAlbumData = function(albumID) {
      return SongFetcherService.getAlbum(albumID)
        .then(function() {
          SongFetcherService.nextSong();
        });
    };

    // self.songs = [];
    //
    // self.displaySongs = function() {
    //   SongFetcherService.getAlbum('10v912xgTZbjAtYfyKWJCS')
    //   .then(function(data) {
    //     self.songs = data;
    //   });
    // };
    //
    // self.displaySongs();
    //
    // function IntroGameController() {
    //   this.introGame = "IntroGame1";
    // };

    var album1 = {
      artist: "AC/DC",
      title: "Highway to Hell",
      albumID: "10v912xgTZbjAtYfyKWJCS",
      img_url: "https://i.scdn.co/image/42dab3e45b3b9f2ba85538f8dc08e544ac9778d2"
    }

  }]);
