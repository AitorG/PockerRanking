(function(){

	app.controller('PlayersCtrl', PlayersCtrl);
	PlayersCtrl.$inject = ['$scope', 'players', '$filter', '$timeout'];

	function PlayersCtrl($scope, players, $filter, $timeout){
		$scope.players = players;
		$scope.getPlayer = function(id){
			$scope.player = $filter('filter')(players, function (d) {return d.id === id})[0];
			$timeout(function(){
				showModal();
			});
		};

		$scope.deletePlayer = function(id){
			$scope.player = $filter('filter')(players, function (d) {return d.id === id})[0];
			$timeout(function(){
				bootbox.confirm("Se va a eliminar a: " + $scope.player.name , function(result){});
			});
		};
	}

	function showModal() {
		bootbox.dialog({
		  message: document.getElementById("playerModal").innerHTML,
		  title: "Modificar jugador",
		  buttons: {
		    success: {
		      label: "Modificar",
		      className: "btn-success",
		      callback: function() {
		      	
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