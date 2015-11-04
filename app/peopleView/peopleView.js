angular.module('rltoolApp.peopleView', ['ngRoute', 'ODataResources'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/people', {
        templateUrl: 'peopleView/peopleView.html',
        controller: 'peopleView.peopleViewController'
    });

}])

.controller('peopleView.peopleViewController', ['$scope', '$odataresource', function($scope, $odataresource) {



    var peopleResource = $odataresource('/odata/people/', {}, {}, {
        odatakey: '_id'
    });

    var updatePeopleList = function() {
        $scope.people = peopleResource.odata().query(
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

        var p = new peopleResource();

        p.firstName = "max";
        p.lastName = "mustermann";


        p.$save();
        
        updatePeopleList();
    };

}]);