'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("AlbumController", function AlbumController($state, ServiceUser) {
    var albumCtrl = this;
    albumCtrl.user = ServiceUser.user;


  });
})();