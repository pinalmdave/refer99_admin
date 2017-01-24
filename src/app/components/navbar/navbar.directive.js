(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, Storage, User, $location, $state) {
      var vm = this;
      var user = Storage.getUser();
      (function init() {
        // console.log('state',$state);
        vm.onState = $state;


        if (user) {
          vm.user = user;
        } else {
          $location.path("/login");
        }
      })();
      vm.username = "admin";
      vm.logout = function() {
        Storage.clearAll();
        Storage.removeUser();
        $location.path("/login");
      }

    }
  }

})();