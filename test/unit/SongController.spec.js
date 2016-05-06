describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['currentSongFN']);
    SongFetcherService.currentSongFN.and.returnValue("song1");
    scope = $rootScope;
    ctrl = $controller('SongController', {
      SongFetcherService: SongFetcherService,
    });
  }));

  it('calls SongFetcherService.currentSong', function() {
    ctrl.loadCurrentSong();
    scope.$apply();
    expect(ctrl.currentSong).toEqual("song1");
    expect(SongFetcherService.currentSongFN).toHaveBeenCalled();
  });

})
