angular.module('rltoolApp.personDetailView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
    $routeProvider.when('/people/:personId', {
       templateUrl: 'personDetailView/personDetailView.html',
       controller: 'personDetailView.personDetailViewController'
    });
    
}])

.controller('personDetailView.personDetailViewController', ['$scope', function($scope){
    var peopleResource = $odataresource('/odata/people/', {}, {}, {
        odatakey: '_id'
    });
    
    var updatePersonData = function(){
        
    };
    updatePersonData();
    
}]);