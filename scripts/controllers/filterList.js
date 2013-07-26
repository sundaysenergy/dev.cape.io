'use strict';

angular.module('capeApp')
  .controller('FilterListCtrl', function ($scope, $dialog, config, ejsResource, elasticHelper) {
    // list of kinds values
    $scope.availableKinds = config.availableKinds;

    // list of comparisons values
    $scope.availableComparisons = config.availableComparisons;

    // when user adds new filter this object is got pushed into filters
    var defaultFilter = {
      kind: $scope.availableKinds[0].key,
      comparison: $scope.availableComparisons[0].key,
      value: ''
    };

    // adds new filter to the end of collection
    $scope.addFilter = function (event) {
      if (event) event.preventDefault();
      $scope.search.filters.push(angular.copy(defaultFilter));
    };

    // removes filter with given index
    $scope.removeFilter = function (index, event) {
      if (event) event.preventDefault();
      $scope.search.filters.splice(index, 1);
    };

    // add initial filter
    $scope.addFilter();

    // results handling
    $scope.images = [];

    // elastic things
    var ejs = ejsResource(config.ELASTIC.ROOT);

    var client = ejs.Request()
      .indices('instagram')
      .types('photo');

    // queries api for data
    $scope.makeQuery = function () {
      var query = ejs.BoolQuery(), matcher;

      // build filters bits
      $scope.search.filters.forEach(function (filter) {
        matcher = elasticHelper.getMatcher(filter);
        query = query[matcher.action](ejs[matcher.queryHandler](filter.kind, matcher.term));
      });

      // save query to show for debugging
      $scope.queryDebug = query.toString();

      $scope.results = client
        .size($scope.search.size)
        .query(query)
        .doSearch(
         // search success
        function (result) { // success
          if (!(result && result.hits && result.hits.hits)) {
            $scope.images = [];
            return;
          }

          var images = [];
          angular.forEach(result.hits.hits, function (item, index) {
            var _img = item['_source'];

            images.push({
              link: _img.link,
              thumb: _img.images.thumbnail.url,
              id: item['_id']
            });
          });

          $scope.images = images;
        },

        // search error
        function () {
          $scope.images = [];
        });
    };

    $scope.$on('makeQuery', function() {
      $scope.makeQuery();
    });

    /**
     * opens dialog to enter search name
     */
    $scope.saveSearch = function () {
      // dialog options
      var d = $dialog.dialog({
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        dialogFade: true,
        templateUrl: 'views/saveSearchDialog.html',
        controller: 'SaveSearchDialogCtrl'
      });

      d.open().then($scope.saveSearchCallback);
    };

    /**
     * handles SaveSearchDialog close/save actions
     * @param result {string|undefined} name of search
     * if result is falsy, then user clicked "close"
     */
    $scope.saveSearchCallback = function (result) {
      if (result) {
        var item = angular.copy($scope.search);
        item.name = result;
        $scope.savedSearches.push(item);
      }
    };

  });