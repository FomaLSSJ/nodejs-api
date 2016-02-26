var indexApp = angular.module('indexApp', ['ui.router']);

indexApp.config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
        .state('home', {
            url:'/',
            views: {
                'control': {
                    templateUrl:'/home',
                    controller:'homeCtrl'
                },
                'output': {
                    templateUrl:'/status',
                    controller:'statusCtrl'
                }
            }
        })
        .state('home.article', {
            url:'/article',
            views: {
                'control@': {
                    templateUrl:'/getArt'
                }
            }
        })
        .state('home.article.all', {
            url:'/all',
            views: {
                'control@': {
                    templateUrl:'/getArts',
                    controller:'getArtsCtrl'
                },
                'output@': {
                    templateUrl:'/showArts'
                }
            }
        })
        .state('home.article.detail', {
            url:'/:id',
            views: {
                'output@': {
                    templateUrl:'/showArt',
                    controller:'getArtCtrl'
                }
            }
        })
        .state('home.article.all.detail', {
            url:'/:id',
            views: {
                'output@': {
                    templateUrl:'/showArt',
                    controller:'getArtCtrl'
                }
            }
        })
    
    //FIXME
    //$locationProvider.html5Mode({enabled:true, requireBase:false}); -- If support enable, # remove in url, but request status url not work
});

indexApp.service('userService', function() {
    var user = {};
    
    this.set = function(value) {
        this.user = value;
    }
    this.get = function() {
        return this.user;
    }
});

indexApp.service('statusService', function() {
   var status = {};
   
   this.set = function(value) {
       this.status = value;
   }
   this.get = function() {
       return this.status;
   }
});

indexApp.controller('homeCtrl', ['$scope', 'userService', function($scope, userService) {
    $scope.user = {};
    
    $scope.$watch(function() {
        return userService.get();
    }, function(newVal, oldVal) {
        $scope.user = newVal;
    });
}]);

indexApp.controller('statusCtrl', ['$scope', 'statusService', function($scope, statusService) {
    $scope.response = {};
    
    $scope.$watch(function() {
        return statusService.get();
    }, function(newVal, oldVal) {
        $scope.response = newVal;
    });
}]);

indexApp.controller('getArtCtrl', ['$scope', '$http', '$stateParams', function($scope, $http, $stateParams) {
    $http({
        method:'GET',
        url:'/api/articles/' + $stateParams.id
    }).then(
        function(res) {
            $scope.request = res.data;
            $scope.article = res.data.article;
        }
    )
}]);

indexApp.controller('getArtsCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method:'GET',
        url:'/api/articles/'
    }).then(
        function(res) {
            $scope.request = res.data;
            console.log(res);
        }
    )
}]);

indexApp.controller('menuCtrl', ['$scope', '$http', 'userService', 'statusService', function($scope, $http, userService, statusService) {
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
                userService.set(res.data);
                statusService.set(res.data);
            },
            function(res) {
                $scope.user = {status: false, message: 'Not logging'};
                userService.set(res.data);
                statusService.set(res.data);
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
                userService.set(res.data);
                statusService.set(res.data);
            }
        );
    }
    $scope.postRegister = function() {
        $http({
            method:'POST',
            url:'/users/register',
            params:$scope.user
        }).then(function(res) {
            statusService.set(res.data);
        })
    }
    $scope.getLogout = function() {
        $http({
            method:'GET',
            url:'/users/logout'
        }).then(
            function(res) {
                $scope.user = res.data;
                userService.set(res.data);
                statusService.set(res.data);
            }
        );
    }
    
    //models
    
    //Auto execute
    $scope.startCheck();
}]);