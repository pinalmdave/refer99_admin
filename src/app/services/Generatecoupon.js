(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .service('Generatecoupon', Generatecoupon);

  /** @ngInject */
  function Generatecoupon(Restangular, Storage, $rootScope) {
    var thisVar = this;
    this.generateCoupon = function(data, next) {
      Restangular
       .one('coupons')
        .all('generate_camp_coupon')
        .post(data)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    


    

  }

})();