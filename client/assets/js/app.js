(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',
    'smart-table',
    'firebase',


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


  angular.module('application').controller('formatCtrl', formatCtrl);

  formatCtrl.$inject = ['$scope', '$stateParams', '$state', '$controller', '$firebaseArray'];

    function formatCtrl($scope, $stateParams, $state, $controller, $firebaseArray) {

      angular.extend(this, $controller('DefaultController', {$scope: $scope, $stateParams: $stateParams, $state: $state}));

      $scope.editMode = false;

      // Firebase
      var ref = new Firebase("https://table-data.firebaseio.com/people");

      $scope.people = $firebaseArray(ref);

        $scope.people.$add({
          person_by_index_number: 
          JSON.parse(localStorage.getItem("saved_rows"))
       });

      // End of Firebase


      $scope.rows = JSON.parse(localStorage.getItem("saved_rows"));
      if (typeof $scope.rows === 'undefined' || $scope.rows === null){
      $scope.rows = [];
      }

      //remove to the real data holder
      $scope.removeItem = function removeItem(row) {
        var index = $scope.rows.indexOf(row);
        if (index !== -1) {
            $scope.rows.splice(index, 1);
        }

        localStorage.removeItem("saved_rows");
        localStorage.setItem("saved_rows", JSON.stringify($scope.rows));

        $scope.rows = JSON.parse(localStorage.getItem("saved_rows"));
      }
      // /end of removing data

      // $scope.itemsByPage=6;


      $scope.CreatePerson = function(firstName, lastName, role, date, email){
      var row = {};

      row.firstName = firstName;
      row.lastName = lastName;
      row.role = role; 
      row.date = new Date();
      row.email = email;
      row.id = Date.now();

      $scope.rows.push(row);


      localStorage.setItem("saved_rows", JSON.stringify($scope.rows));
      };


      $scope.EditPerson = function(){

       localStorage.setItem("saved_rows", JSON.stringify($scope.rows));

      };

    }

  // End custom controller

  // st-ratio
  angular.module('application').directive('stRatio',function(){
        return {
          link:function(scope, element, attr){
            var ratio=+(attr.stRatio);
            
            element.css('width',ratio+'%');
            
          }
        };
    });
  // /st-ratio

  // st-export
  angular.module('application').directive('stExport',function(){
  return {
    require:'^stTable',
    link:function(scope, element, attr,ctrl){
      element.bind('click',function(){
        alert(ctrl.getFilteredCollection().length);

      })
    }
  }

  
  });
  // /st-export

  // END CUSTOM APP CODE


})();



 
