
var rltoolApp = angular.module('rltoolApp', [
    'ngRoute',
    
    'rltoolApp.peopleView'
    ]);
    
    rltoolApp.config(['$routeProvider',
        function($routeProvider){
            $routeProvider.otherwise({redirectTo: '/people'});
            
        }]);