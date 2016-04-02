(function(){
	app.factory('PokerHandsService', pockerHandsService);
	pockerHandsService.$inject = ['$http', '$q', 'jsons'];
	
	function pockerHandsService($http, $q, jsons){
		var self = {};

		self.getPokerHands = function(){
			var deferred = $q.defer();
			var url = jsons.pokerHands;

			$http.get(url)
				.success(deferred.resolve)
				.error(deferred.reject);

			return deferred.promise;
		};
		
		return self;
	}	

})();