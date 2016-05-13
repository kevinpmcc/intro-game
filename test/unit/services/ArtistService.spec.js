describe('ArtistService', function() {

  var ArtistService;
  var SongFactory;
  var httpBackend;
  var apiJsonResponse = getApiJsonResponse();
  var artistID = '711MCceyCBcFnzjGY4Q7Un'

  beforeEach(module('introGame.artistService'));

  beforeEach(inject(function(_ArtistService_, $httpBackend, $rootScope, $q) {
    httpBackend = $httpBackend;
    ArtistService = _ArtistService_;
  }));

  describe('#getArtistImages', function(){
    beforeEach(function(){
      httpBackend.expectGET('https://api.spotify.com/v1/artists/' + artistID).respond(apiJsonResponse);
    });

    afterEach(function(){
      httpBackend.flush();
    });

    it('retrieves data from API and stores in an array of images', function(){
      ArtistService.getArtistImages(artistID).then(function(response){
        expect(ArtistService.artistImages).toEqual(apiJsonResponse.images);
      });
    });
  });

})


  function getApiJsonResponse(){
    return {
  "external_urls" : {
    "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
  },
  "followers" : {
    "href" : null,
    "total" : 1649514
  },
  "genres" : [ "hard rock", "rock" ],
  "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
  "id" : "711MCceyCBcFnzjGY4Q7Un",
  "images" : [ {
    "height" : 1500,
    "url" : "https://i.scdn.co/image/a16c5d95ede008ec905d6ca6d1b5abbf39ad4566",
    "width" : 1000
  }, {
    "height" : 960,
    "url" : "https://i.scdn.co/image/fb26e1c0e5779ac46b225651494ac14b6b8ebba7",
    "width" : 640
  }, {
    "height" : 300,
    "url" : "https://i.scdn.co/image/3d00e92fb05c62e2faf2908b34e6f24e0a4cb213",
    "width" : 200
  }, {
    "height" : 96,
    "url" : "https://i.scdn.co/image/2940421b19c6b8a26b073ef340290516ea0399e1",
    "width" : 64
  } ],
  "name" : "AC/DC",
  "popularity" : 80,
  "type" : "artist",
  "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
}
};
