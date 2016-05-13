describe('AnswerController', function () {
  beforeEach(module('introGame.answerController'));

  var ctrl;
  var CurrentSongService;
  var ArtistService;
  var SongsService;
  var PlayLogService;
  var GameLogicService;
  var TURN_NUMBER = 5;
  var SONG = {artistID: "12434"}


  beforeEach(inject(function($controller, $rootScope, $q){
       deferred = $q.defer();
    PlayLogService = jasmine.createSpyObj('PlayLogService', ['isLastGuessCorrect', 'totalScore'])
    SongsService = jasmine.createSpyObj('SongsService', ['getAlbum', 'nextSong']);
    GameLogicService = jasmine.createSpyObj('GameLogicService', ['getCurrentTurnNumber', 'isGameEnd', 'nextTurn'])
    GameLogicService.getCurrentTurnNumber.and.returnValue(TURN_NUMBER)
    CurrentSongService = jasmine.createSpyObj('CurrentSongService', ['currentSongPreviewUrl', 'currentSong', 'sortedRemainingSongs'])
    CurrentSongService.currentSong.and.returnValue(SONG);
    ArtistService = jasmine.createSpyObj('ArtistService', ['getArtistImages'])
    ArtistService.getArtistImages.and.returnValue($q.when([ {
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
    } ]))

    stateMock = jasmine.createSpyObj('$state spy', ['go']);

        scope = $rootScope;
    ctrl = $controller('AnswerController', {
      SongsService: SongsService,
      GameLogicService: GameLogicService,
      CurrentSongService: CurrentSongService,
      PlayLogService: PlayLogService,
      ArtistService: ArtistService,
      $state: stateMock
    });
  }));

  describe('#isCorrectGuess', function() {
    it('calls PlayLogService.isLastGuessCorrect', function() {
      ctrl.isCorrectGuess()
      expect(PlayLogService.isLastGuessCorrect).toHaveBeenCalled();
    })
  })
  describe('#currentSong', function() {
    it('calls songFetcherService.currentSong', function() {
      ctrl.currentSong()
      expect(GameLogicService.getCurrentTurnNumber).toHaveBeenCalled();
      expect(CurrentSongService.currentSong).toHaveBeenCalledWith(TURN_NUMBER);
    });
  });

  describe('#getArtistImages', function(){
    it('calls ArtistService.getArtistImages', function(){
      ctrl.getArtistImages(SONG)
      expect(ArtistService.getArtistImages).toHaveBeenCalledWith(SONG.artistID)
    })
  })

  describe('#loadSongToGuess', function() {
    beforeEach(function(){
      ctrl.nextTurn();
    });

    it('calls songFetcherService.nextSong', function() {
      expect(GameLogicService.nextTurn).toHaveBeenCalled();
    });

    it('calls state.go with song', function() {
      expect(stateMock.go).toHaveBeenCalledWith('song',{});
    });
  });

  describe('#changeToAlbumsState', function() {
    beforeEach(function() {
      ctrl.changeToAlbumsState()
    });

    it('calls state.go with albums', function() {
      expect(stateMock.go).toHaveBeenCalledWith('albums',{});
    });

  });

  describe('#isGameEnd', function() {
    it('calls SongFetcherService.songs()', function() {
      ctrl.isGameEnd();
      expect(GameLogicService.isGameEnd).toHaveBeenCalled();
    });
  });

  describe('#totalScore', function() {
    it('calls PlayLogService.totalScore()', function(){
      ctrl.totalScore();
      expect(PlayLogService.totalScore).toHaveBeenCalled();
    })
  })
});
