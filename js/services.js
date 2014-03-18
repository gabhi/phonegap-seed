angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('PetService', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var pets = [{
    id: 0,
    title: 'Sum',
    description: 'Addition of 2 numbers'
  }, {
    id: 1,
    title: 'Substract',
    description: 'Substract 2 numbers'
  }, {
    id: 2,
    title: 'Multiply',
    description: 'Multiply 2 numbers'
  }, {
    id: 3,
    title: 'Division',
    description: 'Divide 2 numbers'
  }];

  return {
    all: function() {
      return pets;
    },
    get: function(petId) {
      // Simple index lookup
      return pets[petId];
    }
  }
});