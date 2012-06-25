
function ScoutingTeam(numberOfAgents, homebase, myId) {
	this.homebase = homebase;

	this.role = null;

	this.chooseAction = function(){
		if(this.role == null){
			return "comunicate";
		} else {
			return "move";
		}
	}

	this.getMessage = function(){
		if(this.role == null){
			this.role = "scout"
			return "collector"
		}
	}

	this.getName = function(){
		return "S";
	}

	this.receiveMessage = function(msg){
		if(this.role == null){
			this.role = msg;
		}
		log(this, "got Message: " + msg);
		log(this, "my role is now: " + this.role);
	}

	this.getMoveDirection = function() {
		var direction = getRandomDirection();
		//console.log(this.getType() + ".getMoveDirection() -> " + direction)
		return direction;
	}

	this.newPosition = function(newPos){
		
	}

	this.newSurrounding = function(surrounding){
		
	}
	
}


function HeadlessChicken(numberOfAgents, homebase, myId) {

	this.homebase = homebase;

	this.nextAction = "move";
	this.gotPoint = false;

	this.chooseAction = function(){
		var currentAction = this.nextAction;
		// default back to move after an arbitrary action
		this.nextAction = "move";
		return currentAction;
	}

	this.getMoveDirection = function() {
		var direction;
		if(this.gotPoint){
			if(arrayEqual(this.homebase, [0,0])){
				direction = "SW";
			} else {
				direction = "NE";
			}
			
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

registerTeam("ScoutingTeam", ScoutingTeam);
registerTeam("HeadlessChicken", HeadlessChicken);

