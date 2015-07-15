/**
 * Created by venkat on 7/10/2015.
 */
directives.directive('tracksGrid',function($rootScope){
    return {
        restrict: 'E',
        templateUrl: 'templates/grid.html',
        link: function(scope,element, attr){
            $(element).on('click', '.track', function(e){
                scope.play($(this).data('file'));
            });
        }
    }
});