describe("Current Angular UI router state", function () {




    beforeEach(function () {
        browser.get("/");



    });

    it("should get the current state", function (){
      var currentStateName = browser.executeAsyncScript(function(callback) {
        var el = document.querySelector("html");  // ng-app is defined on html element in this case
        var injector = angular.element(el).injector();
        var service = injector.get('$state');
        callback(service.current.name);
      });

        expect(currentStateName).toEqual("albums");
    });

    it("should transition from albums to song on clicking link", function(){
      var el = element(by.id('song'))
      el.click()

      var currentStateName = browser.executeAsyncScript(function(callback) {
        var el = document.querySelector("html");  // ng-app is defined on html element in this case
        var injector = angular.element(el).injector();
        var service = injector.get('$state');

        callback(service.current.name);
      });

        expect(currentStateName).toEqual("song");

    })

    it("should transition from albums to answer on clicking link twice", function(){
      element(by.id('song')).click()
      element(by.id('answer')).click()

      var currentStateName = browser.executeAsyncScript(function(callback) {
        var el = document.querySelector("html");  // ng-app is defined on html element in this case
        var injector = angular.element(el).injector();
        var service = injector.get('$state');

        callback(service.current.name);
      });

        expect(currentStateName).toEqual("answer");

    })
});
