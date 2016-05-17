describe('AlbumFactory', function() {

  var albumObj;

  beforeEach(module('introGame.albumFactory'));
  beforeEach(inject(function(AlbumFactory) {
    albumObj = new AlbumFactory(albumData);
  }));

  it('creates albums', function() {
    expect(albumObj.name).toEqual('Covered Up With Flowers');
    expect(albumObj.imgUrl).toEqual('https://i.scdn.co/image/93319d6c39d51bf015927c2c684a1615ff5a51f2');
    expect(albumObj.albumID).toEqual('3Dd64usOdiAsvK3Ub0baX0');
        });


    var albumData =  {
      "album_type" : "album",
      "available_markets" : [ "CA", "US" ],
      "external_urls" : {
        "spotify" : "https://open.spotify.com/album/3Dd64usOdiAsvK3Ub0baX0"
      },
      "href" : "https://api.spotify.com/v1/albums/3Dd64usOdiAsvK3Ub0baX0",
      "id" : "3Dd64usOdiAsvK3Ub0baX0",
      "images" : [ {
        "height" : 640,
        "url" :"https://i.scdn.co/image/93319d6c39d51bf015927c2c684a1615ff5a51f2",
        "width" : 640
      }, {
        "height" : 300,
        "url" : "https://i.scdn.co/image/e3a8e7ebeba6f8f78e999a2b197c1e4e12071d22",
        "width" : 300
      }, {
        "height" : 64,
        "url" : "https://i.scdn.co/image/918f28a8cecd917b75f757f010ffe25eecc33953",
        "width" : 64
      } ],
        "name" : "Covered Up With Flowers",
        "type" : "album",
        "uri" : "spotify:album:3Dd64usOdiAsvK3Ub0baX0"
    }
});
