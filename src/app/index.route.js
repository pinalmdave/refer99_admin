(function() {
    'use strict';

    angular
    .module('angularSeedApp')
    .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
    // Application routing
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
    })
    .state('user', {
        url: '/user',
        templateUrl: 'app/components/user/userlist.html',
        controller: 'UserlistController',
        controllerAs: 'userlist'
    })
    .state('coupon', {
        url: '/coupon',
        templateUrl: 'app/components/coupon/couponlist.html',
        controller: 'CouponlistController',
        controllerAs: 'couponlist'
    })
    .state('coupon_status', {
        url: '/coupon/:status',
        templateUrl: 'app/components/coupon_status/couponstatus.html',
        controller: 'CouponstatusController',
        controllerAs: 'couponstatus'
    })
    .state('profile', {
        url: '/profile',
        templateUrl: 'app/components/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
    })
     .state('password', {
        url: '/password',
        templateUrl: 'app/components/password/changepassword.html',
        controller: 'ChangepasswordController',
        controllerAs: 'password'
    })
     .state('forgotpassword', {
        url: '/forgotpassword',
        templateUrl: 'app/components/forgotpassword/forgotpassword.html',
        controller: 'ForgotpasswordController',
        controllerAs: 'forgotpassword'
    })
     .state('resetpassword', {
        url: '/reset/:resetPasswordToken',
        templateUrl: 'app/components/resetpassword/resetpassword.html',
        controller: 'ResetPasswordController',
        controllerAs: 'resetpassword'
    })
     .state('generatecoupon', {
        url: '/app/:cp_id/coupon_share',
         templateUrl: 'app/components/sharecoupon/sharecoupon.html',
        controller: 'SharecouponController',
        controllerAs: 'sharecoupon'
    });
   /*  .state('generatecoupon', {
        url: '/app/:cp_id/coupon_share',
        templateUrl: 'app/components/app/generatecoupon.html',
        controller: 'GeneratecouponController',
        controllerAs: 'generatecoupon'
    })
     .state('sharecoupon', {
        url: '/app/:cp_id/:c_id/coupon_preview',
        templateUrl: 'app/components/sharecoupon/sharecoupon.html',
        controller: 'SharecouponController',
        controllerAs: 'sharecoupon'
    });*/

     
      $urlRouterProvider.otherwise('/');
}

})();