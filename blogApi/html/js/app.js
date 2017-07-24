var rt= angular.module('formApp',['ngRoute','formCtrlParts','directiveApp']);
rt.config(function($routeProvider){
$routeProvider.when('/index',{
templateUrl:'views/login.html',
controller:'formCtrl'
}).when('/',{

templateUrl:'views/index.html',
controller:'upnavController'
}).when('/add',{
templateUrl:'views/new.html',
controller:'addNewBlogCtrl'
}).otherwise('/',{

})
})
// rt.run(['OAuth', function(OAuth) {
//     OAuth.configure({
//       baseUrl: 'https://api.weibo.com',
//       clientId: 'CLIENT_ID',
//       clientSecret: 'CLIENT_SECRET' // optional
//     });
//   }]);
var indexApp=angular.module('indexApp',[]);