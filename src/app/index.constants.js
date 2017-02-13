/* global malarkey:false, toastr:false, moment:false */
(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .constant('malarkey', malarkey)
        .constant('toastr', toastr)
        .constant('moment', moment)
        .constant('api', 'http://refer99.com:3001/api')//prod
        .constant('business_logo', 'http://refer99.com:3001/storage/business_logo/');//prod
        // .constant('api', 'http://35.162.137.242:3001/api')//test
        // .constant('business_logo', 'http://35.162.137.242:3001/storage/business_logo/');//test

})();