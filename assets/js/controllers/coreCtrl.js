app
.controller('CoreCtrl', ['$scope', '$window', '$http', '$location', '$timeout', function ($scope, $window, $http, $location, $timeout) {

	if($window.me){
		$scope.user = $window.me;
		$http.get('/api/form/'+$scope.user._form).success(function(form){
			$scope.user._form = form;
		});
	} else {
		$scope.user = {};
	}
	$scope.formData = {};

	$scope.subscribe = function(){
		$http.post('/api/auth/emailExists', $scope.formData)
		.success(function(data){
			if(data.exists){
				console.log('email already exists !');
			} else {
				$http.post('/api/user', $scope.formData)
				.success(function(user){
					console.log('user created !');
					$scope.user = user;
					$http.post('/api/form', {})
					.success(function(form){
						console.log('fresh form created !');
						$http.put('/api/user/'+user.id, {_form : form.id })
						.success(function(formRes){
							console.log('fresh form associated to user !');
							$scope.user._form = form;
						})
						.error(function(){
							console.log('error while associating fresh form... :(');
						});
					})
					.error(function(){
						console.log('error while creating fresh form... :(');
					});
				})
				.error(function(data){
					console.log('error while creating user... :(');
				});
			}
		}).error(function(data){
			console.log('error while checking email existence... :(');
		});
	};

	$scope.login = function(){
		$http.post('/api/auth/login', $scope.formData)
		.success(function(user){
			console.log('logged in !!!');
			$scope.user = user;
			$http.get('/api/form/'+user._form)
			.success(function(form){
				form.status = {};
				$scope.user._form = form;
			});
		})
		.error(function(){
			console.log('login failed → shit happens !');
		});
	};

	$scope.logout = function(){
		$http.post('/api/auth/logout', $scope.formData)
		.success(function(user){
			console.log('logged out, Bye !!!');
			$window.location.href = '/';
		})
		.error(function(){
			console.log('logout failed → shit happens !');
		});
	};

	$scope.formMgt = {
		save : function(f){
			if(f!==undefined){
				var data = {};
				data[f] = $scope.user._form[f];
				$http.put('/api/form/'+$scope.user._form.id, data)
				.success(function(form){
					console.log(form);
					$scope.user._form.status[f] = true;
				});
			}
		},
		enterField : function(f){
			if($scope.user._form.status === undefined){
				$scope.user._form.status = {};
			}
			$scope.user._form.status[f] = false;
		}
	};
}])
.controller('AdminCtrl', ['$scope', '$window', '$http', '$location', '$timeout', function ($scope, $window, $http, $location, $timeout) {

	$http.get('/api/user?populate=_form').success(function(data){
		$scope.users = data;
	});
}]);
