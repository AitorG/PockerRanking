app.directive('autocomplete', function($compile){

	function link($scope, element, attrs){

		function updateElements (elements) {
			var html = getHtml(elements);
			html = $compile(html)($scope);
			element.replaceWith(html);
			element = html;
		}

		$scope.$watch('elements', function(){
			updateElements($scope.elements);
		}, true);

	}

	function getHtml (elements) {
			var html = "";
			html+='<input style="height:29px; width:100%;" list="elements">';
			html+='<datalist id="elements">';
			for (var i = 0; i < elements.length; i++) {
				html+="<option value='"+ elements[i].name +"'>" + elements[i].points + "</option>";
			};
			html+="</datalist>";

			return html;
	}

	return{
		restrict: 'E',
		link: link,
		scope:{
			elements: "="
		}
	}
});