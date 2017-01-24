(function() {
    'use strict';

    angular
    .module('angularSeedApp')
    .directive('acmeFooter', acmeFooter);

    /** @ngInject */
    function acmeFooter() 
    {
      var directive = {
        restrict: 'E',
        templateUrl: 'app/components/footer/footer.html',
        scope: {
            creationDate: '='
        },
        controller: FooterController,
        controllerAs: 'fm',
        bindToController: true
    };

    return directive;

    /** @ngInject */
    function FooterController($scope,Storage, User,$location,$state) 
    {
     
}

}
}

)();