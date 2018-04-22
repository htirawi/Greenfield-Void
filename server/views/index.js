<<<<<<< HEAD
var app = angular.module('app', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/signin", {
        templateUrl : "/templates/sign_in.html"
    })
    .when("/signup", {
        templateUrl : "/templates/sign_up.html"
    });
    
});
=======
angular.module('app', []);
angular.module('app1', ['app'])
>>>>>>> e5d9b55d92adb27e0131224b265315b9f54f19d9
