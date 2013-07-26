'use strict';

angular.module('capeApp')
  .controller('ImagesCtrl', function ($scope, elasticHelper) {
    /**
     http://www.elasticsearch.org/guide/reference/api/update/



     // (-) button click
     $images.on('click', '.btn-minus', function (e) {

       var $parent = $(this).parent(), _id = $parent.data('id');
       $.post('http://search.cape.io/instagram/photo/' + _id + '/_update', {
         "script": "ctx._source.ignore=1"
       });

     });



     _source.cape.removed = {"query" = [query-name], "user" = [user_id], "removed" = [timestamp]}
     */
    $scope.removeFromSearch = function (image) {
      elasticHelper.removeInstagramPhoto(image.id)
        .success(function () {
          $scope.images.splice($scope.images.indexOf(image), 1);
        });
    };
  });
