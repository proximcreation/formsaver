app.controller('CoreCtrl', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

	$scope.user = {};
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
		})
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
			$scope.user._form.status[f] = false;
		}
	};
}]);
