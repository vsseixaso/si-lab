'use strict';

(function () {
	var app = angular.module("musiteca");
  	app.controller("PlaylistController", function PlaylistController($state, $mdDialog, ServiceUser) {
	    var playlistCtrl = this;
	    playlistCtrl.user = ServiceUser.user;
	    playlistCtrl.playlists = playlistCtrl.user.getPlaylists();

	    playlistCtrl.addPlaylist = function addPlaylist() {
	    	var data = {
	    		name: playlistCtrl.name
	    	};
	    	var playlist = new Playlist(data);
	    	var wasAdded = playlistCtrl.user.addPlaylist(playlist);
	    	if (!wasAdded) {
	    		ServiceUser.showToast("Playlist já existente no sistema");
	    	} else {
	    		ServiceUser.showToast("Playlist criada com sucesso");
	    	}

	    	playlistCtrl.name = "";
		};

		playlistCtrl.removePlaylist = function removePlaylist(playlistToBeRemoved, ev) {
			var confirm = $mdDialog.confirm()
	            .clickOutsideToClose(true)
	            .title('Remover Playlist')
	            .textContent('Deseja remover esta playlist?')
	            .targetEvent(ev)
	            .ok('Sim')
	            .cancel('Não');

            $mdDialog.show(confirm).then(function ok() {
                playlistCtrl.user.removePlaylist(playlistToBeRemoved);
                ServiceUser.showToast("Playlist removida");
            }, function cancel() {
                ServiceUser.showToast("Operação cancelada");
            });
		};

		playlistCtrl.addMusic = function addMusic() {
			var playlistFound = playlistCtrl.user.findPlaylist(playlistCtrl.playlist);
			var albumFound = playlistCtrl.user.findAlbum(playlistCtrl.album);

			if (!playlistFound) {
				ServiceUser.showToast("Playlist não encontrada");
			} else if (!albumFound) {
				ServiceUser.showToast("Álbum não encontrado");
			}
			if (playlistFound && albumFound) {
				var musicFound = albumFound.findMusic(playlistCtrl.music);
				
				if (!musicFound) {
					ServiceUser.showToast("Música não encontrada");
				} else {
					playlistCtrl.user.addMusicInPlaylist(musicFound, playlistFound);
					ServiceUser.showToast("Música adicionada na playlist com sucesso");
				}
			}
		};

    });
})();