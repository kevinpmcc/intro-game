describe('AlbumFetcherService', function() {

var AlbumFetcherService;
var scope;
beforeEach(module('introGame.albumFetcherService'));

  beforeEach(inject(function(_AlbumFetcherService_,  $rootScope, $q) {
    deferred = $q.defer();
    AlbumFetcherService = _AlbumFetcherService_;
    scope = $rootScope;
  }));

  fdescribe('#getAlbums', function(){
    it('returns an array of albums', function(done) {
      scope.$apply();
      AlbumFetcherService.getAlbums().then(function(results){
        console.log("gubbins");
        console.log(results[0]);
        console.log(results)
        done();
        console.log(expect(results.length).toEqual.toString())
        console.log(results.length, 3)
        expect(results.length).toEqual(3);
        console.log("THEEND")
      })
      console.log("HELLOHELLO")
    })
    // it('proves fallacies', function() {
    //   expect(true).toEqual(false);
    // });
  });

});
