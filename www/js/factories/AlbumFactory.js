angular.module('introGame.albumFactory', [])
  .factory('AlbumFactory', function() {

    var createAlbum = function(search) {
      this.name = search.name;
      this.imgUrl = search.images[0].url;
      this.albumID = search.id
    };
    return createAlbum;
  });
