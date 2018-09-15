function searchNames(nameMask, listParserCallback) {
	$.getJSON("https://hr.oat.taocloud.org/v1/users?limit=200&name="+nameMask)
	.done(function(json) {
		
		$("#content").dialog("open");
		$("#content").dialog("option", "title", "Showing: " + (nameMask!=""?nameMask:"<all>") );
		var listData = listParserCallback ? listParserCallback(json) : defaultParser(json);
		var listString = "";
		var items = [];
		
		$.each( listData, function( key, val ) {
			items.push( "<li id='" + key + "'>" + val.val + "</li>" );
		});
		
		var listItems = $( "<ul/>", {
			"class": "demo-list",
			html: items.join( "" )
		}).appendTo($("#content"));
		
		
		for (l in listData) {
			var item = listData[l];
			listString += '<li >'+item+'</li>';
		}
	})
	.fail(function(json) {
		$("#content").dialog("open");
		$("#content").html('<div>Failed loading the list. Reopen the dialog to retry.</div>');
	});
}

function defaultParser(json) {
	var listData = [];
	for  (l in json) {
		var item = json[l];
		listData.push({val: item.firstName+" "+item.lastName});
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
