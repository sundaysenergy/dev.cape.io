'use strict';

angular.module('capeApp')
  .factory('storage', function () {
    return {
      /*
       * Store/load the value of element within scope
       *
       * Value is stored using localStorage
       *
       * @param {Object} scope Scope
       * @param {string} key Key
       * @param {string} prefix Custom prefix
       */
      save: function (scope, key, prefix, defaultValue) {

        var name = (prefix ? prefix + '_' : '') + key;

        // History
        scope.$$$persistHistory = scope.$$$persistHistory || {};

        // Restore
        if (!scope.$$$persistHistory[key]) {

          var value = null;

          try {
            value = angular.fromJson(localStorage.getItem(name));
          } catch (e) {
          }

          if (value) {
            scope[key] = value;
          } else {
            scope[key] = defaultValue;
          }

          scope.$$$persistHistory[key] = true;
        }

        scope.$watch(key, function (newValue) {
          localStorage.setItem(name, angular.toJson(newValue));
        }, true);
      }
    };
  });