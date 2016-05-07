angular.module('introGame.albumController',['ui.router'])
  .controller('AlbumController', ['SongFetcherService', '$state', function(SongFetcherService, $state) {

    var self = this;



    self.currentSong;


    self.loadSongToGuess = function(albumID) {
      console.log("in loadSongToGuess")
      return SongFetcherService.getAlbum(albumID)
        .then(function() {
          SongFetcherService.nextSong();
          self.currentSong = SongFetcherService.currentSong;
          self._changeToSongState();
        });
    };

    self._changeToSongState = function(){
      $state.go('song', {})
    }

    var allAlbums = [{
         artist: "AC/DC",
         title: "Highway to Hell",
         albumID: "10v912xgTZbjAtYfyKWJCS",
         img_url: "https://i.scdn.co/image/42dab3e45b3b9f2ba85538f8dc08e544ac9778d2"},
       {artist: "Destiny's Child",
         title: "Survivor",
         albumID: "2HcjLD0ButtKsQYqzoyOx9",
         img_url: "https://i.scdn.co/image/1f45888d95a106efb58f40ffc808d3d9d6b0b99a"},
      {artist: "The Beatles",
      title: "1",
      albumID: "5ju5Ouzan3QwXqQt1Tihbh",
      img_url: "https://i.scdn.co/image/4e6916b16ce51c241c16f4d642360443aeb7b4df"},
      {artist: "Radiohead",
      title: "OK Computer",
      albumID: "7dxKtc08dYeRVHt3p9CZJn",
      img_url: "https://i.scdn.co/image/f89c1ecdd0cc5a23d5ad7303d4ae231d197dde98"},
      {artist: "Dr Dre",
      title: "2001",
      albumID: "5csXMdS69VOvh8MjyfwkjB",
      img_url: "https://i.scdn.co/image/71705ba0970102931b21f5dd9fc47a7746df90ae"},
      {artist: "Arcade Fire",
      title: "Funeral",
      albumID: "0530hyl3GtZKWPebWVMZkK",
      img_url: "https://i.scdn.co/image/0545b22a34a2399ccf000951ce7b4425c720a836"}
       ];

       self.albums = allAlbums;
     }]);
