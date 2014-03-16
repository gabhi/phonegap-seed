angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
	// "Pets" is a service returning mock data (services.js)
	$scope.pets = PetService.all();
})
	.controller('Controller', ['$scope',
		function($scope) {
			$scope.limitArray = [20, 50, 100, 500, 1000, 5000, 10000, 100000, 10000000];
			$scope.currentLimitIndex = 0;
			$scope.currentLimit = $scope.limitArray[$scope.currentLimitIndex];
			$scope.maxCurrentLimit = $scope.currentLimit + $scope.currentLimit;

			$scope.master = {};

			$scope.update = function(user) {
				$scope.master = angular.copy(user);
			};

			$scope.reset = function() {
				$scope.user = angular.copy($scope.master);
			};

			$scope.reset();

		}
	])
	.controller('PetDetailCtrl', function($scope, $stateParams, PetService) {
		// "Pets" is a service returning mock data (services.js)
		$scope.pet = PetService.get($stateParams.petId);
	});