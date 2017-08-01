


//var rt = angular.module('formApp', ['ui.router', 'formCtrlParts', 'directiveApp']);
"use strict"
var rt = angular.module("formApp", ["ui.router", "oc.lazyLoad", "cgBusy"])
.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
                function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
                    rt.controller = $controllerProvider.register;
                    rt.directive = $compileProvider.directive;
                    rt.filter = $filterProvider.register;
                    rt.factory = $provide.factory;
                    rt.service = $provide.service;
                    rt.constant = $provide.constant;
                }]);

rt.config(function($stateProvider,$urlRouterProvider){
$stateProvider.state('index',{
url:'/index',
templateUrl:'views/login.html',
controller: 'formCtrl',
resolve: {
    deps: ["$ocLazyLoad", function ($ocLazyLoad) {
        return $ocLazyLoad.load("js/controller-formctrl.js");
    }]
}
}).state('main',{
url:'/',
templateUrl:'views/index.html',
controller: 'upnavController',
resolve: {
    deps: ["$ocLazyLoad", function ($ocLazyLoad) {
        return $ocLazyLoad.load('ngService').then($ocLazyLoad.load('ngDirective')).then(function () {
            return $ocLazyLoad.load("js/controller-upnav.js");
        });
    }]
}
}).state('add',{
url:'/add',
templateUrl:'views/new.html',
controller: 'addNewBlogCtrl',
resolve: {
    deps: ["$ocLazyLoad", function ($ocLazyLoad) {
        return $ocLazyLoad.load("ngService").then(function () {
            return $ocLazyLoad.load("js/controller-newblog.js");
        });
    }]
}
});
$urlRouterProvider.otherwise('/');
})
// rt.run(['OAuth', function(OAuth) {
//     OAuth.configure({
//       baseUrl: 'https://api.weibo.com',
//       clientId: 'CLIENT_ID',
//       clientSecret: 'CLIENT_SECRET' // optional
//     });
//   }]);
