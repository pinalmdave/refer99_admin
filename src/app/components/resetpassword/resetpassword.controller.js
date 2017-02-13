(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('ResetPasswordController', ResetPasswordController);

	/** @ngInject */
	function ResetPasswordController($scope,User,$location,$stateParams) {
		var resetpassword=this;
		var resetPasswordToken=$stateParams.resetPasswordToken;
		resetpassword.updatePassword=function (newPassword,confirmNewPassword) {
			var data={
				      password:newPassword,
				      confirm:confirmNewPassword,
				      resetPasswordToken:resetPasswordToken
			         };
			User.resetPassword(data, function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						resetpassword.errorMessage = err.data.error.message;
						resetpassword.successMessage =false;
					} else {
						resetpassword.errorMessage = "Something Went Wrong";
						resetpassword.successMessage =false;
					}
				} else {
					resetpassword.successMessage = "Password Changed Successfully";
					resetpassword.errorMessage =false;

				}
			});
		}

	}
})();