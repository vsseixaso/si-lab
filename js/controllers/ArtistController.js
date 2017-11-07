'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("ArtistController", function ArtistController($state, $mdDialog, ServiceUser) {
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

      artistCtrl.name = "";
      artistCtrl.image = "";
    };

  });

  artistCtrl.search = function search(ev) {
    artistCtrl.result = [];
    _.forEach(artistCtrl.user.artists, function(artist) {
      if(artist.name === artistCtrl.nameToSearch) {
        result.push(artist);        
      }
    });

    if (!_.isEmpty(result)) {
      $mdDialog.show({
        controller: DialogController,
        controllerAs: "controller",
        templateUrl: 'views/artist_dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          result: artistCtrl.result,
          user: artistCtrl.user,
        }
      });
    } else {
      ServiceUser.showToast("Nenhum artista foi encontrado");
    }
  };

  artistCtrl.DialogController = function DialogController(result, user) {
    var dialogCtrl = this;
    dialogCtrl.user = user;
    dialogCtrl.result = result;

  }

})();