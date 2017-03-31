(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .controller('ProcesscouponController', ProcesscouponController);

  /** @ngInject */
  function ProcesscouponController($scope, User, Couponlist, $location, $uibModal, $log, $document, $stateParams, Socialshare, business_logo) {
    var processcoupon = this;
    // var cp_id = $stateParams.cp_id;
    var c_id = $stateParams.c_id;
    // var referrer_id = $stateParams.referrer_id;
    // var c_id=$stateParams.c_id;
    processcoupon.socialShare = false;
    processcoupon.countryCode = "+1";
    processcoupon.description = "refer99 is a digital platform focused on referral based marketing using customer’s social media. Businesses use our platform to promote deals, discounts or rewards on their products and customers are encouraged to share the deals, discounts, offers with their friends or family on social media.";
    processcoupon._isNotMobile = (function() {
      var check = false;
      (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
      })(navigator.userAgent || navigator.vendor || window.opera);
      return !check;
    })();
    // console.log(processcoupon._isNotMobile);
    (function init() {
      Couponlist.getCouponCampaign(c_id, function(err, res) {
        if (err) {
          if (err.data && err.data.error && err.data.error.message) {
            processcoupon.errorMessage = err.data.error.message;
            processcoupon.successMessage = false;
          } else {
            processcoupon.errorMessage = "Something Went Wrong";
            processcoupon.successMessage = false;
          }
        } else {
          processcoupon.errorMessage = false;
          processcoupon.coupon_data = res;
          processcoupon.camp_data = res.campaigns;
          if (processcoupon.camp_data && processcoupon.camp_data.members && processcoupon.camp_data.members.business_logo) {
            processcoupon.business_logo = business_logo + processcoupon.camp_data.members.business_logo;
          } else {
            processcoupon.business_logo = business_logo + "fb_share.png";
          }
          processcoupon.shareurl = "http://refer99.com/admin/#/app/" + processcoupon.camp_data.id + "/" + processcoupon.coupon_data.refer_id + "/coupon_share";
          if(moment().isAfter(moment(processcoupon.camp_data.end_date))){
            processcoupon.canShare=false;
            processcoupon.coupon_data.status="Expired";
          }else if(processcoupon.camp_data.add_discount && !processcoupon.coupon_data.add_discount){
            processcoupon.canShare=true;
          }else if(processcoupon.camp_data.cp_share && processcoupon.coupon_data.status=="not_activated"){
            processcoupon.canShare=true;
          }else{
            processcoupon.canShare=false;
          }
          // processcoupon.shareurl = "http://refer99.com";
        /*  if (processcoupon.camp_data.cp_share || processcoupon.camp_data.add_discount) {
            processcoupon.openSocialShareModal();
          }
          console.log('res', res);*/

        }
      });
    })();

    processcoupon.getDateFormally = function(date) {
      return moment(date).format('LL');
    };

    processcoupon.onFacebook = function() {
      if (!processcoupon.shareurl) {
        return;
      }
      FB.ui({
          method: 'feed',
          name: 'refer99 Coupon Share',
          link: processcoupon.shareurl,
          picture: processcoupon.business_logo,
          caption: 'Reference Documentation',
          description: processcoupon.description,
          message: 'Facebook Dialogs are easy!'
        },
        function(response) {
          if (response && response.post_id) {
            // alert('Post was published.');
            processcoupon.socialShare = true;
          } else {
            processcoupon.socialShare = false;
            alert('Post was not published.');
          }
        }
      );
      // processcoupon.getActiveCoupon();
    }

    processcoupon.send_as_sms = function(contact) {
      if (!contact) {
        return;
      }
      var data = {
        mobile_no: processcoupon.countryCode + contact,
        c_code: processcoupon.coupon_data.c_code
      };
      Couponlist.send_coupon_as_sms(data, function(err, res) {
        if (err) {
          if (err.data && err.data.error && err.data.error.message) {
            processcoupon.errorMessage = err.data.error.message;
            processcoupon.successMessage = false;
          } else {
            processcoupon.errorMessage = "Please try again later";
            processcoupon.successMessage = false;
          }
          toastr.info('Please try again later');
        } else {
          processcoupon.errorMessage = false;
          toastr.info('Coupon code successfully sent to ' + processcoupon.countryCode + contact);
          processcoupon.share_data = res.result;

        }
      });
    }
    processcoupon.send_as_email = function(email) {
      if (!email) {
        return;
      }
      var data = {
        email: email,
        c_code: processcoupon.coupon_data.c_code
      };
      Couponlist.send_coupon_as_email(data, function(err, res) {
        if (err) {
          if (err.data && err.data.error && err.data.error.message) {
            processcoupon.errorMessage = err.data.error.message;
            processcoupon.successMessage = false;
          } else {
            processcoupon.errorMessage = "Please try again later";
            processcoupon.successMessage = false;
          }
          toastr.info('Please try again later');
        } else {
          processcoupon.errorMessage = false;
          processcoupon.share_data = res.result;
          toastr.info('Coupon code successfully sent to ' + email);

        }
      });
    }

    processcoupon.openGetCouponModal = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/components/modals/get_coupon.html',
        // size: size,
        // appendTo: parentElem,
        controller: function($scope) {
          $scope.countryCode = "+1";
          $scope.close = function() {
            modalInstance.close();
          }
          $scope.getCoupon = function(email, contact) {
            if (contact && contact.toString().length >= 10) {
              var contactStr = $scope.countryCode + contact.toString();
            } else if (contact && contact.toString().length < 10) {
              $scope.errorMessageModal = "Contact length does't less then 10";
              return;
            }
            if (!email && !contactStr) {
              $scope.errorMessageModal = "Please enter valid email or contact.";
              return;
            }
            $scope.errorMessageModal = null;
            generateProcessCoupon(email, contactStr);
            modalInstance.close();
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        // $ctrl.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    processcoupon.openSocialShareModal = function() {
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/components/modals/social_share.html',
        // size: size,
        // appendTo: parentElem,
        controller: function($scope) {
          $scope.m_sharecoupon = processcoupon;
          $scope.close = function() {
            modalInstance.close();
          }
          $scope.shareOnFacebook = function() {
            processcoupon.onFacebook();
            modalInstance.close();
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        // $ctrl.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

  }
})();
