'use strict';

angular.module('capeApp')
  .factory('elasticHelper', function ($http, config) {
    return {
      /**
       * receives filter object to include into elastic query
       * @param filter
       * @returns {*}
       */
      getMatcher: function (filter) {
        var matcher;

        switch (filter.comparison) {
          case 'is':
            matcher = { action: 'must', term: filter.value, queryHandler: 'TermQuery' };
            break;
          case 'is_not':
            matcher = { action: 'mustNot', term: filter.value, queryHandler: 'TermQuery' };
            break;
          case 'can_be':
            matcher = { action: 'should', term: filter.value, queryHandler: 'TermQuery' };
            break;
          case 'must_contain':
            matcher = { action: 'must', term: '*' + filter.value + '*', queryHandler: 'WildcardQuery' };
            break;
          case 'must_not_contain':
            matcher = { action: 'mustNot', term: '*' + filter.value + '*', queryHandler: 'WildcardQuery' };
            break;
          case 'may_contain':
            matcher = { action: 'should', term: '*' + filter.value + '*', queryHandler: 'WildcardQuery' };
            break;
          case 'starts_with':
            matcher = { action: 'must', term: filter.value + '*', queryHandler: 'WildcardQuery' };
            break;
          case 'ends_with':
            matcher = { action: 'must', term: '*' + filter.value, queryHandler: 'WildcardQuery' };
            break;
          default:
            throw('Not handled criteria: ' + filter.comparison)
            break;
        }

        return matcher;
      },

      /**
       * @XXX what about ngResource?
       * @param id
       * @returns {*|HttpPromise}
       */
      removeInstagramPhoto: function (id) {
        return $http.post(config.ELASTIC.ROOT + 'instagram/photo/' + id + '/_update', {
          "script": "ctx._source.ignore=1"
        });
      }
    };
  });