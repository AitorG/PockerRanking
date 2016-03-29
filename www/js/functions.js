function switchFocus(num){
	var id="focus"+num;
	for (var i = 1; i <= 3; i++) {
		$("#focus"+i+" .item-content").removeAttr("style");

	}
	$("#"+id+" .item-content").attr("style", "background-color: #333 !important");
}

$(document).ready(function(){
	var letABitTime = setTimeout(
			'$("#focus1 .item-content").attr("style", "background-color: #333 !important")',
			100
		);
	
});
	
$(document).ready(function(){ //data storage function

	if(window.localStorage['datos']){ //check if local storage was called before
		//data already stored
		var data = JSON.parse(window.localStorage['datos'] || '{}');
		alert(data.Aitor);

	}
	else{
		//not data stored yet
		 
		 var data = { //an object into arrays
		  Aitor: 0,
		  Ingrid: 0,
		  Guille: 0
		};

		window.localStorage['datos'] = JSON.stringify(data);
	}
		
		
		

});

