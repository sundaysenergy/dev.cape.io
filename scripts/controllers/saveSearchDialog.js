// the dialog is injected in the specified controller
angular.module('capeApp')
  .controller('SaveSearchDialogCtrl', function ($scope, dialog) {
    $scope.close = function (result) {
      dialog.close(result);
    };

    $scope.inputFocus = true;
  });