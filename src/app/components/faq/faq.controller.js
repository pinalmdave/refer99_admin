(function() {
	'use strict';

	angular
	.module('angularSeedApp')
	.controller('FaqController', FaqController);

	/** @ngInject */
	function FaqController($scope,Couponlist,$location,$uibModal, $log, $document) {
		 $scope.oneAtATime = false;

    $scope.groups = [{
        groupTitle: "Test1"
    }, {
        groupTitle: "Test2"
    }, {
        groupTitle: "Test3"
    }];

    $scope.status = {
        isOpen: new Array($scope.groups.length)
    };

    for (var i = 0; i < $scope.status.isOpen.length; i++) {
        $scope.status.isOpen[i] = (i === 0);
    }

	}
})();


