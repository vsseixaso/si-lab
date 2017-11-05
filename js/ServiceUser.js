'use strict';

(function () {
  var app = angular.module("musiteca");
  app.service("ServiceUser", function ServiceUser($mdToast) {
    var servUser = this;
    servUser.user = new User();

    servUser.showToast = function showToast(message) {
    	$mdToast.show(
	      $mdToast.simple()
	        .textContent(message)
	        .action('FECHAR')
	        .highlightAction(true)
	        .hideDelay(5000)
	        .position('bottom right')
	    );
    };

  });
})();
