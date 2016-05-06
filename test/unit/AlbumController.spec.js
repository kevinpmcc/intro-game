describe('AlbumController', function() {
  beforeEach(module('introGame.albumController'));

  var SongFetcherService, stateMock;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller, $q) {
   deferred = $q.defer();
   SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['getAlbum', 'nextSong']);
   SongFetcherService.getAlbum.and.returnValue($q.when(""));

   stateMock = jasmine.createSpyObj('$state spy', ['go']);

   scope = $rootScope;

   ctrl = $controller('AlbumController', {
     SongFetcherService: SongFetcherService,
     $state: stateMock
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

    it('calls ctrl.changeToSongState', function() {
      expect(stateMock.go).toHaveBeenCalledWith('song',{});
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
