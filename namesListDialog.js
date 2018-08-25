function searchNames(nameMask, listParserCallback) {
	$.getJSON("https://hr.oat.taocloud.org/v1/users?limit=200&name="+nameMask, function(json) {
		
		$("#content").dialog("open");
		$("#content").dialog("option", "title", "Showing: " + (nameMask!=""?nameMask:"<all>") );
		var listData = listParserCallback ? listParserCallback(json) : defaultParser(json);
		var listString = "";
		for (l in listData) {
			var item = listData[l];
			listString += '<li >'+item+'</li>';
		}
		
		$("#content").html('<ul id="namesList" class="demo-list">'+listString+'</ul>');
	});
}

function defaultParser(json) {
	var listData = [];
	for  (l in json) {
		var item = json[l];
		listData.push(item.firstName+" "+item.lastName);
	}
	return listData;
}

$( function() {
	$( "#content" ).dialog({
		  autoOpen: false,
		  draggable: false,
		  position: { my: "left top", at: "left top", of: window },
		  hide: { effect: "fold", duration: 500 },
		  show: { effect: "fold", duration: 500 }
	});
} );
