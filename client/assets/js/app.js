(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'smart-table',


    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;


  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

  // START CUSTOM APP CODE

  // Start custom controller 

//   angular.module('application').controller('formatCtrl', ['$scope', function (scope) {

//     scope.removeRow = function removeRow(row) {
//         var index = scope.rowCollection.indexOf(row);
//         if (index !== -1) {
//             scope.rowCollection.splice(index, 1);
//         }
//     }
// }]);

  angular.module('application').controller('formatCtrl', formatCtrl);

  formatCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller'];

    function formatCtrl($scope, $stateParams, $state, $controller) {

      angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

      $scope.editMode = false;

      $scope.showstatus = 'incomplete';

      $scope.showtag = {};

      $scope.rows = JSON.parse(localStorage.getItem("saved_tasks"));
      if (typeof $scope.rows === 'undefined' || $scope.rows === null){
      $scope.rows = [];
      }

      $scope.CreatePerson = function(firstName, lastName, role, date, email){
      var row = {};

      row.firstName = firstName;
      row.lastName = lastName;
      row.role = role; 
      row.date = new Date();
      row.email = email;
      row.id = Date.now();

      $scope.rows.push(row);

      //localStorage.setItem("all_tags", JSON.stringify($scope.allTags));
      localStorage.setItem("saved_tasks", JSON.stringify($scope.rows));
      };

    }

  // End custom controller

  // END CUSTOM APP CODE


})();



 
