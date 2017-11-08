'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("MusicController", function MusicController($state, $mdDialog, ServiceUser) {
    var musicCtrl = this;
    musicCtrl.user = ServiceUser.user;

    musicCtrl.addMusic = function addMusic(ev) {
            var data = {
                name: musicCtrl.name, 
                artist: musicCtrl.artist, 
                album: musicCtrl.album, 
                year: musicCtrl.year,
                duration: musicCtrl.duration
            };
            var music = new Music(data);
            
            if (!musicCtrl.user.findArtist(music.artist)) {
                ServiceUser.showToast('Artista não existe! Operação cancelada');
            } else {
                var album = musicCtrl.user.findAlbum(music.album);
                if (album) {
                    musicCtrl.showDialog(music, ev);
                } else {
                    musicCtrl.user.addMusic(music);
                    ServiceUser.showToast('Álbum criado e música adicionada com sucesso');
                }
            }

            musicCtrl.name = "";
            musicCtrl.artist = "";
            musicCtrl.album = "";
            musicCtrl.year = "";
            musicCtrl.duration = "";
        };

        musicCtrl.showDialog = function showDialog(music, ev) {
            var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Adicionar Música')
            .textContent('Esse álbum já existe, deseja adicionar a música ao mesmo?')
            .targetEvent(ev)
            .ok('Sim')
            .cancel('Não');

            $mdDialog.show(confirm).then(function ok() {
                var result = musicCtrl.user.addMusic(music);
                if (result) {
                    ServiceUser.showToast('Música adicionada com sucesso');
                } else {
                    ServiceUser.showToast('Música já existente no álbum');
                }
                
            }, function cancel() {
                ServiceUser.showToast('Operação cancelada');
            });
        };

  });
})();