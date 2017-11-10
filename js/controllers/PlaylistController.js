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
					var wasAdded = playlistCtrl.user.addMusicInPlaylist(musicFound, playlistFound);
					if (wasAdded) {
						ServiceUser.showToast("Música adicionada na playlist com sucesso");
					} else {
						ServiceUser.showToast("Não é possível adicionar música repetida na playlist");
					}
				}
			}

			playlistCtrl.music = "";
			playlistCtrl.album = "";
			playlistCtrl.playlist = "";
		};

		playlistCtrl.showDetails = function showDetails(playlist, ev) {
			$mdDialog.show({
	            controller: DialogPLController,
	            controllerAs: "dialogPLCtrl",
	            templateUrl: 'views/playlist_dialog.html',
	            parent: angular.element(document.body),
	            targetEvent: ev,
	            clickOutsideToClose:true,
	            locals: {
	                user: playlistCtrl.user,
	                playlist: playlist
	            }
        	});
		};

		function DialogPLController(user, playlist) {
			var dialogPLCtrl = this;
	        dialogPLCtrl.user = user;
	        dialogPLCtrl.playlist = playlist;
	        dialogPLCtrl.playlistName = playlist.name;

	        dialogPLCtrl.hasMusics = function hasMusics() {
	        	return !_.isEmpty(playlist.musics);
	        };

	        dialogPLCtrl.removeMusic = function removeMusic(musicToBeRemoved, ev) {
				var confirm = $mdDialog.confirm()
		            .clickOutsideToClose(true)
		            .title('Remover Música da Playlist')
		            .textContent('Deseja remover esta música da playlist?')
		            .targetEvent(ev)
		            .ok('Sim')
		            .cancel('Não');

	            $mdDialog.show(confirm).then(function ok() {
	                dialogPLCtrl.playlist.removeMusic(musicToBeRemoved);
	                ServiceUser.showToast("Música removida");
	            }, function cancel() {
	                ServiceUser.showToast("Operação cancelada");
	            });
			};
		};

    });
})();