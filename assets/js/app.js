var app = angular.module('app', ['ngRoute', 'hc.marked']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
	.otherwise({ redirectTo: '/' });

	$locationProvider.hashPrefix('!');

}]);
