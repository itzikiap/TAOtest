function searchNames(nameMask) {
	$.getJSON("https://hr.oat.taocloud.org/v1/users?name="+nameMask, function(json) {
		$("#dialog").dialog("open");
		$("#dialog").dialog( "instance" ).element[0].innerText = JSON.stringify(json);
	});
}

$( function() {
	$( "#dialog" ).dialog({
		  autoOpen: false,
		  title: "JSON results"
	});
} );
