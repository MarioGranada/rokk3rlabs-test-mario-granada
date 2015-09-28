/**
 * AngularJS Rokk3r Labs Test
 * @author 
 */

/**
 * Main AngularJS Web Application
 */
'use strict';

var app = angular.module('testAngularWebApp',['ngRoute','controllers']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function($routeProvider){
  $routeProvider.
    when("/store",{
      templateUrl:'views/home.html',
      controller: 'StoreCtrl'
    }).
    when("/buy_complete",{
      templateUrl:'views/buy_complete.html',
      controller: 'BuyCompleteCtrl'
    }).
    otherwise({
      redirectTo: "/store"
    });
}]);