angular.module('introGame.routing', ['ui.router'])
   .config(function($sceDelegateProvider, $stateProvider, $urlRouterProvider){
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://p.scdn.co/mp3-preview/**'
    ]);
    $urlRouterProvider
      .when('','/albums')
      .when('/','/albums')
      .otherwise('/albums');

    $stateProvider
      .state('albums', {
        url: '/albums',
        templateUrl: 'views/partials/albums.html'
      })
      .state('song', {
        url: '/song',
        templateUrl: 'views/partials/song.html'
      })
      .state('answer', {
        url: '/answer',
        templateUrl: 'views/partials/answer.html'
      })
    })
