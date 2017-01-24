(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .config(config);

    /** @ngInject */
    function config($logProvider, toastr,RestangularProvider,localStorageServiceProvider,StorageProvider,api) {
        // Enable log
        $logProvider.debugEnabled(true);

        // Set options third-party lib
        toastr.options.timeOut = 3000;
        toastr.options.positionClass = 'toast-top-right';
        toastr.options.preventDuplicates = true;
        toastr.options.progressBar = true;
        RestangularProvider.setBaseUrl(api);
        var user = StorageProvider.$get().getUser();
        RestangularProvider.setDefaultRequestParams({
          access_token: user ? user.id : ""
      });
        localStorageServiceProvider
        .setPrefix('viralDi')
        .setStorageType('localStorage');
    }

})();