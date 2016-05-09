xdescribe('Basic feature test of introGame App', function() {
  it('has a title', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('introGame App');
  });
});
