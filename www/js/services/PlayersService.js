(function(){
	app.factory('PlayerService', playersService);
	playersService.$inject = ['$http', '$q', 'jsons'];
	
	function playersService($http, $q, jsons){
		var self = {};

		self.getPlayers = function(){
			var deferred = $q.defer();
			var url = jsons.players;

			$http.get(url)
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		};

		self.getPlayer = function(id){
			
		}

		return self;
	}
	
})();