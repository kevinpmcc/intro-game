describe('CurrentSongService', function() {

  var CurrentSongService;
  var BOGUS_SONGS = [{title: 2},{title: 8},{title: 5},{title: 7},{title: 1},
                     {title: 4},{title: 9},{title: 6},{title: 10},{title: 3}];

  var TURN_NUMBER = 7;
  var DURATION = 3;
  var PREVIEW_URL = "URL"
  var URL_APPEND_STRING = "#t=,"
  var song = {previewUrl: PREVIEW_URL};

  beforeEach(module('introGame.currentSongService'))

  beforeEach(inject(function(_CurrentSongService_, _SongsService_){



    CurrentSongService = _CurrentSongService_;
    SongsService = _SongsService_;
  }));

  describe('#currentSongPreviewUrl', function() {
    it('returns song with appropriate clip length', function() {
      spyOn(SongsService, 'getSongAtPosition').and.returnValue(song)
      expect(CurrentSongService.currentSongPreviewUrl(TURN_NUMBER, DURATION)).toEqual(PREVIEW_URL + URL_APPEND_STRING + DURATION)
    });
  });

  describe('#sortedRemainingSongs', function(){

    beforeEach(function(){
      spyOn(SongsService, 'getAllSongs').and.returnValue(BOGUS_SONGS);
    })

    it('calls SongsService.getAllSongs()', function(){
      CurrentSongService.sortedRemainingSongs(TURN_NUMBER);
      expect(SongsService.getAllSongs).toHaveBeenCalled();
    })

    it('provides an array containing all unplayed songs', function(){
      expect(CurrentSongService.sortedRemainingSongs(TURN_NUMBER).length).toEqual(BOGUS_SONGS.length - TURN_NUMBER)
    });

    it('sorts returned array', function(){
      expect(CurrentSongService.sortedRemainingSongs(TURN_NUMBER)).toEqual([{title: 3},{title: 6},{title: 10}])
    })
  })
});
