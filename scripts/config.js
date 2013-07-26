'use strict';

angular.module('capeApp')
  .constant('config', {

    DEFAULT_SEARCH_SIZE: 10,
    DEFAULT_SEARCH_MATCH: 'all',
    FILTERS_COLLECTION_NAME: 'Search ',
    DATASTORAGE_PREFIX: 'CAPE_',

    ELASTIC: {
      ROOT: 'http://search.cape.io/'
    },

    availableKinds: [
      {
        key: 'tags',
        name: 'Tag'
      },
      {
        key: 'user.username',
        name: 'Author username'
      },
      {
        key: 'likes.data.username',
        name: 'Liked by username'
      },
      {
        key: 'location',
        name: 'Location'
      },
      {
        key: 'geography',
        name: 'Geography'
      }
    ],

    availableComparisons: [
      {
        key: 'is',
        name: 'Is'
      },
      {
        key: 'is_not',
        name: 'Is not'
      },
      {
        key: 'can_be',
        name: 'Can be'
      },
      {
        key: 'must_contain',
        name: 'Must contain'
      },
      {
        key: 'must_not_contain',
        name: 'Must not contain'
      },
      {
        key: 'may_contain',
        name: 'May contain'
      },
      {
        key: 'starts_with',
        name: 'Starts with'
      },
      {
        key: 'ends_with',
        name: 'Ends with'
      }
    ]
  });