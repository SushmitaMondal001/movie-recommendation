var app = angular.module('MovieRecommendationApp', ['ui.router']);

/*
app.config(function ($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/movie');

  $stateProvider
    .state('movie', {
      url: '/movie',
      templateUrl: '../movie.html',
      controller: 'viewEditController'
    })
    .state('edit', {
      url: '/edit',
      templateUrl: '../edit.html',
      controller: 'viewEditController'

    });

});
*/

app.controller('viewEditController',function($http, $scope) {
  var vm = this;
  vm.isEditing = false;
  vm.change = {};

  $scope.submitForm = function (isValid) {
    if(isValid){
        console.log('function postData is invoked');
        console.log('started to post data');
        console.log('data is ' + vm.change.title);

        $http.post('/recommendation',vm.change).then(function (response) {
            vm.movie = Object.assign({}, vm.change);
            console.log('response status: ' + response.status);
            console.log('status text: ' + response.statusText);
        });

        vm.movie = Object.assign({}, vm.change);
        vm.isEditing = false;
    }
    else
      alert("Invalid input");

  };

  vm.edit = function () {
    vm.isEditing = true;
    vm.change = Object.assign({}, vm.movie);
    console.log('edit movie selected');
    //console.log('before saveeee: title is ' + $scope.title);
  };

  $http.get('/recommendation').then(function (res) {
     vm.movie = res.data;
    // $scope.title = object.title;
    // $scope.date = object.date;
    // $scope.duration = object.duration;
    // $scope.genre = object.genre;
    // $scope.synopsis = object.synopsis;

    console.log('calling http.get....');
  });

  vm.cancel = function () {
    vm.isEditing = false;

  };

	});
