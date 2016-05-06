describe('SongController', function() {
  beforeEach(module('introGame.songController'));

  var SongFetcherService;
  var ctrl;

  beforeEach(inject(function($rootScope, $controller) {
    SongFetcherService = jasmine.createSpyObj('SongFetcherService', ['fetchCurrentSong']);
    SongFetcherService.fetchCurrentSong.and.returnValue("song1");
    ctrl = $controller('SongController', {
      SongFetcherService: SongFetcherService,
    });
  }));

  it('calls SongFetcherService.currentSong', function() {
    ctrl.loadCurrentSong();
    expect(SongFetcherService.fetchCurrentSong).toHaveBeenCalled();
  });

})
