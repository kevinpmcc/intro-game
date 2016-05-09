angular.module('introGame.previewUrlFactory', [])
  .factory('PreviewUrlFactory', function() {

    var appendLengthToUrl = function(previewUrl, songLength) {
      this.previewUrl = previewUrl + "#t=," + songLength;
    };
    return appendLengthToUrl;
  });
