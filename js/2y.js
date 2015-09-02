var y2App = angular.module('y2Studio', ['ui.router']);

y2App.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    $rootScope.$on('$stateChangeSuccess', function (event) {
        if (!$window.ga)
            return;

        console.log('ga!');
        $window.ga('send', 'pageview', {page: $location.path()});
    });
}]);

y2App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

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
}]);

y2App.controller('WorkController', ['$scope', '$timeout', function($scope, $timeout){
    var vm = this;
    vm.designs = [];

    var addDesign = function(name, fullProjectUrl){
        vm.designs.push({
            alt: name,
            small: 'img/750/' + name + '.png',
            big: 'img/1200/' + name + '.png',
            fullProjectUrl: fullProjectUrl
        })
    };

    vm.pickDesign = function(design){
        if(vm.picked == design) {
            design = null;
        }
        vm.picked = design;
    };

    addDesign('brod', 'https://www.behance.net/gallery/19665489/branding-broed');
    addDesign('biscuit', 'https://www.behance.net/gallery/24550411/rebranding-webdesign-biscuit-projekt');
    addDesign('architecture', 'https://www.behance.net/gallery/24550411/rebranding-webdesign-biscuit-projekt');
    addDesign('jorn', 'https://www.behance.net/gallery/24852767/JORN-visual-identity');
    addDesign('carpenter', 'https://www.behance.net/gallery/24447469/visual-identity-carpenter');
    addDesign('biotanical', 'https://www.behance.net/gallery/26065139/-B-I-O-T-A-N-I-C-A-L');
    addDesign('dorteRask', 'https://www.behance.net/gallery/24583411/branding-makeup-artist');
    addDesign('czarnaKawka', 'https://www.behance.net/gallery/19665803/branding-czarna-kawka');

    $timeout(function(){
        picturefill();
    }, 0);
}]);

y2App.controller('AboutController', ['$timeout', function($timeout){
    var vm = this;
    $timeout(function(){
        picturefill();
    }, 0);
}]);

y2App.directive('y2Logo', function(){
    return {
        restrict: 'E',
        template: '<div class="row" style="margin-top: 50px">' +
                  ' <img src="img/logo.png" class="img-responsive center-block img-logo" alt="2Y Logo">' +
                  '     <div class="logo-text text-center"> <p>2Y GRAPHIC DESIGN STUDIO</p> </div>' +
                  '</div>'
    }
});

y2App.directive('y2Footer', function(){
    return {
        restrict: 'E',
        templateUrl: 'views/footer.html'
    }
});