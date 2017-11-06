'use strict';

(function () {
  var app = angular.module("musiteca");
  app.controller("MusicController", function MusicController($state, $mdDialog, ServiceUser) {
    var musicCtrl = this;
    musicCtrl.user = ServiceUser.user;

    musicCtrl.addMusic = function addMusic(ev) {
            var data = {name: musicCtrl.name, 
                artist: musicCtrl.artist, 
                album: musicCtrl.album, 
                year: musicCtrl.year,
                duration: musicCtrl.duration
            };
            var music = new Music(data);
            
            var album = musicCtrl.user.findAlbum(music.album);
            if (album) {
                musicCtrl.showConfirmDialog(music, ev);
            } else {
                musicCtrl.user.addMusic(music);
                ServiceUser.showToast('Música adicionada com sucesso');
            }

            clearFields();
        };

        musicCtrl.showConfirmDialog = function showConfirmDialog(music, ev) {
            var confirm = $mdDialog.confirm()
            .clickOutsideToClose(true)
            .title('Adicionar Música')
            .textContent('Esse álbum já existe, deseja adicionar a música no álbum existente?.')
            .ariaLabel('Adicionar Música')
            .targetEvent(ev)
            .ok('Adicionar')
            .cancel('Cancelar');

            $mdDialog.show(confirm).then(function ok() {
                var result = musicCtrl.user.addMusic(music);
                if (result) {
                    ServiceUser.showToast('Música adicionada com sucesso');
                } else {
                    ServiceUser.showToast('Música já existente no álbum');
                }
                
            }, function cancel() {
                ServiceUser.showToast('Cancelado');
            });
        };

        function clearFields() {
            musicCtrl.name = "";
            musicCtrl.artist = "";
            musicCtrl.album = "";
            musicCtrl.year = "";
            musicCtrl.duration = "";
        };

  });
})();