angular.module('introGame.routing', ['ui.router'])
   .config(function($stateProvider, $urlRouterProvider){
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
        templateUrl: 'views/partials/song.html',
      })
      .state('answer', {
        url: '/answer',
        templateUrl: 'views/partials/answer.html'

      })
    })
