(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('SharecouponController', SharecouponController);

    /** @ngInject */
    function SharecouponController($scope, User, Couponlist, $location, $uibModal, $log, $document, $stateParams, Socialshare, business_logo) {
        var sharecoupon = this;
        var cp_id = $stateParams.cp_id;
        // var c_id=$stateParams.c_id;
        sharecoupon.countryCode = "+1";
        sharecoupon.shareurl = $location.absUrl();
        (function init() {

            User.getCampaign(cp_id, function(err, res) {
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        sharecoupon.errorMessage = err.data.error.message;
                        sharecoupon.successMessage = false;
                    } else {
                        sharecoupon.errorMessage = "Something Went Wrong";
                        sharecoupon.successMessage = false;
                    }
                } else {
                    sharecoupon.errorMessage = false;
                    sharecoupon.camp_data = res;
                    if (sharecoupon.camp_data && sharecoupon.camp_data.members && sharecoupon.camp_data.members.business_logo) {
                        sharecoupon.business_logo = business_logo + sharecoupon.camp_data.members.business_logo;
                    }
                    /*Couponlist.getCoupon(c_id, function(err, res) {
                      if (err) {
                        if (err.data && err.data.error && err.data.error.message) {
                          sharecoupon.errorMessage = err.data.error.message;
                          sharecoupon.successMessage=false;
                        } else {
                          sharecoupon.errorMessage = "Something Went Wrong";
                          sharecoupon.successMessage=false;
                        }
                      } else {
                        sharecoupon.errorMessage = false;
                        sharecoupon.coupon_data=res;

                      }
                    });*/
                }
            });

        })();

        sharecoupon.getDateFormally = function(date) {
            return moment(date).format('LL');
        };

        sharecoupon.onFacebook = function() {
            FB.ui({
                    method: 'feed',
                    name: 'refer99 Coupon Share',
                    link: sharecoupon.shareurl,
                    picture: business_logo + sharecoupon.business_logo ? sharecoupon.business_logo : "fb_share.png",
                    caption: 'Reference Documentation',
                    description: 'refer99 is a digital platform focused on referral based marketing using customer’s social media. Businesses use our platform to promote deals, discounts or rewards on their products and customers are encouraged to share the deals, discounts, offers with their friends or family on social media.',
                    message: 'Facebook Dialogs are easy!'
                },
                function(response) {
                    if (response && response.post_id) {
                        // alert('Post was published.');
                        sharecoupon.getActiveCoupon();
                    } else {
                        alert('Post was not published.');
                    }
                }
            );
            // sharecoupon.getActiveCoupon();
        }

        sharecoupon.activate = function() {
            Couponlist.activateCoupon(c_id, function(err, res) {
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        sharecoupon.errorMessage = err.data.error.message;
                        sharecoupon.successMessage = false;
                    } else {
                        sharecoupon.errorMessage = "Something Went Wrong";
                        sharecoupon.successMessage = false;
                    }
                } else {
                    sharecoupon.errorMessage = false;
                    sharecoupon.coupon_data = res;

                }
            });
        }

        sharecoupon.getActiveCoupon = function() {
            toastr.info('Just generating active coupon', 'Please Wait..', {
                timeOut: 0,
                extendedTimeOut: 0
            });
            var data = {
                cp_id: cp_id
            };
            Couponlist.getActiveCoupon(data, function(err, res) {
                toastr.clear();
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        sharecoupon.errorMessage = err.data.error.message;
                        sharecoupon.successMessage = false;
                    } else {
                        sharecoupon.errorMessage = "Something Went Wrong";
                        sharecoupon.successMessage = false;
                    }
                } else {
                    sharecoupon.errorMessage = false;
                    sharecoupon.coupon_data = res.result;

                }
            });
        }

        sharecoupon.send_as_sms = function(contact) {
            if (!contact) {
                return;
            }
            var data = {
                mobile_no: sharecoupon.countryCode + contact,
                c_code: sharecoupon.coupon_data.c_code
            };
            Couponlist.send_coupon_as_sms(data, function(err, res) {
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        sharecoupon.errorMessage = err.data.error.message;
                        sharecoupon.successMessage = false;
                    } else {
                        sharecoupon.errorMessage = "Please try again later";
                        sharecoupon.successMessage = false;
                    }
                    toastr.info('Please try again later');
                } else {
                    sharecoupon.errorMessage = false;
                    toastr.info('Coupon code successfully sent to ' + sharecoupon.countryCode + contact);
                    sharecoupon.share_data = res.result;

                }
            });
        }
        sharecoupon.send_as_email = function(email) {
            if (!email) {
                return;
            }
            var data = {
                email: email,
                c_code: sharecoupon.coupon_data.c_code
            };
            Couponlist.send_coupon_as_email(data, function(err, res) {
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        sharecoupon.errorMessage = err.data.error.message;
                        sharecoupon.successMessage = false;
                    } else {
                        sharecoupon.errorMessage = "Please try again later";
                        sharecoupon.successMessage = false;
                    }
                    toastr.info('Please try again later');
                } else {
                    sharecoupon.errorMessage = false;
                    sharecoupon.share_data = res.result;
                    toastr.info('Coupon code successfully sent to ' + email);

                }
            });
        }



    }
})();
