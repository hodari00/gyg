/**
 * @ngdoc overview
 * @name gygApp
 * @description
 * Module definition for the gygApp module.
 */

(function () {
  'use strict';

  angular
    .module('gygApp', [
      // Add modules below
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngMessages',
      'ngMaterial',
      'ui.router',
      'btford.socket-io',
      'gygApp.lodash',
      'gygApp.mainMenu',
      'gygApp.io',
      'gygApp.socket',
      'gygApp.main',
    ])
    .config(appConfig);

  /* App configuration */

  // add appConfig dependencies to inject
  appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider'];

  /**
   * Application config function
   *
   * @param $stateProvider
   * @param $urlRouterProvider
   * @param $locationProvider
   */
  function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
    $urlRouterProvider.otherwise('/');
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(true);
  


    // set the default palette name
    var defaultPalette = 'blue';
    // define a palette to darken the background of components
    var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

    $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
    $mdThemingProvider.setDefaultTheme(defaultPalette);

    // customize the theme
    $mdThemingProvider
      .theme(defaultPalette)
      .primaryPalette(defaultPalette)
      .accentPalette('pink')
      .backgroundPalette('grey-background');

    var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
    $mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
    $mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
    $mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
    $mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
    $mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
  };

})();
