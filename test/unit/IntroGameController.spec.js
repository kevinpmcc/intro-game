describe('IntroGameController', function() {
  beforeEach(module('introGame.app'));
  it('initialises with a toDo', function() {
    expect(ctrl.introGame).toEqual("IntroGame1");
  });
  var ctrl;
  beforeEach(inject(function($controller) {
    ctrl = $controller('IntroGameController');
  }));
});
