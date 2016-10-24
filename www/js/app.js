// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
    
$ionicConfigProvider.tabs.position("bottom");
$ionicConfigProvider.navBar.alignTitle("center");
        
$stateProvider 

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tab.html'
  })
// Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
        views: {
      'tab-home': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
        }
       }
    })

    .state('tab.AgendaSeti',{
        url: '/AgendaSeti',
            views: {
                'tab-AgendaSeti': {
                    templateUrl: 'templates/AgendaSeti.html',
                    controller: 'AgendaSetiCtrl'
                }
            }
        })
        
        .state('tab.principios',{
        url: '/principios',
            views: {
                'tab-principios': {
                    templateUrl: 'templates/principios.html',
                    controller: 'PrincipiosCtrl'
                }
            }
        })
        
        .state('tab.mapa',{
        url: '/mapa',
            views: {
                'tab-mapa': {
                    templateUrl: 'templates/mapa.html',
                    controller: 'MapaCtrl'
                }
            }
        })       
        .state('tab.info', {
        url: '/info',
        views: {
          'info': {
            templateUrl: 'templates/info.html',
          }
        }
      })
        
        
$urlRouterProvider.otherwise('/tab/home');      
        
})

.controller('HomeCtrl', function($scope) {
    console.log("Entrando en la home");
})



.controller('AgendaSetiCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json')
  .success(function(data){
    $scope.detalles = data.detalles;
    $scope.data = {showReorder: false};
  });

  $scope.toggleDescripcion = function(item){
    item.resumido = !item.resumido;
  }

  $scope.moveItem = function(item, fromIndex, toIndex){
      $scope.detalles.splice(fromIndex, 1);
      $scope.detalles.splice(toIndex, 0, item);
    
    }
}])

.controller('PrincipiosCtrl', function($scope) {
    console.log("8 puntos eticos")
})

.controller('UserCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
  $http.get('js/data.json')
  .success(function(data){
    $scope.data = data.usuarios[$state.params.id];
  });
}])


.controller('MapaCtrl', function($scope) {
    $scope.getPosicion = function(){
    var form = this;
    navigator.geolocation.getCurrentPosition(function(position){
      form.posicion = position.coords.latitude + " -- " + position.coords.longitude
    });
  }

  $scope.sendForm = function(){
    alert(this.nombre + " -- " + this.apellidos);
  }
})































