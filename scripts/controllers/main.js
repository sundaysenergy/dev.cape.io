'use strict';

angular.module('capeApp')
  .controller('MainCtrl', function ($scope, $rootScope, config, storage) {
    // container for filters setup
    $rootScope.search = {
      match: config.DEFAULT_SEARCH_MATCH,
      size: config.DEFAULT_SEARCH_SIZE,
      filters: []
    };

    storage.save($rootScope, 'savedSearches', config.DATASTORAGE_PREFIX, []);
  });
