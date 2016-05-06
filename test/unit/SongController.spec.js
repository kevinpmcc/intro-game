describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSongFunction']);
    SongFetcherService.currentSongFunction.and.returnValue("song1");
    ctrl = $controller('SongController', {
      SongFetcherService: SongFetcherService,
    });
  }));

  it('calls SongFetcherService.currentSong', function() {
    ctrl.loadCurrentSong();
    expect(ctrl.currentSong).toEqual("song1");
    expect(SongFetcherService.currentSongFunction).toHaveBeenCalled();
  });

})
