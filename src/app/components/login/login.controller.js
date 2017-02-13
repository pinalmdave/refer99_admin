(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('LoginController', LoginController);

	/** @ngInject */
	function LoginController($scope,User,$location) {
		var login=this;
		login.login=function (email,password) {
			var data={
				email: email,
				password: password
			};
			User.login(data,"sys", function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						$scope.signupMessage = err.data.error.message;
					}else if (err.message) {
						$scope.signupMessage = err.message;
					} else {
						$scope.signupMessage = "Something Went Wrong"
					}
				} else {
					$location.path('/');
				}
			});
		}

	}
})();