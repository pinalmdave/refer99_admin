(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('GeneratecouponController', GeneratecouponController);
	/** @ngInject */
	function GeneratecouponController($scope,Generatecoupon,$location,$uibModal, $log, $document, $stateParams) {
		var generatecoupon=this;
		var cp_id=$stateParams.cp_id;
		generatecoupon.generateCoupon = function (email,contact) {
               
               if(!email && !contact)
               { 
                 generatecoupon.errorMessage = "Please enter email or contact";
				 generatecoupon.successMessage=false;
				 return false;
                }

               var data=
						{
							cp_id:cp_id,
							email: email,
							contact: contact
						};
		 
		  Generatecoupon.generateCoupon(data, function(err, res) {
				if (err) {
					if (err.data && err.data.error && err.data.error.message) {
						generatecoupon.errorMessage = err.data.error.message;
						generatecoupon.successMessage=false;
					} else {
						generatecoupon.errorMessage = "Something Went Wrong";
						generatecoupon.successMessage=false;
					}
				} else {
					
					generatecoupon.errorMessage = false;
				    generatecoupon.successMessage="Coupon generated Successfully";
				    $location.path("/app/"+cp_id+"/"+res.result.id+"/coupon_preview");

				}
			});


			
		};





             

	}
})();


