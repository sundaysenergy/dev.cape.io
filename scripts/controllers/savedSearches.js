'use strict';

angular.module('capeApp')
  .controller('SavedSearchesCtrl', function ($scope, $rootScope) {
    $scope.removeSearch = function (index, event) {
      if (event) event.preventDefault();
      $scope.savedSearches.splice(index, 1);
    };

    $scope.applySearch = function (index, event) {
      if (event) event.preventDefault();

      $rootScope.search = angular.copy($scope.savedSearches[index]);
      $scope.$emit('makeQuery');
    };
  });
