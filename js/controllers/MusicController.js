'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("MusicController", function MusicController($state, ServiceUser) {
    var musicCtrl = this;
    musicCtrl.user = ServiceUser.user;

    musicCtrl.addMusic = function addMusic() {

    }

  });
})();