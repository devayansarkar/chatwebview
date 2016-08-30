var app = angular.module('klmapp',['ngResource', 'ngRoute','ui.bootstrap'])

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/admin-view.html',
            controller: 'AdminViewCtrl'
        })
        .when('/add-udata', {
            templateUrl: 'partials/udata-form.html',
            controller: 'AddUsrDataCtrl'
        })
        .when('/udata/:id', {
            templateUrl: 'partials/edit-udata.html',
            controller: 'EditUsrDataCtrl'
        })
        .when('/delete-udata/:id', {
            templateUrl: 'partials/del-udata.html',
            controller: 'DeleteUsrDataCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.config(['$resourceProvider', function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false
}]);


app.controller('AdminViewCtrl', ['$scope', '$resource', function($scope, $resource){
	var Usrdata = $resource('/api/udata')
	Usrdata.query(function(udata){
		$scope.udata = udata
	})
}])

app.controller('AddUsrDataCtrl', ['$scope', '$resource', '$location', function($scope, $resource, $location){
    $scope.titledd = ["Mr.","Mrs."]
    $scope.adults = 1
    $scope.child = 0
    $scope.babies = 0
    $scope.cid = Math.floor(100000000000000000 + Math.random() * 900000000000000000)
    $scope.oneAtATime = true
    $scope.groups = [
        {
          title: 'Dynamic Group Header - 1',
          content: 'Dynamic Group Body - 1'
        },
        {
          title: 'Dynamic Group Header - 2',
          content: 'Dynamic Group Body - 2'
        }
      ];

      $scope.items = ['Item 1', 'Item 2', 'Item 3']

      $scope.addItem = function() {
        var newItemNo = $scope.items.length + 1
        $scope.items.push('Item ' + newItemNo)
      };

      $scope.status = {
        isCustomHeaderOpen: false,
        isFirstOpen: true,
        isFirstDisabled: false
      }
    $scope.save = function(){
        var Usrdata = $resource('/api/udata')
        console.log("1====>" + $scope.usrdata)
        $scope.usrdata.convind = $scope.cid
        console.log("2====>" + $scope.usrdata)
        Usrdata.save($scope.usrdata, function(){
            $location.path('/')
        })
    }
}])

app.controller('EditUsrDataCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        $scope.titledd = ["Mr.","Mrs."]
        $scope.oneAtATime = true
        $scope.groups = [
            {
              title: 'Dynamic Group Header - 1',
              content: 'Dynamic Group Body - 1'
            },
            {
              title: 'Dynamic Group Header - 2',
              content: 'Dynamic Group Body - 2'
            }
          ];

          $scope.items = ['Item 1', 'Item 2', 'Item 3']

          $scope.addItem = function() {
            var newItemNo = $scope.items.length + 1
            $scope.items.push('Item ' + newItemNo)
          };

          $scope.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
          }

        var Usrdata = $resource('/api/udata/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        })

        Usrdata.get({ id: $routeParams.id }, function(usrdata){
            $scope.usrdata = usrdata
        })

        $scope.save = function(){
            Usrdata.update($scope.usrdata, function(){
                $location.path('/')
            })
        }
}])

app.controller('DeleteUsrDataCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){   
        var Usrdata = $resource('/api/udata/:id')

        Usrdata.get({ id: $routeParams.id }, function(usrdata){
            $scope.usrdata = usrdata
        })

        $scope.delete = function(){
            Usrdata.delete({ id: $routeParams.id }, function(usrdata){
                $location.path('/');
            });
        }
}])