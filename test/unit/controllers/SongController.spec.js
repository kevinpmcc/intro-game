describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ngAudio;
  var ctrl;
  var sound;
  var stateMock;
  var song1 = {title: "song1"};
  var song2 = {title: "song2"};
  var clipDuration = 3;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSong', 'remainingSongs', 'storeGuessAndCalculate']);
    SongFetcherService.currentSong.and.returnValue(song1);
    sound = jasmine.createSpyObj('sound', ['play']);
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    ngAudio = jasmine.createSpyObj('ngAudio',['load']);
    ngAudio.load.and.returnValue(sound);

    ctrl = $controller('SongController', {
      ngAudio: ngAudio,
      sound: sound,
      SongFetcherService: SongFetcherService,
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
      ctrl.playCurrentSong(clipDuration);
      expect(SongFetcherService.currentSong).toHaveBeenCalledWith(clipDuration);
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
      expect(SongFetcherService.remainingSongs).toHaveBeenCalled();
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
