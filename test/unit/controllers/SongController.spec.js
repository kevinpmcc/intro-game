describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ngAudio;
  var ctrl;
  var sound;
  var stateMock;
  var song1 = {title: "song1"};
  var song2 = {title: "song2"};

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSong', 'remainingSongs']);
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

  it('calls SongFetcherService.currentSong with default SONGLENGTH', function() {
    ctrl.loadCurrentSong();
    expect(SongFetcherService.currentSong).toHaveBeenCalledWith(ctrl.SONGLENGTH);
  });

  it('has default SONGLENGTH of 1', function () {
    expect(ctrl.SONGLENGTH).toEqual(1);
  });

  describe('#playCurrentSong', function(){

    it('plays song', function(){
      ctrl.playCurrentSong();
      expect(ngAudio.load).toHaveBeenCalled()
      expect(sound.play).toHaveBeenCalled();
    });
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

  describe('#isCorrectGuess', function() {
    it('returns if guess is correct', function(){
      expect(ctrl.isCorrectGuess(song1)).toEqual(true)
      expect(ctrl.isCorrectGuess(song2)).toEqual(false)
    })
  })


})
