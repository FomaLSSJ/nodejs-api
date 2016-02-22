var indexApp = angular.module('indexApp', ['ui.router']);

indexApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('getArt', {
            url:'/get-article',
            templateUrl:'/getArt',
            controller:'getArtCtrl'
        })
        .state('getArts', {
            url:'/get-articles',
            templateUrl:'/getArts',
            controller:'getArtsCtrl'
        })
    
    $urlRouterProvider.otherwise("/get-article");
    //FIXME
    //$locationProvider.html5Mode({enabled:true, requireBase:false}); -- If support enable, # remove in url, but request status url not work
});

indexApp.controller('getArtCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.hello = 'hello world';
    
    $scope.getArticle = function(id) {
        $http({
            method:'GET',
            url:'/api/articles/' + id
        }).then(
            function(res) {
                console.log(res.data);
            }
        )
    }
}]);

indexApp.controller('getArtsCtrl', ['$scope', function($scope) {
    $scope.hello = 'kek';
}]);

indexApp.controller('menuCtrl', ['$scope', '$http', function($scope, $http) {
    //init
    $scope.user = {};

    //functions
    $scope.startCheck = function() {
        $http({
            method:'GET',
            url:'/users/login'
        }).then(
            function(res) {
                $scope.user = res.data;
            },
            function(res) {
                $scope.user = {"status":false};
            }
        );
    }
    $scope.postLogin = function() {
        $http({
            method:'POST',
            url:'/users/login',
            params:$scope.user
        }).then(
            function(res) {
                $scope.user = res.data;
            }
        );
    }
    $scope.getLogout = function() {
        $http({
            method:'GET',
            url:'/users/logout'
        }).then(
            function(res) {
                $scope.user = res.data;
            }
        );
    }
    
    //models
    
    //Auto execute
    $scope.startCheck();
}]);