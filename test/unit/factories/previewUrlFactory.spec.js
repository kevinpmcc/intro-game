describe('PreviewUrlFactory', function() {

  var puf;
  var previewUrl = "https://p.scdn.co/mp3-preview/aa4f9186e0c3f4436bb40572a63862db80d7ef2d"
  var songLength = 1;

  beforeEach(module('introGame.previewUrlFactory'));
  beforeEach(inject(function(PreviewUrlFactory) {
    puf = new PreviewUrlFactory(previewUrl, songLength);
  }));

  it('appends song length to previewUrl', function() {
    expect(puf.previewUrl).toEqual("https://p.scdn.co/mp3-preview/aa4f9186e0c3f4436bb40572a63862db80d7ef2d#t=," + songLength)
  })
})
