'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("ArtistController", function ArtistController($state, $mdDialog, ServiceUser) {
    var artistCtrl = this;
    artistCtrl.user = ServiceUser.user;
    artistCtrl.artists = artistCtrl.user.getArtists();

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

    artistCtrl.changeStatus = function changeStatus(artist, ev) {
      if (artist.isFavorite) {
        var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Remover dos Favoritos')
            .textContent('Deseja remover este artista dos favoritos?')
            .targetEvent(ev)
            .ok('Remover')
            .cancel('Cancelar');

            $mdDialog.show(confirm).then(function ok() {
                artist.isFavorite = false;
                ServiceUser.showToast("Artista removido dos favoritos");
            }, function cancel() {
                artist.isFavorite = true;
                ServiceUser.showToast("Operação cancelada");
            });
      } else {
        artist.isFavorite = true;
        ServiceUser.showToast("Artista adicionado aos favoritos");
      }
    };

    artistCtrl.showDetails = function showDetails(artist, ev) {
      
    };

  });

})();