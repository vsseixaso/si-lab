'use strict';

(function() {
  var app = angular.module('musiteca', [
    'ngMaterial',
    'ui.router'
  ]);

  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state("app", {
        abstract: true,
        views: {
          main: {
            templateUrl: "views/main.html",
            controller: "MainController as mainCtrl"
          }
        }
      })
      .state("app.home", {
        url: "/",
        views: {
          content: {
            templateUrl: "views/home.html",
            controller: "HomeController as homeCtrl"
          }
        }
      })
      .state("app.artist", {
        url: "/artist",
        views: {
          content: {
            templateUrl: "views/artist.html",
            controller: "ArtistController as artistCtrl"
          }
        }
      })
      .state("app.music", {
        url: "/music",
        views: {
          content: {
            templateUrl: "views/music.html",
            controller: "MusicController as musicCtrl"
          }
        }
      });
  });
})();
