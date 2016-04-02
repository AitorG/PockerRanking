(function(){
	app.controller('RankingCtrl', rankingCtrl);
	rankingCtrl.$inject = ['$scope', 'players', '$http'];

	function rankingCtrl($scope, players, $http){
		$scope.labels = [];
		$scope.data = [];

		$scope.players = players;
		players.sort(compare);

		for (var i = 0; i < players.length; i++) {
			$scope.labels.push(players[i].name);
			$scope.data.push(players[i].points);
		}

		$scope.showModal = showModal;
	}

	function compare(a,b) {
	  if (a.points > b.points)
	    return -1;
	  else if (a.points < b.points)
	    return 1;
	  else 
	    return 0;
	}

	function showModal() {
		bootbox.dialog({
		  message: document.getElementById("rankingModal").innerHTML,
		  title: "Agregar partida",
		  buttons: {
		    success: {
		      label: "Agregar",
		      className: "btn-success",
		      callback: function() {
		      	bootbox.alert("Partida agregada correctamente");
		      }
		    },
		    danger: {
		      label: "Cancelar",
		      className: "btn-danger",
		      callback: function() {
		      	bootbox.hideAll();
		      }
		    }
		  }
		});
	}

})();