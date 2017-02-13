(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('CouponlistController', CouponlistController);

	/** @ngInject */
	function CouponlistController($scope,Couponlist,$location,$uibModal, $log, $document) {
		var couponlist=this;
		 couponlist.currentPage = 0;
		 couponlist.pageSize = 10;
        var filter={"filter":{"include":"customers"}};
		Couponlist.couponlist(filter,function(err, res) {
			if (err) {
				if (err.data && err.data.error && err.data.error.message) {
					couponlist.errorMessage = err.data.error.message;
				} else {
					couponlist.errorMessage = "Something Went Wrong"
				}
			} else {
				couponlist.records = res;
			}
		});

		couponlist.numberOfPages=function(){
	if(couponlist.records && couponlist.records.length){
				        return Math.ceil(couponlist.records.length/couponlist.pageSize);                
	}else
	{
		return 0;
	}
				    }


        couponlist.deleteCoupon=function (index,id)
		{
           
            var Conf= confirm("Are you sure?");
			 if(Conf==true)
			    {
				     Couponlist.deleteCoupon(id, function(err, res) {
					if (err) {
						if (err.data && err.data.error && err.data.error.message) {
							couponlist.errorMessage = err.data.error.message;
							couponlist.successMessage=false;
						} else {
							couponlist.errorMessage = "Something Went Wrong";
							couponlist.successMessage=false;
						}
					} else {
						couponlist.records.splice(index,1);
						couponlist.successMessage = "Coupon Deleted Successfully";
						couponlist.errorMessage=false;

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


