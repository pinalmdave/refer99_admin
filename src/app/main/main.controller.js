(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController($scope, User) {
        //GET /members/count
        
        var main=this; 
        User.userCount(function(err, res) {
			if (err) {
				if (err.data && err.data.error && err.data.error.message) {
					profile.errorMessage = err.data.error.message;
				} else {
					profile.errorMessage = "Something Went Wrong"
				}
			} else {
				main.count = res.count;

			}
		});



    }
})();