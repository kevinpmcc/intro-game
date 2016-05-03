module.exports = function(config){
  config.set({
     basePath : '../',
     files : [
        'www/bower_components/angular/angular.js',
        'www/bower_components/angular-mocks/angular-mocks.js',
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
