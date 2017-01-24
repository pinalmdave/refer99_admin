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
          console.log('err', err);
          if (err.data && err.data.error && err.data.error.message) {
            sharecoupon.errorMessage = err.data.error.message;
            sharecoupon.successMessage = false;
          } else {
            sharecoupon.errorMessage = "Something Went Wrong";
            sharecoupon.successMessage = false;
          }
        } else {
          console.log('res', res);
          sharecoupon.errorMessage = false;
          sharecoupon.camp_data = res;
          if (sharecoupon.camp_data && sharecoupon.camp_data.members && sharecoupon.camp_data.members.business_logo) {
            sharecoupon.business_logo = business_logo + sharecoupon.camp_data.members.business_logo;
            console.log(sharecoupon.business_logo);
          }
          /*Couponlist.getCoupon(c_id, function(err, res) {
          	if (err) {
          		console.log('err',err);
          		if (err.data && err.data.error && err.data.error.message) {
          			sharecoupon.errorMessage = err.data.error.message;
          			sharecoupon.successMessage=false;
          		} else {
          			sharecoupon.errorMessage = "Something Went Wrong";
          			sharecoupon.successMessage=false;
          		}
          	} else {
          		console.log('res', res);
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
          picture: business_logo + "refer99_logo@3x.png",
          caption: 'Reference Documentation',
          description: 'Please use or share my Coupon code in refer99 App to get benifits.',
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
          console.log('err', err);
          if (err.data && err.data.error && err.data.error.message) {
            sharecoupon.errorMessage = err.data.error.message;
            sharecoupon.successMessage = false;
          } else {
            sharecoupon.errorMessage = "Something Went Wrong";
            sharecoupon.successMessage = false;
          }
        } else {
          console.log('res', res);
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
          console.log('err', err);
          if (err.data && err.data.error && err.data.error.message) {
            sharecoupon.errorMessage = err.data.error.message;
            sharecoupon.successMessage = false;
          } else {
            sharecoupon.errorMessage = "Something Went Wrong";
            sharecoupon.successMessage = false;
          }
        } else {
          console.log('res', res);
          sharecoupon.errorMessage = false;
          sharecoupon.coupon_data = res.result;

        }
      });
    }

    sharecoupon.send_as_sms = function(contact) {
      console.log('contact', contact);
      if (!contact) {
        return;
      }
      var data = {
        mobile_no: sharecoupon.countryCode + contact,
        c_code: sharecoupon.coupon_data.c_code
      };
      console.log('data', data);
      Couponlist.send_coupon_as_sms(data, function(err, res) {
        if (err) {
          console.log('err', err);
          if (err.data && err.data.error && err.data.error.message) {
            sharecoupon.errorMessage = err.data.error.message;
            sharecoupon.successMessage = false;
          } else {
            sharecoupon.errorMessage = "Please try again later";
            sharecoupon.successMessage = false;
          }
          toastr.info('Please try again later');
        } else {
          console.log('res', res);
          sharecoupon.errorMessage = false;
          toastr.info('Coupon code successfully sent to ' + sharecoupon.countryCode + contact);
          sharecoupon.share_data = res.result;

        }
      });
    }
    sharecoupon.send_as_email = function(email) {
      console.log('email', email);
      if (!email) {
        return;
      }
      var data = {
        email: email,
        c_code: sharecoupon.coupon_data.c_code
      };
      Couponlist.send_coupon_as_email(data, function(err, res) {
        if (err) {
          console.log('err', err);
          if (err.data && err.data.error && err.data.error.message) {
            sharecoupon.errorMessage = err.data.error.message;
            sharecoupon.successMessage = false;
          } else {
            sharecoupon.errorMessage = "Please try again later";
            sharecoupon.successMessage = false;
          }
          toastr.info('Please try again later');
        } else {
          console.log('res', res);
          sharecoupon.errorMessage = false;
          sharecoupon.share_data = res.result;
          toastr.info('Coupon code successfully sent to ' + email);

        }
      });
    }



  }
})();