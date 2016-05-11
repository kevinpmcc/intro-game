describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var CurrentSongService;
  var SongsService;
  var GameLogicService;
  var ngAudio;
  var ctrl;
  var sound;
  var stateMock;
  var song1 = {title: "song1"};
  var song2 = {title: "song2"};
  var CLIP_DURATION = 3;
  var TURN_NUMBER = 5;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSong', 'remainingSongs', 'storeGuessAndCalculate']);
    SongFetcherService.currentSong.and.returnValue(song1);
    SongsService = jasmine.createSpyObj('SongsService', ['getAlbum', 'nextSong']);
    GameLogicService = jasmine.createSpyObj('GameLogicService', ['getCurrentTurnNumber'])
    GameLogicService.getCurrentTurnNumber.and.returnValue(TURN_NUMBER)
    CurrentSongService = jasmine.createSpyObj('CurrentSongService', ['currentSongPreviewUrl', 'sortedRemainingSongs'])

    sound = jasmine.createSpyObj('sound', ['play']);
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    ngAudio = jasmine.createSpyObj('ngAudio',['load']);
    ngAudio.load.and.returnValue(sound);

    ctrl = $controller('SongController', {
      ngAudio: ngAudio,
      sound: sound,
      SongFetcherService: SongFetcherService,
      CurrentSongService: CurrentSongService,
      SongsService: SongsService,
      GameLogicService: GameLogicService,
      $state: stateMock
    });
  }));

  describe('#playCurrentSong', function(){

    it('plays song', function(){
      ctrl.playCurrentSong();
      expect(ngAudio.load).toHaveBeenCalled()
      expect(sound.play).toHaveBeenCalled();
    });

    it('passes the clip duration to SongFetcherService.currentSong', function(){
      ctrl.playCurrentSong(CLIP_DURATION);
      expect(CurrentSongService.currentSongPreviewUrl).toHaveBeenCalledWith(TURN_NUMBER, CLIP_DURATION);
    })
  })

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
      expect(SongFetcherService.storeGuessAndCalculate).toHaveBeenCalledWith(song1);
    })

    it('calls ctrl.changeToAnswerState', function() {
      ctrl.guessSong(song1);
      expect(stateMock.go).toHaveBeenCalledWith('answer',{});
    })


  });


})
