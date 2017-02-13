(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('CouponstatusController', CouponstatusController);

    /** @ngInject */
    function CouponstatusController($scope, Couponlist, $location, $uibModal, $log, $document, $stateParams) {
        var couponstatus = this;
        couponstatus.currentPage = 0;
        couponstatus.pageSize = 10;
        var couponStatus = $stateParams.status;
        var filter = { "filter": { "where": { "status": couponStatus }, "include": "customers" } };

        Couponlist.couponlist(filter, function(err, res) {
            if (err) {
                if (err.data && err.data.error && err.data.error.message) {
                    couponstatus.errorMessage = err.data.error.message;
                } else {
                    couponstatus.errorMessage = "Something Went Wrong"
                }
            } else {
                couponstatus.records = res;

            }
        });

        couponstatus.numberOfPages = function() {
            if (couponstatus.records && couponstatus.records.length) {
                return Math.ceil(couponstatus.records.length / couponstatus.pageSize);
            } else {
                return 0;
            }
        }

        couponstatus.deleteCoupon = function(index, id) {

            var Conf = confirm("Are you sure?");
            if (Conf == true) {
                Couponlist.deleteCoupon(id, function(err, res) {
                    if (err) {
                        if (err.data && err.data.error && err.data.error.message) {
                            couponstatus.errorMessage = err.data.error.message;
                            couponstatus.successMessage = false;
                        } else {
                            couponstatus.errorMessage = "Something Went Wrong";
                            couponstatus.successMessage = false;
                        }
                    } else {
                        couponstatus.records.splice(index, 1);
                        couponstatus.successMessage = "Coupon Deleted Successfully";
                        couponstatus.errorMessage = false;

                    }
                });
            } else {
                return false;
            }

        }
















    }
})();
