describe('AnswerController', function () {
  beforeEach(module('introGame.answerController'));

  var ctrl;
  var SongFetcherService;
  var CurrentSongService;
  var SongsService;
  var GameLogicService;
  var TURN_NUMBER = 5;


  beforeEach(inject(function($controller){
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['nextSong', 'currentSong', 'isCorrectGuess', 'isGameEnd', 'fetchTotalScore', 'resetScore']);

    SongsService = jasmine.createSpyObj('SongsService', ['getAlbum', 'nextSong']);
    GameLogicService = jasmine.createSpyObj('GameLogicService', ['getCurrentTurnNumber', 'isGameEnd', 'nextTurn'])
    GameLogicService.getCurrentTurnNumber.and.returnValue(TURN_NUMBER)
    CurrentSongService = jasmine.createSpyObj('CurrentSongService', ['currentSongPreviewUrl', 'currentSong', 'sortedRemainingSongs'])

    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    ctrl = $controller('AnswerController', {
      SongFetcherService: SongFetcherService,
      SongsService: SongsService,
      GameLogicService: GameLogicService,
      CurrentSongService: CurrentSongService,
      $state: stateMock
    });
  }));

  // describe('#isCorrectGuess', function() {
  //   it('calls SongFetcherService.isCorrectGuess', function() {
  //     ctrl.isCorrectGuess()
  //     expect(SongFetcherService.isCorrectGuess).toHaveBeenCalled();
  //   })
  // })
  describe('#currentSong', function() {
    it('calls songFetcherService.currentSong', function() {
      ctrl.currentSong()
      expect(GameLogicService.getCurrentTurnNumber).toHaveBeenCalled();
      expect(CurrentSongService.currentSong).toHaveBeenCalledWith(TURN_NUMBER);
    });
  });

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

  // describe('#totalScore', function() {
  //   it('calls SongFetcherService.fetchTotalScore()', function(){
  //     ctrl.totalScore();
  //     expect(SongFetcherService.fetchTotalScore).toHaveBeenCalled();
  //   })
  // })
});
