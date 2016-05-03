describe('Basic feature test of ionicTest App', function() {
  it('has a title', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('ionicTest App');
  });
});
