'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("MainController", function MainController($state) {
    var mainCtrl = this;

    mainCtrl.goHome = function goHome() {
      $state.go("app.home");
	};

	mainCtrl.goArtist = function goArtist() {
      $state.go("app.artist");
	};
  });
})();
