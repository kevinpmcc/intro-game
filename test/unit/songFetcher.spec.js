describe('SongFetcherService', function() {
var deferred, spotifyApi, albumObj, scope, albumID;
console.log("start of test");
  beforeEach(module('introGame.SongFetcherService'));

  // var SongFetcherService;

  beforeEach(inject(function(_SongFetcherService_) {
      console.log("guff");
      console.log(_SongFetcherService_)
      SongFetcherService = _SongFetcherService_;
  }));
  it('does something', function(){
    console.log(SongFetcherService);
    expect(true).toEqual(true);
  })
  //
  // // beforeEach(inject(function(_SongFetcherService_, $rootScope, $q) {
  // //     console.log("line6");
  // //   deferred = $q.defer();
  // //   spotifyApi = jasmine.createSpyObj('spotifyApi',['getAlbum']);
  // //   // spotifyApi.getAlbum.and.returnValue($q.when(albumObj))
  // //   scope = $rootScope;
  // //   SongFetcherService = _SongFetcherService_;
  // //   console.log("in injector")
  // // }));
  //
  // describe('fetches JSON from Spotify', function() {
  //
  //
  //   it('makes a call to spotifyApi.getAlbum', function() {
  //
  //
  //
  //
  //
  //     // inject(function(_SongFetcherService_, $rootScope, $q) {
  //     //     console.log("line6");
  //     //   deferred = $q.defer();
  //     //   // spotifyApi = jasmine.createSpyObj('spotifyApi',['getAlbum']);
  //     //   // // spotifyApi.getAlbum.and.returnValue($q.when(albumObj))
  //     //   scope = $rootScope;
  //     //   SongFetcherService = _SongFetcherService_;
  //     //   // console.log("in injector")
  //     // })
  //
  //
  //
  //
  //     // albumID = '10v912xgTZbjAtYfyKWJCS';
  //     // console.log("boo")
  //     // SongFetcherService.getAlbum(albumID);
  //     // console.log("blah")
  //     // expect(spotifyApi.getAlbum).toHaveBeenCalledWith(albumID);
  //   });
  // });
});
