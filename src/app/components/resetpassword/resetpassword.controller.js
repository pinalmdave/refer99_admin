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
			         console.log(data);
			User.resetPassword(data, function(err, res) {
				if (err) {
					console.log('err',err);
					if (err.data && err.data.error && err.data.error.message) {
						resetpassword.errorMessage = err.data.error.message;
						resetpassword.successMessage =false;
					} else {
						resetpassword.errorMessage = "Something Went Wrong";
						resetpassword.successMessage =false;
					}
				} else {
					console.log('res', res);
					resetpassword.successMessage = "Password Changed Successfully";
					resetpassword.errorMessage =false;

				}
			});
		}

	}
})();