angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
.controller('PetIndexCtrl', function($scope, PetService) {
	// "Pets" is a service returning mock data (services.js)
	$scope.pets = PetService.all();
})
	.controller('Controller', ['$scope', '$stateParams', '$http',

		function($scope, $stateParams, $http,$route) {

			$scope.mydata1="this is my data anyways";

			$http.get('http://spiraljobs.com/api/test').
        success(function(data, status, headers, config) {
        	console.log("got data");
            $scope.mydata="this is my data anyways22";

        });

			

			//console.log($route.current.params);
			$scope.pageTitle = $stateParams.petId;

			$scope.operation = $stateParams.petId;
			$scope.master = {};

			$scope.calculate = function(val1, val2, operation) {
				var x;
				//console.log(operation);
				switch (operation) {
					case "Sum":
						x = +val1 + +val2;
						break;
					case "Substract":
						x = +val1 - +val2;
						break;
					case "Multiply":
						x = +val1 * +val2;
						break;
					case "Division":
						x = +val1 / +val2;
						break;



				}
				//	console.log(x);
				return x;

			};

			$scope.calculateLimits = function(val1, val2, operation) {
				var x;
				//console.log(operation);
				switch (operation) {
					case "Sum":
						x = +val1 + +val2;
						break;
					case "Substract":
						x = +val1;
						break;
					case "Multiply":
						x = +val1 * +val2;
						break;
					case "Division":
						x = +val1;
						break;



				}
				//console.log(x);
				return x;

			};

			$scope.init = function() {
				$scope.limitArray = [20, 50, 100, 500, 1000, 5000, 10000, 100000, 10000000];
				$scope.currentLimitIndex = 0;
				$scope.currentLimit = $scope.limitArray[$scope.currentLimitIndex];
				$scope.maxCurrentLimit = $scope.calculateLimits($scope.currentLimit, $scope.currentLimit, $scope.operation);
				//$scope.maxCurrentLimit = $scope.currentLimit + $scope.currentLimit;
				$scope.user.customLevel = 0;
				$scope.user.val = [];
				$scope.user.val[0] = "2";
				$scope.user.val[1] = "1";
				$scope.user.opt = [];
				$scope.user.opt[0] = "2";
				$scope.user.opt[1] = "3";
				$scope.user.opt[2] = "1";
				$scope.user.opt[3] = "4";
				$scope.user.totalCorrect = 0;
				$scope.user.totalCount = 0;
				$scope.user.answerStatus = null;


			};

			var indexOf = function(needle) {
				if (typeof Array.prototype.indexOf === 'function') {
					indexOf = Array.prototype.indexOf;
				} else {
					indexOf = function(needle) {
						var i = -1,
							index = -1;

						for (i = 0; i < this.length; i++) {
							if (this[i] === needle) {
								index = i;
								break;
							}
						}

						return index;
					};
				}

				return indexOf.call(this, needle);
			};

			$scope.getRandomInt = function(min, max, arr, ans) {
				//debugger;
				var randomElement = Math.floor(Math.random() * (max - min + 1)) + min;
				if (arr)
					while (arr.indexOf(randomElement) != -1) {
						randomElement = Math.floor(Math.random() * (max - min + 1)) + min;
					}
					//debugger;
				if (ans)
					while (ans == randomElement) {
						randomElement = Math.floor(Math.random() * (max - min + 1)) + min;
					}
				return randomElement;
			};

			$scope.toggleMenu = function() {
				$scope.sideMenuController.toggleLeft();
			};

			$scope.updateLimitsByLimitIndex = function() {
				$scope.currentLimitIndex = $scope.currentLimitIndex + 1;
				$scope.updateLimits($scope.limitArray[$scope.currentLimitIndex], $scope.calculateLimits($scope.currentLimit, $scope.currentLimit, $scope.operation));

			};
			$scope.updateLimits = function(currentLimit, maxCurrentLimit) {
				$scope.currentLimit = currentLimit;
				$scope.maxCurrentLimit = maxCurrentLimit;

			};


			$scope.resetQuestion = function() {
				//	debugger;
				var v1 = $scope.getRandomInt(1, $scope.currentLimit);
				var v2 = $scope.getRandomInt(1, $scope.currentLimit);
				if ($scope.operation == "Substract" && (v2 > v1)) {
					$scope.user.val[0] = v2;
					$scope.user.val[1] = v1;
				} else {
					$scope.user.val[0] = v1;
					$scope.user.val[1] = v2;
				}

				$scope.tempArray = [];
				var correctAnswerIndex = $scope.getRandomInt(0, 3);
				var ans = $scope.calculate($scope.user.val[0], $scope.user.val[1], $scope.operation);

				for (var i = 0; i <= 3; i++) {

					if (i == correctAnswerIndex) {


						$scope.user.opt[i] = (ans);
						$scope.tempArray.push(ans);



					} else {


						var temp = $scope.getRandomInt(1, $scope.maxCurrentLimit, $scope.tempArray, ans);
						$scope.tempArray.push(temp);
						$scope.user.opt[i] = temp;
					}



				}

				if ($scope.user.totalCount == 180) {
					alert("Game over");
				}
				if ($scope.user.totalCount % 20 == 0) {
					if ($scope.user.customLevel == 0)
						$scope.updateLimitsByLimitIndex();

				}
			};

			$scope.checkAns = function(val) {

				var ans = $scope.calculate($scope.user.val[0], $scope.user.val[1], $scope.operation);

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