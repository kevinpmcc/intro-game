describe('AlbumController', function() {
  beforeEach(module('introGame.albumController'));

  var SongFetcherService;
  var stateMock;
  var AlbumFetcherService;
  var ctrl;
  var albumID = "10v912xgTZbjAtYfyKWJCS"

  beforeEach(inject(function($rootScope, $controller, $q) {
   deferred = $q.defer();
   AlbumFetcherService = jasmine.createSpyObj('AlbumFetcherService', ['getAlbums']);
   SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['getAlbum', 'nextSong']);
   SongFetcherService.getAlbum.and.returnValue($q.when(""));
   AlbumFetcherService.getAlbums.and.returnValue($q.when(["koala bear"]));
   stateMock = jasmine.createSpyObj('$state spy', ['go']);
   scope = $rootScope;

   ctrl = $controller('AlbumController', {
     SongFetcherService: SongFetcherService,
     AlbumFetcherService: AlbumFetcherService,
     $state: stateMock
   });
 }));

  it('stores album data in an array', function() {
    expect(ctrl.albums).toBeDefined();
    scope.$apply();
    ctrl.loadAlbums();
    expect(ctrl.albums[0]).toEqual('koala bear');
  });

  describe('#loadSongToGuess', function() {
    beforeEach(function(){
      ctrl.loadSongToGuess(albumID);
      scope.$apply();
    });

    it('calls ctrl.changeToSongState', function() {
      expect(stateMock.go).toHaveBeenCalledWith('song',{});
    })
  });

  describe('#loadAlbums', function() {
    it('calls albumFetcherService.getAlbums', function() {
      ctrl.loadAlbums();
      expect(AlbumFetcherService.getAlbums).toHaveBeenCalled();
    });
  });
});
