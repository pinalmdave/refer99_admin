(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .service('Couponlist', Couponlist);

  /** @ngInject */
  function Couponlist(Restangular, Storage, $rootScope) {
    var thisVar = this;
    this.couponlist = function(filter, next) {
      Restangular
        .one('coupons')
        //.all('login')
        //.post(data)
        .get(filter)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.getCoupon = function(id, next) {
      Restangular
        .one('coupons')
        .one(id)
        .get()
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.getCouponCampaign = function(id, next) {
      var options = {
        filter: {
          "include": { "relation": "campaigns", "scope": { "include": "members" } }
        }
      };
      Restangular
        .one('coupons')
        .one(id)
        .get(options)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.getActiveCoupon = function(data, next) {
      Restangular
        .one('coupons')
        .one('create_active_coupon')
        .get(data)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.process_coupon_generate = function(data, next) {
      Restangular
        .one('coupons')
        .one('process_coupon_generate')
        .get(data)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.deleteCoupon = function(id, next) {
      Restangular
        .one('coupons')
        .one(id)
        .remove()
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.activateCoupon = function(id, next) {
      Restangular
        .one('coupons')
        .one(id)
        .customPUT({ status: "activated" })
        /*.get()*/
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.send_coupon_as_sms = function(data, next) {
      Restangular
        .one('coupons')
        .one('send_coupon_as_sms')
        .get(data)
        /*.get()*/
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.send_coupon_as_email = function(data, next) {
      Restangular
        .one('coupons')
        .one('send_coupon_as_email')
        .get(data)
        /*.get()*/
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

  }

})();
