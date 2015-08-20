var App = angular.module('y2Studio', ['ui.router']);

App.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
        .state('main', {
            url: "/",
            templateUrl: "index.html"
        })
        .state('work', {
            url: "/work",
            templateUrl: "views/work.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: "views/about.html"
        })
        .state('contact', {
            url: "/contact",
            templateUrl: "views/contact.html"
        });
});