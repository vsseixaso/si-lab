'use strict';

(function () {
	var app = angular.module("musiteca");
  	app.controller("PlaylistController", function PlaylistController($state, $mdDialog, ServiceUser) {
	    var playlistCtrl = this;
	    playlistCtrl.user = ServiceUser.user;

	    
    });
})();