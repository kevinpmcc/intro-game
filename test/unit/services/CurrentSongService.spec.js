describe('CurrentSongService', function() {

  var CurrentSongService;
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
  it('provides an array containing all unplayed songs', function(){

  });




});
