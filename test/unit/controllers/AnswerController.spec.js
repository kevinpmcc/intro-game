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
    GameLogicService = jasmine.createSpyObj('GameLogicService', ['getCurrentTurnNumber'])
    GameLogicService.getCurrentTurnNumber.and.returnValue(TURN_NUMBER)
    CurrentSongService = jasmine.createSpyObj('CurrentSongService', ['currentSongPreviewUrl', 'sortedRemainingSongs'])

    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    ctrl = $controller('AnswerController', { SongFetcherService: SongFetcherService,
    $state: stateMock
  });
}));

  describe('#isCorrectGuess', function() {
    it('calls SongFetcherService.isCorrectGuess', function() {
      ctrl.isCorrectGuess()
      expect(SongFetcherService.isCorrectGuess).toHaveBeenCalled();
    })
  })
  describe('#currentSong', function() {
    it('calls songFetcherService.currentSong', function() {
      ctrl.currentSong()
      expect(SongFetcherService.currentSong).toHaveBeenCalled();
    });
  });

  describe('#loadSongToGuess', function() {
    beforeEach(function(){
      ctrl.loadSongToGuess();
    });

    it('calls songFetcherService.nextSong', function() {
      expect(SongFetcherService.nextSong).toHaveBeenCalled();
    });

    it('calls state.go with song', function() {
      expect(stateMock.go).toHaveBeenCalledWith('song',{});
    });
  });

  describe('#changeToAlbumsState', function() {
    it('calls state.go with albums', function() {
      ctrl.changeToAlbumsState()
      expect(stateMock.go).toHaveBeenCalledWith('albums',{});
    });

    it('calls state.go with albums', function() {
      ctrl.changeToAlbumsState()
      expect(SongFetcherService.resetScore).toHaveBeenCalledWith();
    });
  });

  describe('#isGameEnd', function() {
    it('calls SongFetcherService.songs()', function() {
      ctrl.isGameEnd();
      expect(SongFetcherService.isGameEnd).toHaveBeenCalled();
    });
  });

  describe('#totalScore', function() {
    it('calls SongFetcherService.fetchTotalScore()', function(){
      ctrl.totalScore();
      expect(SongFetcherService.fetchTotalScore).toHaveBeenCalled();
    })
  })
});
