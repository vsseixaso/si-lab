'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("ArtistController", function ArtistController($state, ServiceUser) {
    var artistCtrl = this;
    artistCtrl.user = ServiceUser.user;

    artistCtrl.addArtist = function addArtist() {
    	var data = {
    		name: artistCtrl.name,
    		image: artistCtrl.image
    	};
    	var artist = new Artist(data);
    	var wasAdded = artistCtrl.user.addArtist(artist);
    	if (!wasAdded) {
    		ServiceUser.showToast("Artista já existente no sistema");
    	} else {
    		ServiceUser.showToast("Artista adicionado com sucesso");
    	}

        artistCtrl.clear();
    };

    artistCtrl.clear = function clear() {
        artistCtrl.name = "";
        artistCtrl.image = "";
    };

  });
})();