'use strict';

/**
 * http://stackoverflow.com/questions/14859266/input-autofocus-attribute/14859639#14859639
 */
angular.module('capeApp')
  .directive('capeFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.capeFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);

            element.bind('blur', function () {
                if ( angular.isDefined( attrs.capeFocusLost ) ) {
                    scope.$apply( attrs.capeFocusLost );

                }
            });
        }
    };
});