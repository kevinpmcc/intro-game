module.exports = function(config){
  config.set({
     basePath : '../',
     files : [
        'www/lib/spotify-web-api-js/src/spotify-web-api.js',
        'www/lib/ionic/js/ionic.bundle.js',
        'www/lib/ionic/js/angular-mocks/angular-mocks.js',
        'www/js/**/*.js',
        'test/unit/**/*.js'
      ],
      autoWatch : true,
      frameworks: ['jasmine'],
      browsers : ['Chrome'],
      port: 8080,
      plugins : [
              'karma-chrome-launcher',
              'karma-jasmine'
      ]
    });
  };
