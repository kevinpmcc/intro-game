describe('AlbumController', function() {
  beforeEach(module('introGame.albumController'));

  var SongFetcherService;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller, $q) {
   deferred = $q.defer();
   SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['getAlbum', 'nextSong']);
   SongFetcherService.getAlbum.and.returnValue($q.when(""));
   scope = $rootScope;
  //  state = $state;
  //  location = $location;
  //  stateParams = $stateParams;
  //  stateProvider = $stateProvider;
   ctrl = $controller('AlbumController', {
     SongFetcherService: SongFetcherService,
     _changeToSongState: function(){
       console.log("yippee")
     }
    //  $state: state,
    //  $location: location,
    //  $stateParams: stateParams,
    //  $stateProvider: stateProvider
   });

 }));

  it('stores album data in an array', function() {
    expect(ctrl.albums).toBeDefined();
    ctrl.loadAlbum(album1);
    expect(ctrl.albums[0]).toEqual(album1);
  });

  describe('#loadSongToGuess', function() {
    beforeEach(function(){
      ctrl.loadSongToGuess(albumID);
      scope.$apply();
    });

    it('calls songFetcherService.getAlbum', function() {
      expect(SongFetcherService.getAlbum).toHaveBeenCalled();
    });

    it('calls songFetcherService.nextSong', function() {
      expect(SongFetcherService.nextSong).toHaveBeenCalled();
    });

    xit('calls ctrl.changeToSongState', function() {
      spyOn(ctrl, '_changeToSongState')
      expect(ctrl._changeToSongState).toHaveBeenCalled();
    })
  });



  var album1 = {
    artist: "AC/DC",
    title: "Highway to Hell",
    albumID: "10v912xgTZbjAtYfyKWJCS",
    img_url: "https://i.scdn.co/image/42dab3e45b3b9f2ba85538f8dc08e544ac9778d2"
  }

  var albumID = album1.albumID;

});
