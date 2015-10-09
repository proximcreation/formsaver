var app = angular.module('app', ['ngRoute', 'hc.marked']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'views/home.html',
		controller: 'HomeCtrl'
	})
	.when('/admin', {
		 templateUrl: 'views/admin.html',
		 controller: 'AdminCtrl'
	})
	.otherwise({ redirectTo: '/' });

	$locationProvider.hashPrefix('!');

}]);
