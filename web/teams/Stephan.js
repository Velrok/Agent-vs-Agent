"use strict";

function MemoryMap() {
	this.map = {};
}
MemoryMap.prototype.mark = function(x,y) {
	return this.map[x + "_" + y] = 1;
};
MemoryMap.prototype.unmark = function(x,y) {
	delete this.map[x + "_" + y];
};
MemoryMap.prototype.read = function(x,y) {
	return this.map[x + "_" + y];
};
MemoryMap.prototype.getNext = function() {
	var keys = Object.keys(this.map);
	if (keys.length === 0) 
		return null;
	var key = keys[0];
	var i = key.indexOf("_");
	return [
		parseInt(key.substring(0, i), 10),
		parseInt(key.substring(i + 1), 10)
	];
};
MemoryMap.prototype.isEmpty = function() {
	return Object.keys(this.map).length === 0;
};


function relativeToCoordinate(pos, direction) {
	var x = 0;
	var y = 1;
	var result = [pos[x], pos[y]];
	direction.split("").forEach(function (dir) {
		if (dir == "N") result[y]++;
		if (dir == "S") result[y]--;
		if (dir == "E") result[x]++;
		if (dir == "W") result[x]--;
	});
	return result;
}
function coordinateToRelative(c, c2) {
	var dir = "";
	var x = 0, y = 1;
	if (c[y] < c2[y]) dir += "N";
	else if (c[y] > c2[y]) dir += "S";
	
	if(c[x] < c2[x]) dir += "E";
	else if(c[x] > c2[x]) dir += "W";
	
	if (dir == "") {
		return "C";
	} 
	return dir;	
}
function findRandomDirection(pos) {
	var newPos, dir;
	do {
		dir = getRandomDirection();
		newPos = relativeToCoordinate(pos, dir);
	} while (newPos[0] < 0 || newPos[1] < 0 || newPos[0] > 7 || newPos[1] > 7);
	return dir;
}

function isPositionEqual(pos1, pos2) {
	return pos1[0] === pos2[0] && pos1[1] == pos2[1];
}	
function hasCoin(surroundingDetail) {
	return surroundingDetail && surroundingDetail.indexOf("Point") >= 0;
}

var SeekerState = {
	name: "SeekerState",
	chooseAction: function() {
		return "move";
	},

	getMoveDirection: function() {
		var targetPos = this.pointsToVisit.getNext();
		var dir;
		if (targetPos) {
			dir = coordinateToRelative(this.position, targetPos);
			log(this, 'Taking a walking to ' + dir + ', daydreaming.');
		} else {
			dir = findRandomDirection(this.position);
			log(this, 'Just walking around to ' + dir + ', minding my business.');
		}
		
		return dir;
	},

	receiveMessage: function(message) {},
	getMessage: function(){ return "nothing to tell"; },
	
	onSurrounding: function() {
		if (!this.memoryMap.isEmpty()) {
			this.updateState(GoAndCollectCoinState);
		}
	}
};

var GoAndCollectCoinState = {
	name: "GoAndCollectCoinState",
	
	onSurrounding: function() {
		if (this.memoryMap.isEmpty()) {
			this.updateState(SeekerState);
		}
	},
	
	chooseAction: function() {
		if (isPositionEqual(this.position, this.memoryMap.getNext())) {
			log(this, 'I am standing on a coin. Going to take it with me, dont I?');
			return "collect";
		}
		return "move"; 
	},
	getMoveDirection: function() {
		var pos = this.memoryMap.getNext();
		var dir = coordinateToRelative(this.position, pos);
		log(this, "I know there is a coin around. Moving " + dir);
		return dir;
	},

	pointCollected: function(){
		log(this, "Got it. Running straight home!");
		var pos = this.memoryMap.getNext();
		this.memoryMap.unmark(pos[0], pos[1]);
		this.updateState(HoldingCoinAndRunState);
	},
	pointNotCollected: function(){
		log(this, "Uuuuh. Dude!?!?! There is no coin. Who are you, Mario?");
		var pos = this.memoryMap.getNext();
		this.memoryMap.unmark(pos[0], pos[1]);
		if (this.memoryMap.isEmpty()) {
			this.updateState(SeekerState);
		}
	},
};

var HoldingCoinAndRunState = {
	name: "HoldingCoinAndRunState",
	chooseAction: function() { return "move"; },
	getMoveDirection: function() {
		var dir = coordinateToRelative(this.position, [0,0]);
		if (dir == "C") dir = "S";
		log(this, "Running " + dir);
		return dir;
	},
	pointScored: function() {
		log(this, "Aaaaaaaaaaaaaaaaaaaaaaaaand TOUCHDOWN!!!! \o/");
		if (this.memoryMap.isEmpty()) {
			this.updateState(SeekerState);
		} else {
			this.updateState(GoAndCollectCoinState);
		}
	}
};

var agentId = 0;
function ZeissSAgent() {
	this.id = ++agentId;
	this.position = [0,0];
	this.memoryMap = new MemoryMap();
	this.pointsToVisit = new MemoryMap();
	// This kind-of gives waypoints for walking for the agents. We initialize the order based on Agent ID
	this.pointsToVisit.mark(1,1);
	if (this.id == 1 || this.id == 2) {
		this.pointsToVisit.mark(1,6);
		this.pointsToVisit.mark(6,1);
	}
	else if (this.id == 3 || this.id == 4) {
		this.pointsToVisit.mark(6,1);
		this.pointsToVisit.mark(1,6);
	}
	// Agent 5/6 walks straight through to 6,6
	this.pointsToVisit.mark(6,6);
	this.state = SeekerState;

};
ZeissSAgent.prototype.updateState = function(newState) {
	log(this, "Switching state from " + this.state.name + " to " + newState.name);
	this.state = newState;
};
ZeissSAgent.prototype.newPosition = function(newPos) {
	this.position = newPos;
	this.pointsToVisit.unmark(newPos[0], newPos[1]);
};
ZeissSAgent.prototype.newSurrounding = function(surrounding){
	var allDirs = ["N", "E", "S", "W", "NW", "NE", "SW", "SE", "C"];
	var that = this;
	allDirs.forEach(function(direction) {
		var pos = relativeToCoordinate(that.position, direction);
		if (hasCoin(surrounding[direction])) {
			that.memoryMap.mark(pos[0], pos[1]);
			log(that, 'Found a coin in ' + direction + "-" + pos + '! Hooray! Pigshit!');
		} else {
			that.memoryMap.unmark(pos[0], pos[1]);	
		}
	});
	if (this.state.onSurrounding)
		this.state.onSurrounding.call(this);
};
function decorateAgentStateCaller(obj, name) {
	// Forward the call to the state object
	obj.prototype[name] = function () {
		if (this.state[name])
			return this.state[name].apply(this, arguments);
		else
			log(this, "Unknown method: " + name);
	};
	obj.prototype[name].name = name;
}
// decorateAgentStateCaller(ZeissSAgent, "newSurrounding");
// decorateAgentStateCaller(ZeissSAgent, "newPosition");
decorateAgentStateCaller(ZeissSAgent, "chooseAction");
decorateAgentStateCaller(ZeissSAgent, "getMoveDirection");
decorateAgentStateCaller(ZeissSAgent, "pointCollected");
decorateAgentStateCaller(ZeissSAgent, "pointNotCollected");
decorateAgentStateCaller(ZeissSAgent, "pointScored");


// Which Team to play?
registerTeam("ZeissSAgent", ZeissSAgent);
// TeamBAgent = ZeissSAgent;




