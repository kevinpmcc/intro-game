describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSong']);
    SongFetcherService.currentSong.and.returnValue("song1");
    ctrl = $controller('SongController', {
      SongFetcherService: SongFetcherService,
    });
  }));

  it('calls SongFetcherService.currentSong with default SONGLENGTH', function() {
    ctrl.loadCurrentSong();
    expect(SongFetcherService.currentSong).toHaveBeenCalledWith(ctrl.SONGLENGTH);
  });

  it('has default SONGLENGTH of 1', function () {
    expect(ctrl.SONGLENGTH).toEqual(1);
  })

})
