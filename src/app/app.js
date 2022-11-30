var myModule=angular.module('myModule',['ngRoute'])

myModule.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/home',{//navigate home
            templateUrl:'src/views/home.html'//url to load
        })
        .when('/directory',{
            templateUrl:'src/views/directory.html',
            controller:'myModuleController'
        })
        .otherwise({//redirect
            redirectTo:'/home'
        });
}])


myModule.controller('myModuleController',['$scope','$http',function($scope,$http){

    $scope.removeTask = function(task){
        var removeTask = $scope.tasks.indexOf(task);
        $scope.tasks.splice(removeTask,1)
    };
    $scope.addTask = function(){
        if($scope.newTask.done==''){
            return
        }
        $scope.tasks.push({
            flavour: $scope.newTask.flavour,
            dateWhenMade: new Date(),
            done: $scope.newTask.done,
        });
        $scope.newTask.flavour='';
        $scope.newTask.colour='';
        $scope.newTask.done='';
        console.log(angular.toJson($scope.tasks))
    };
    $http.get('src/data/tasks.json')
    .then(function(response){
        $scope.tasks=response.data
    })
}]);