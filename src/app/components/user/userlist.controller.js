(function() {
	'use strict';
	angular
	.module('angularSeedApp')
	.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})
	.controller('UserlistController', UserlistController);
	/** @ngInject */


	function UserlistController($scope,User,$location,$uibModal, $log, $document) {
		var userlist=this;
		 userlist.currentPage = 0;
		userlist.pageSize = 10;
		
		User.userlist(function(err, res) {
			if (err) {
				if (err.data && err.data.error && err.data.error.message) {
					userlist.errorMessage = err.data.error.message;
				} else {
					userlist.errorMessage = "Something Went Wrong"
				}
			} else {
				userlist.records = res;
			                      
			}
				});

userlist.numberOfPages=function(){
	if(userlist.records && userlist.records.length)
	{
		return Math.ceil(userlist.records.length/userlist.pageSize);                
	}else
	{
		return 0;
	}
				    }



		userlist.openUserModal = function () {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'app/components/modals/user.html',
				// size: size,
				// appendTo: parentElem,
				controller: function($scope) {
					$scope.name = 'top';  
					$scope.close=function(){
						modalInstance.close();
					}
					$scope.save=function(email,password,username,cpassword){
                         
                         if (password!=cpassword) 
                           {
								$scope.errorMessageModal = "Confirm Password Mismatch";
								$scope.successMessageModal=false;
								return false;
						   }



						var data=
						{
							email: email,
							password: password,
							username: username
						};
						if(email && password && username && cpassword)
						{ 
							insertUser(data);	
							modalInstance.close();
						}else
						{
							return false;
						}
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				// $ctrl.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};



		userlist.openEditUserModal = function (index,id,email,username) {
			var modalInstance = $uibModal.open({
				animation: true,
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'app/components/modals/editUser.html',
				// size: size,
				// appendTo: parentElem,
				controller: function($scope) {
					$scope.name = 'top';  
					$scope.username = username;
					$scope.email = email;  
					$scope.close=function(){
						modalInstance.close();
					}
					$scope.updateuser=function(username,email){
						var data=
						{
							
							username: username,
							email: email
						};
						if(username && email)
						{ 
							updateUser(index,id, data);	
							modalInstance.close();
						}else
						{
							return false;
						}
					}
				}
			});

			modalInstance.result.then(function (selectedItem) {
				// $ctrl.selected = selectedItem;
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		};


		function insertUser(data)
		{
			User.addUser(data, function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						userlist.errorMessage = err.data.error.message;
						userlist.successMessage=false;
					} else {
						userlist.errorMessage = "Something Went Wrong";
						userlist.successMessage=false;
					}
				} else {
					userlist.records.push(res);
					userlist.errorMessage = false;
				    userlist.successMessage="User Added Successfully";

				}
			});
		}


		function updateUser(index,id,data)
		{
			User.updateUser(id,data, function(err, res) {
				if (err) 
				{
					if (err.data && err.data.error && err.data.error.message) {
						userlist.errorMessage = err.data.error.message;
						userlist.successMessage=false;
					} else {
						userlist.errorMessage = "Something Went Wrong";
						userlist.successMessage=false;
					}
				} else 
				{
					userlist.records[index]={id:id,email:data.email,username:data.username};
					userlist.successMessage="User Updated Successfully";
					userlist.errorMessage = false;
				}
			});
		}

		userlist.deleteUser=function (index,id)
		{
           
            var Conf= confirm("Are you sure?");
			 if(Conf==true)
			    {
				     User.deleteUser(id, function(err, res) {
					if (err) {
						if (err.data && err.data.error && err.data.error.message) {
							userlist.errorMessage = err.data.error.message;
							userlist.successMessage=false;
						} else {
							userlist.errorMessage = "Something Went Wrong"
							userlist.successMessage=false;
						}
					} else {
						userlist.records.splice(index,1);
						userlist.successMessage="User Deleted Successfully";
						userlist.errorMessage=false;

						}
					});
			    }
			 else
			    {
			      return false;
			    }
		}

             

	}
})();


