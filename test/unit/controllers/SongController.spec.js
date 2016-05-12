describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var CurrentSongService;
  var SongsService;
  var GameLogicService;
  var PlayLogService;
  var ngAudio;
  var ctrl;
  var sound;
  var stateMock;
  var song1 = {title: "song1"};
  var song2 = {title: "song2"};
  var CLIP_DURATION = 3;
  var TURN_NUMBER = 5;

  beforeEach(inject(function($rootScope, $controller) {
    SongsService = jasmine.createSpyObj('SongsService', ['getAlbum', 'nextSong']);
    GameLogicService = jasmine.createSpyObj('GameLogicService', ['getCurrentTurnNumber'])
    GameLogicService.getCurrentTurnNumber.and.returnValue(TURN_NUMBER)
    CurrentSongService = jasmine.createSpyObj('CurrentSongService', ['currentSongPreviewUrl', 'sortedRemainingSongs'])
    PlayLogService = jasmine.createSpyObj('PlayLogService', ['listen', 'guess'])

    sound = jasmine.createSpyObj('sound', ['play']);
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    ngAudio = jasmine.createSpyObj('ngAudio',['load']);
    ngAudio.load.and.returnValue(sound);

    ctrl = $controller('SongController', {
      ngAudio: ngAudio,
      sound: sound,
      CurrentSongService: CurrentSongService,
      SongsService: SongsService,
      GameLogicService: GameLogicService,
      PlayLogService: PlayLogService,
      $state: stateMock
    });
  }));

  describe('#changeToAnswerState', function() {
    it('calls ctrl.changeToAnswerState', function() {
      ctrl.changeToAnswerState();
      expect(stateMock.go).toHaveBeenCalledWith('answer',{});
    })
  });

  describe('#remainingSongs', function() {
    it('returns all unplayed tracks', function(){
      ctrl.remainingSongs()
      expect(CurrentSongService.sortedRemainingSongs).toHaveBeenCalledWith(TURN_NUMBER);
    })
  });

  describe('#guessSong', function() {
    it('calls SongFetcherService.storeGuessandCalculate with song', function(){
      ctrl.guessSong(song1)
      expect(PlayLogService.guess).toHaveBeenCalledWith(TURN_NUMBER, song1);
    })

    it('calls ctrl.changeToAnswerState', function() {
      ctrl.guessSong(song1);
      expect(stateMock.go).toHaveBeenCalledWith('answer',{});
    })


  });


})
