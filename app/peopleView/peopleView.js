angular.module('rltoolApp.peopleView', ['ngRoute', 'ODataResources'])

.config(['$routeProvider', function($routeProvider)
{
    $routeProvider.when('/people',
        {
            templateUrl: 'peopleView/peopleView.html',
            controller: 'peopleView.peopleViewController'
        });
    
}])

.controller('peopleView.peopleViewController', ['$scope', '$odataresource', function($scope, $odataresource){
    
    var people = $odataresource('/odata/people/');
    $scope.people = people.odata().query(
        function(){
        },
        function(e){
            alert("error getting people data from /odata/people/");
        }
        
        );
    
}]);