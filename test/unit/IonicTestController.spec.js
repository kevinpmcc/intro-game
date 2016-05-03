describe('IonicTestController', function() {
  beforeEach(module('ionicTestApp'));
  it('initialises with a toDo', function() {
    expect(ctrl.ionicTest).toEqual("IonicTest1");
  });
  var ctrl;
  beforeEach(inject(function($controller) {
    ctrl = $controller('IonicTestController');
  }));
});
