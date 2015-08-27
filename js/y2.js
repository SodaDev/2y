var App = angular.module('y2Studio', ['ui.router']);

App.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: "/",
            template: "<y2-logo></y2-logo><y2-footer></y2-footer>"
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

App.controller('WorkController', ['$scope', function($scope){
    var vm = this;
    vm.designs = [];

    var addDesign = function(name){
        var basePath = 'http://2ystudio.eu/';
        var smallUrl = 'img/750/' + name + '.png';
        var bigUrl = 'img/1200/' + name + '.png';
        vm.designs.push({
            alt: name,
            small: smallUrl,
            big: bigUrl,
            url: basePath + 'work/',
            fileUrl: basePath + bigUrl
        })
    };

    vm.pickDesign = function(design){
        if(vm.picked == design) {
            design = null;
        }
        vm.picked = design;
    };

    addDesign('brod');
    addDesign('biscuit');
    addDesign('architecture');
    addDesign('jorn');
    addDesign('carpenter');
    addDesign('biotanical');
    addDesign('dorteRask');
    addDesign('czarnaKawka');
}]);

App.directive('y2Logo', function(){
    return {
        restrict: 'E',
        template: '<div class="row" style="margin-top: 50px">' +
                  ' <img src="img/logo.png" class="img-responsive center-block img-logo" alt="2Y Logo">' +
                  '     <div class="logo-text text-center"> <p>2Y GRAPHIC DESIGN STUDIO</p> </div>' +
                  '</div>'
    }
});

App.directive('y2Footer', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/footer.html'
    }
});