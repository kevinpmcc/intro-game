describe('PlayFactory', function() {

  var pf;
  var DURATION = 3;

  beforeEach(module('introGame.playFactory'));
  beforeEach(inject(function(PlayFactory) {
    pf = new PlayFactory(DURATION);
  }));

  it('creates a new play', function() {
    expect(pf.duration).toEqual(DURATION);
    expect(pf.score).toEqual(0);
    expect(pf.guess).toEqual(undefined);
  });

});
