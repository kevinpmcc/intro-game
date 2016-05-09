describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ngAudio;
  var ctrl;
  var sound;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSong']);
    SongFetcherService.currentSong.and.returnValue("song1");

    sound = jasmine.createSpyObj('sound', ['play']);

    ngAudio = jasmine.createSpyObj('ngAudio',['load']);
    ngAudio.load.and.returnValue(sound);

    ctrl = $controller('SongController', {
      ngAudio: ngAudio,
      sound: sound,
      SongFetcherService: SongFetcherService,
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

})
