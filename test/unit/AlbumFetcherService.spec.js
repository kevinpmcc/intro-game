describe('AlbumFetcherService', function() {

var AlbumFetcherService;
var scope;
beforeEach(module('introGame.albumFetcherService'));

  beforeEach(inject(function(_AlbumFetcherService_,  $rootScope, $q) {
    deferred = $q.defer();
    AlbumFetcherService = _AlbumFetcherService_;
    scope = $rootScope;
  }));

  describe('#getAlbums', function(){
    it('returns an array of albums', function(done) {
      scope.$apply();
      AlbumFetcherService.getAlbums().then(function(results){
        expect(results.length).toEqual(6);
        done();
      })

    })
  });

});
