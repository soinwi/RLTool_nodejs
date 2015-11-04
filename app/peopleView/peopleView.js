angular.module('rltoolApp.peopleView', ['ngRoute', 'rltoolApp.peopleService'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/people', {
        templateUrl: 'peopleView/peopleView.html',
        controller: 'peopleView.peopleViewController'
    });

}])

.controller('peopleView.peopleViewController', ['$scope', 'People', function($scope, People) {

    var updatePeopleList = function() {
        $scope.people = People.odata().query(
            function() {},
            function(e) {
                alert("error getting people data from /odata/people/");
            }

        );
    };
    updatePeopleList();

    $scope.detailView = function(person) {
        alert("person clicked: " + person.firstName);
    };

    $scope.deletePerson = function(person) {
        person.$delete();
        updatePeopleList();
    };

    $scope.addNew = function() {

        var p = new People();

        p.firstName = "max";
        p.lastName = "mustermann";


        p.$save();
        
        updatePeopleList();
    };

}]);