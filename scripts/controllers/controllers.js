'use strict';
var controllers = angular.module('controllers',['services','filters']);


controllers.directive('bxSlider', [function () {

    return {

        restrict: 'A',

        link: function (scope, element, attrs) {

            scope.$on('repeatFinished', function () {

                console.log("ngRepeat has finished");
                var prevSelector="<div class='custom-bxslider-direction-control custom-bxslider-direction-control-prev'><i class='fa fa-angle-left'></i></div>";
                var nextSelector="<div class='custom-bxslider-direction-control custom-bxslider-direction-control-next glyphicon glyphicon-menu-right'><i class='fa fa-angle-right'></i></div>";

                // element.bxSlider(scope.$eval('{' + attrs.bxSlider + '}'));
                element.bxSlider({
                  // scope.$eval('{' + attrs.bxSlider + '}')
                  mode: 'horizontal', 
                  nextText: nextSelector,
                  prevText: prevSelector,
                });

            });

        }

    }

}])

controllers.directive('notifyWhenRepeatFinished', ['$timeout', function ($timeout) {

    return {

        restrict: 'A',

        link: function (scope, element, attr) {

            if (scope.$last === true) {

                $timeout(function () {

                    scope.$emit('repeatFinished');

                });

            }

        }

    }

}]);



controllers.controller('StoreCtrl',['$scope','$http','CheckoutService','CartService',function($scope,$http, CheckoutService){
    $scope.books="";

    $http({method: 'GET', url:'api/carousel.json'}).success(function(data, status, headers, config){
      $scope.carousel=data.slides;
      // console.log($scope.carousel);
    }).error(function(data, status, headers, config){
      console.log("Error loading carousel");
    });
    $http({method: 'GET', url:'api/buytable.json'})
    .success(function(data, status, headers, config){
      $scope.books=data.buyTable;
      CheckoutService.Checkout.setItemsList($scope.books);
      $scope.CheckoutTotal=CheckoutService.Checkout.getTotal();

    }).error(function(data, status, headers, config){
      console.log("Error loading books");
    });
    $scope.removeElement=function(elm){
      var index=CheckoutService.Checkout.getItems().indexOf(elm);
      CheckoutService.Checkout.getItems().splice(index,1);
    }
}]);


controllers.controller('BuyCompleteCtrl',['$scope','$http','$routeParams','CheckoutService','CartService',function($scope,$http,$routeParams,CheckoutService,CartService){
  var bookid=$routeParams.bookid;
  if (bookid==="all") {
    var bookItems=CheckoutService.Checkout.getItems();
    for (var i = 0; i < bookItems.length; i++) {
      CartService.Cart.addItem(bookItems[i]);
    };
  } else{
    var bookItem=CheckoutService.Checkout.getItems()[bookid];
    CartService.Cart.addItem(bookItem);
  };
  $scope.CartItems=CartService.Cart.getItems();
  $scope.CartTotal=CartService.Cart.getTotal();

}]);