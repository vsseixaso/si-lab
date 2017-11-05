'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("HomeController", function HomeController($state, ServiceUser) {
    var homeCtrl = this;
    homeCtrl.user = ServiceUser.user;
  });
})();
