describe('AlbumController', function() {
  beforeEach(module('introGame.albumController'));

  var SongsService;
  var stateMock;
  var AlbumFetcherService;
  var GameLogicService;
  var ctrl;
  var albumID = "10v912xgTZbjAtYfyKWJCS"

  var album = {artist: "AC/DC",
           title: "Highway to Hell",
           albumID: "10v912xgTZbjAtYfyKWJCS",
           img_url: "https://i.scdn.co/image/42dab3e45b3b9f2ba85538f8dc08e544ac9778d2"}

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

  describe('#loadSongToGuess', function() {
    beforeEach(function(){
      ctrl.loadSongToGuess(album);
      scope.$apply();
    });

    it('calls SongsService.getAlbum with album object', function(){
      expect(SongsService.getAlbum).toHaveBeenCalledWith(album);
    })

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
