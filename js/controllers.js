angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
	// "Pets" is a service returning mock data (services.js)
	$scope.pets = PetService.all();
})
	.controller('Controller', ['$scope',
		function($scope) {

			$scope.master = {};

			$scope.init = function() {
				$scope.limitArray = [20, 50, 100, 500, 1000, 5000, 10000, 100000, 10000000];
				$scope.currentLimitIndex = 0;
				$scope.currentLimit = $scope.limitArray[$scope.currentLimitIndex];
				$scope.maxCurrentLimit = $scope.currentLimit + $scope.currentLimit;
				$scope.user.customLevel = 0;
				$scope.user.val = [];
				$scope.user.val[0] = "111";
				$scope.user.val[1] = "222";
				$scope.user.opt = [];
				$scope.user.opt[0] = "111";
				$scope.user.opt[1] = "222";
				$scope.user.opt[2] = "333";
				$scope.user.opt[3] = "444";
				$scope.user.totalCorrect = 0;
				$scope.user.totalCount = 0


			};
			$scope.getRandomInt = function(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;

			};

			$scope.toggleMenu = function() {
				$scope.sideMenuController.toggleLeft();
			};

			$scope.updateLimitsByLimitIndex = function() {
				$scope.currentLimitIndex = $scope.currentLimitIndex + 1;
				$scope.updateLimits($scope.limitArray[$scope.currentLimitIndex], $scope.currentLimit + $scope.currentLimit);

			};
			$scope.updateLimits = function(currentLimit, maxCurrentLimit) {
				$scope.currentLimit = currentLimit;
				$scope.maxCurrentLimit = maxCurrentLimit;

			};


			$scope.resetQuestion = function() {
				var v1 = $scope.getRandomInt(0, $scope.currentLimit);
				var v2 = $scope.getRandomInt(0, $scope.currentLimit);
				$scope.user.val[0] = v1;
				$scope.user.val[1] = v2;

				var correctAnswerIndex = $scope.getRandomInt(0, 3);


				for (var i = 0; i <= 3; i++) {

					if (i == correctAnswerIndex) {

						var temp = +v1 + +v2;
						$scope.user.opt[i] = (temp);



					} else {


						var temp = $scope.getRandomInt(0, $scope.maxCurrentLimit);

						$scope.user.opt[i] = temp;
					}



				}

				if ($scope.user.totalCount == 180) {
					alert("game over");
				}
				if ($scope.user.totalCount % 20 == 0) {
					console.log("limit increase");
					if ($scope.user.customLevel == 0)
						$scope.updateLimitsByLimitIndex();

				}
			};

			$scope.checkAns = function(val) {

				var ans = +$scope.user.val[0] + +$scope.user.val[1];

				if (val == ans) {
					//console.log("correct");
					$scope.user.totalCorrect = +$scope.user.totalCorrect + 1;
				}
				$scope.user.totalCount = +$scope.user.totalCount + 1;

				$scope.resetQuestion();

			};
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