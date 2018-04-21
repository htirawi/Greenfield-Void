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
