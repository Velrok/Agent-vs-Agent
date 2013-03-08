
var visualizeGamingFieldInto = function(field, domObj) {
	//console.log("visualizeGamingFieldInto called");

	var html = "";

	html += "<table>";

	var size = field.getSize();

	// the gaming field index start at the bottom left
	// while the table is created starting at the top right
	// so we need to count down the lines from the top
	for(var y = size[1]-1; y >= 0 ; y--){
		html += "<tr>";
		for(var x = 0; x < size[0]; x++){
			html += "<td>";

			var items = field.getAll([x,y]);
			//console.log(items);
			items.foreach(function(k,v){
				//console.log(v);
				html += visualizeGamingFieldEntity(v);
			});

			html += "</td>";
		}
		html += "</tr>";
	}
	html += "</table>";

	$(domObj).html(html);
}

var visualizeGamingFieldEntity = function(entity){
	var visualisationFunction = "visualizeEntityType"+entity.getType();
	return this[visualisationFunction](entity);
};

var visualizeTeamSelectionListInto = function(idList, domObj){
	// read team selection
	var html = visualizeObjAsSelection(idList,
		{"id": "red_team_selector",
			"class": "team_selector"});


	// blue team selection
	html += visualizeObjAsSelection(idList,
		{id: "blue_team_selector",
			"class": "team_selector"});

	$(domObj).html(html);
};

var visualizeObjAsSelection = function(obj, htmlAttributes){
	var html = "<select";
	for(var attribute in htmlAttributes){
		if(htmlAttributes.hasOwnProperty(attribute)){
			html += " " + attribute + "=\"";
			html += htmlAttributes[attribute];
			html += "\"";
		}
	}
	html += ">";

	for(var attribute in obj){
		if(obj.hasOwnProperty(attribute)){
			console.log(attribute);
			html += "<option>";
			html += attribute;
			html += "</option>";
		}
	}
	html += "</select>";
	return html;
};
