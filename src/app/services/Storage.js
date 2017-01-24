(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .service('Storage', Storage);

  /** @ngInject */
  function Storage(localStorageService) {

    this.setUser = function(user) {
      return localStorageService.set('user', user);
    };
    this.getUser = function() {
      return localStorageService.get('user');
    };
    this.removeUser = function() {
      localStorageService.remove('user');
    };
    this.clearAll = function() {
      return localStorageService.clearAll();
    };
    this.setAppState = function(state) {
      return localStorageService.set('appState', state);
    };
    this.getAppState = function() {
      return localStorageService.get('appState');
    };
  }

})();