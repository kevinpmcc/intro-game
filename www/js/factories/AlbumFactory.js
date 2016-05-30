angular.module('introGame.albumFactory', [])
  .factory('AlbumFactory', function() {

    var createAlbum = function(albumData) {
      this.title = albumData.name;
      this.imgUrl = albumData.images[0].url;
      this.albumID = albumData.id;
  };
  return createAlbum;
  });
