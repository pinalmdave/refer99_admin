(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('ChangepasswordController', ChangepasswordController);

	/** @ngInject */
	function ChangepasswordController($scope,User,$location,$uibModal, $log, $document,Storage) {
		var password=this;
		var user=Storage.getUser();
		
	
	$scope.changePassword=function(oldpassword,newpassword,cpassword){

		            if (newpassword!=cpassword) 
		           {
						password.errorMessage = "Confirm Password mismatch";
						password.successMessage=false;
						return false;
						// alert(password.errorMessage);
				   } 
		  
			var data =  {
							old_password: oldpassword,
							new_password: newpassword
						};

						

			User.change_password(data, function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						password.errorMessage = err.data.error.message;
						password.successMessage=false;
						// alert(password.errorMessage);
					} else {
						password.errorMessage = "Something went Wrong";
						password.successMessage="";
						// alert(password.errorMessage);
					}
				} else {
					password.successMessage = "Password Changed Successfully";
					password.errorMessage = false;
					// alert("Password Changed Successfully");
					//profile.records[index]={id:id,email:data.email,username:data.username};

				}
			});
		}

	


	}
})();


