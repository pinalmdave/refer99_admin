(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('ProfileController', ProfileController);

	/** @ngInject */
	function ProfileController($scope,User,$location,$uibModal, $log, $document,Storage) {
		var profile=this;
		var user=Storage.getUser();
		User.getProfile(user.userId,function(err, res) {
			if (err) {
				if (err.data && err.data.error && err.data.error.message) {
					profile.errorMessage = err.data.error.message;
				} else {
					profile.errorMessage = "Something Went Wrong"
				}
			} else {
				profile.userData = res;

			}
		});



		$scope.updateProfile=function(username,email){
		  
			var data =  {
							email: email,
							username: username
						};

						

			User.updateProfile(user.userId,data, function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						profile.errorMessage = err.data.error.message;
						profile.successMessage=false;
					} else {
						profile.errorMessage = "Something Went Wrong";
						profile.successMessage=false;
					}
				} else {
					profile.successMessage = "Profile Updated Successfully";
					profile.errorMessage = false;
					//profile.records[index]={id:id,email:data.email,username:data.username};

				}
			});
		}

	


	}
})();


