describe('AlbumController', function() {
  beforeEach(module('introGame.albumController'));

  var SongsService;
  var stateMock;
  var AlbumFetcherService;
  var GameLogicService;
  var ctrl;
  var albumID = "10v912xgTZbjAtYfyKWJCS"

  beforeEach(inject(function($rootScope, $controller, $q) {
   deferred = $q.defer();
   AlbumFetcherService = jasmine.createSpyObj('AlbumFetcherService', ['getAlbums']);
   AlbumFetcherService.getAlbums.and.returnValue($q.when(["koala bear"]));
   SongsService = jasmine.createSpyObj('SongsService', ['getAlbum', 'nextSong']);
   SongsService.getAlbum.and.returnValue($q.when(""));

   GameLogicService = jasmine.createSpyObj('GameLogicService', ['newGame'])


   stateMock = jasmine.createSpyObj('$state spy', ['go']);
   scope = $rootScope;

   ctrl = $controller('AlbumController', {
     SongsService: SongsService,
     GameLogicService: GameLogicService,
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

    it('calls GameLogicService.newGame()', function(){
      expect(GameLogicService.newGame).toHaveBeenCalled();
    })

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
