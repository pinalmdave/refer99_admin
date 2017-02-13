(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('ForgotpasswordController', ForgotpasswordController);

	/** @ngInject */
	function ForgotpasswordController($scope,User,$location) {
		var forgotpassword=this;
		forgotpassword.forgotPassword=function (email) {
			var data={email:email};
			User.send_forget_password_email(data, function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						forgotpassword.errorMessage = err.data.error.message;
						forgotpassword.successMessage =false;
					} else {
						forgotpassword.errorMessage = "Something Went Wrong";
						forgotpassword.successMessage =false;
					}
				} else {
					forgotpassword.successMessage = "Please Check your Email to reset your Password";
					forgotpassword.errorMessage =false;

				}
			});
		}

	}
})();