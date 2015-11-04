angular.module('rltoolApp.personDetailView', ['ngRoute', 'rltoolApp.peopleService'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/people/:personId', {
       templateUrl: 'personDetailView/personDetailView.html',
       controller: 'personDetailView.personDetailViewController'
    });
    
}])

.controller('personDetailView.personDetailViewController', ['$scope', '$routeParams', 'People', function($scope, $routeParams, People){
    
    var updatePersonData = function(){
        var p = People.odata().filter("_id", $routeParams.personId).single();
        //var p = People.odata().get($routeParams.personId);
        
        $scope.person = p;
    };
    updatePersonData();
    
}]);