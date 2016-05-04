describe('introApp.routing', function(){

  var $state, $stateParams, $q, $templateCache, $location, $rootScope, $injector;

  function mockTemplate(templateRoute, tmpl) {
    $templateCache.put(templateRoute, tmpl || templateRoute);
  }

  function goFrom(url) {
    return {toState: function (state, params) {
      $location.replace().url(url); //Don't actually trigger a reload
      $state.go(state, params);
      $rootScope.$digest();
    }};
  }

  beforeEach(module('introGameApp.routing'));

  beforeEach(inject(function (_$state_, _$stateParams_, _$q_, _$templateCache_, _$location_, _$rootScope_, _$injector_) {
    $state = _$state_;
    $stateParams = _$stateParams_;
    $q = _$q_;
    $templateCache = _$templateCache_;
    $location = _$location_;
    $rootScope = _$rootScope_;
    $injector = _$injector_;
  }));

  describe('path', function () {
    function goTo(url) {
      $location.url(url);
      $rootScope.$digest();
    }

    describe('when empty', function () {
      beforeEach(function () {
        mockTemplate('views/partials/albums.html');
      });

      it('should go to albums', function () {
        goTo('');
        expect($state.current.name).toEqual('albums');
      });
    });

    describe('/', function () {
      beforeEach(function () {
        mockTemplate('views/partials/albums.html');
      });

      it('should go to albums', function () {
        goTo('/');
        expect($state.current.name).toEqual('albums');
      });
    });

    describe('/albums', function () {
      beforeEach(function () {
        mockTemplate('views/partials/albums.html');
      });

      it('should go to albums', function () {
        goTo('/albums');
        expect($state.current.name).toEqual('albums');
      });
    });

    describe('/song', function () {
      beforeEach(function () {
        mockTemplate('views/partials/song.html');
      });

      it('should go to song', function () {
        goTo('/song');
        expect($state.current.name).toEqual('song');
      });
    });

    describe('/answer', function () {
      beforeEach(function () {
        mockTemplate('views/partials/answer.html');
      });

      it('should go to answer', function () {
        goTo('/answer');
        expect($state.current.name).toEqual('answer');
      });
    });



  })

})
