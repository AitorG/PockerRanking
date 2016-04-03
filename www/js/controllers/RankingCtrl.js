(function(){
	app.controller('RankingCtrl', rankingCtrl);
	rankingCtrl.$inject = ['$scope', 'players', '$http', '$ionicPopup'];

	function rankingCtrl($scope, players, $http, $ionicPopup){
		$scope.labels = [];
		$scope.data = [];
		$scope.selectedPlayers = {};

		$scope.players = players;
		$scope.avaliablePlayers = players;
		players.sort(compare);

		for (var i = 0; i < players.length; i++) {
			$scope.labels.push(players[i].name);
			$scope.data.push(players[i].points);
		}

		$scope.showModal = function() {
			var myPopup = $ionicPopup.show({
				templateUrl: 'templates/addGameModal.html',
				title: 'Inserta una nueva partida',
				subTitle: 'Los puntos se asignarán automáticamente',
				scope: $scope,
				buttons: [
					{ text: 'Cancelar' },
					{
						text: 'Guardar',
						type: 'button-positive',
						onTap: function(e) {
							if (!$scope.data.wifi) {
	            //don't allow the user to close unless he enters wifi password
	            e.preventDefault();
		          } else {
		          	return $scope.data.wifi;
		          }
	        	}
	      	}
	      ]
	    });
		};


		
	}

	function compare(a,b) {
		if (a.points > b.points)
			return -1;
		else if (a.points < b.points)
			return 1;
		else 
			return 0;
	}

})();