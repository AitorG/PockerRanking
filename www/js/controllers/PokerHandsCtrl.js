(function(){
    app.controller('PokerHandsCtrl', pokerHandsCtrl);
    pokerHandsCtrl.$inject = ['$scope', 'pokerHands'];
    
    function pokerHandsCtrl($scope, pokerHands){
        $scope.pokerHands = pokerHands;
        
    }
})();