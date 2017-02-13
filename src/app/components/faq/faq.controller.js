(function() {
    'use strict';

    angular
        .module('angularSeedApp')
        .controller('FaqController', FaqController);

    /** @ngInject */
    function FaqController($scope, Couponlist, $location, User, $log, $document) {
        var faq = this;
        (function init() {
            User.getFaqs(function(err, res) {
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        faq.errorMessage = err.data.error.message;
                    } else {
                        faq.errorMessage = "Something Went Wrong"
                    }
                } else {
                    faq.faqs = res;

                }
            });
        })();
        $scope.updateFaqStatus = function(id, status) {
            var data = {
                status: status
            };
            User.updateFaq(id, data, function(err, res) {
                if (err) {
                    if (err.data && err.data.error && err.data.error.message) {
                        faq.errorMessage = err.data.error.message;
                    } else {
                        faq.errorMessage = "Something Went Wrong"
                    }
                } else {
                    var intIndex = faq.faqs.map(function(el) {
                        return el.id;
                    }).indexOf(id);
                    faq.faqs[intIndex].status = status;
                }
            });
        }
    }
})();
