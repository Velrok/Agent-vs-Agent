"use strict";

function WaldemarAgent() {

	this.state = new InitState();

	this.chooseAction = function(){
		var r = this.state.chooseAction();
		this.state = r.state;
		return r.result;
	}

	this.getMoveDirection = function() {
		var r = this.state.getMoveDirection();
		this.state = r.state;
		return r.result;
	}

	this.newPosition = function(newPos){
		var r = this.state.newPosition();
		this.state = r.state;
		return r.result;
	}

	this.newSurrounding = function(surrounding){
		var r = this.state.newSurrounding();
		this.state = r.state;
		return r.result;
	}

	this.pointCollected = function(){
		var r = this.state.pointCollected();
		this.state = r.state;
		return r.result;
	}

	this.pointNotCollected = function(){
		var r = this.state.pointNotCollected();
		this.state = r.state;
		return r.result;
	}

	this.pointScored = function(){
		var r = this.state.pointScored();
		this.state = r.state;
		return r.result;
	}

	this.getMessage = function(){
		var r = this.state.getMessage();
		this.state = r.state;
		return r.result;
	}

	this.receiveMessage = function(){
		var r = this.state.receiveMessage();
		this.state = r.state;
		return r.result;
	}
};

registerTeam("von waldemar", WaldemarAgent);

/*
	INIT STATE
*/
function InitState(){

}
InitState.prototype = new State();

InitState.prototype.chooseAction = function(){
	this.agent.role = "runner";
	return {
		state: this,
		result: "comunicate"
	}
}

InitState.prototype.getMessage = function(){
	return {
		state: this,
		result: "scout"
	}
}

InitState.prototype.receiveMessage = function(msg){
	this.agent.role = msg;

	switch(msg){
		case "scout":
			return {
				state: this,
				result: "comunicate"
			}
		default:
			console.err("unknown role: " + msg);
			break;
	}
}

/*
	ScoutSearchState STATE
*/
function ScoutSearchState(){

}
ScoutSearchState.prototype = new State();

/*
	RunnerSearchState STATE
*/
function RunnerSearchState(){

}
RunnerSearchState.prototype = new State();


/*
	STATE
*/
function State(agent) {
	this.agent = agent;
};

State.prototype.chooseAction = function() {
	return {
		state:this, 
		result: "pass"
	};
};

State.prototype.getMoveDirection = function() {
	return {
		state:this, 
		result: "N"
	};
};

State.prototype.newPosition = function(newPos) {
	return {
		state:this
	};
};

State.prototype.newSurrounding = function(surrounding) {
	return {
		state:this
	};
};

State.prototype.pointCollected = function() {
	return {
		state:this
	};
};

State.prototype.getMessage = function(){
	return {
		state:this, 
		result: ""
	};
};

State.prototype.receiveMessage = function(msg){
	return {
		state:this
	};
};