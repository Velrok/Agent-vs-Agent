var getRandomDirection = function(){
	switch(Math.round(Math.random() * 7)){
		case 0: return "N";
		case 1: return "NE";
		case 2: return "E";
		case 3: return "SE";
		case 4: return "S";
		case 5: return "SW";
		case 6: return "W";
		case 7: return "NW";
		default: throw "error";
	};
};

function TeamAAgent() {
	this.getType = function(){
		return "TeamAAgent";
	}

	this.chooseAction = function(){
		//console.log(this.getType() + ".chooseAction() -> move")
		return "move";
	}

	this.getMoveDirection = function() {
		var direction = getRandomDirection();
		//console.log(this.getType() + ".getMoveDirection() -> " + direction)
		return direction;
	}

	this.newPosition = function(newPos){
		
	}

	this.newSurrounding = function(surrounding){
		//console.log(this.getType() + " surrounding: " + surrounding);
	}
	
}


function TeamBAgent() {
	this.nextAction = "move";
	this.gotPoint = false;

	this.getType = function(){
		return "TeamBAgent";
	}

	this.chooseAction = function(){
		var currentAction = this.nextAction;
		// default back to move after an arbitrary action
		this.nextAction = "move";
		return currentAction;
	}

	this.getMoveDirection = function() {
		var direction;
		if(this.gotPoint){
			direction = "NE";
		} else {
			direction = getRandomDirection();
		}

		//console.log(this.getType() + ".getMoveDirection() -> " + direction)
		return direction;
	}

	this.newPosition = function(newPos){
		
	}

	this.newSurrounding = function(surrounding){
		if(surrounding.C != null
			&& surrounding.C.indexOf("Point") >= 0
			&& !this.gotPoint ){
			this.nextAction = "collect";
		}
	}

	this.pointCollected = function(){
		console.log("point collected :)");
		this.gotPoint = true;
	}

	this.pointNotCollected = function(){
		console.log("point not collected :(");
	}

	this.pointScored = function(){
		console.log("point scored!!!! :D ");
		this.gotPoint = false;
	}
}