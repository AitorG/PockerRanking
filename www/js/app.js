var app = angular.module('poker', ['ionic', 'chart.js', 'ui.bootstrap']);

app.run(ionicPlatform);
bootbox.setDefaults({
    locale: "es",
    
})

var jsons = {
    pokerHands : "js/resources/pokerHands.json",
    players : "js/resources/players.json"
}

app.value("jsons", jsons);

function ionicPlatform($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}

app.config(configuracion);

function configuracion ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'IonicCtrl'
        })

        .state('app.ranking', {
            url: '/ranking',
            templateUrl: 'templates/ranking.html',
            controller: 'RankingCtrl',
            resolve : {
                players : ['PlayerService', function(PlayersService){
                    return PlayersService.getPlayers();
                }]
            }
        })

        .state('app.jugadores', {
            url: '/jugadores',
            templateUrl: 'templates/jugadores.html',
            controller: 'PlayersCtrl',
            resolve: {
                players : ['PlayerService', function(PlayersService){
                    return PlayersService.getPlayers();
                }]
            }
        })

        .state('app.pokerHands', {
            url: '/pokerHands',
            templateUrl: 'templates/pokerHands.html',
            controller: 'PokerHandsCtrl',
            resolve: {
                pokerHands: ['PokerHandsService', function(PokerHandsService){
                    return PokerHandsService.getPokerHands();
                }]
            }
        })

    $urlRouterProvider.otherwise(function($injector){
        var $state = $injector.get('$state');
        $state.go('app.ranking');
    });
}
