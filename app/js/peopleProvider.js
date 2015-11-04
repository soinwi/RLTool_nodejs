
angular.module('rltoolApp.peopleService', ['ODataResources'])

.config([function(){
    
}])

.factory('People', ['$odataresource', function($odataresource){
    return $odataresource('/odata/people/:personId', {personId:'@_id'}, {}, {
        odatakey: '_id'
    });
}]);