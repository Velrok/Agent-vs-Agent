"use strict";

/**
			Helper
**/

Array.prototype.remove = function(element){
	if(element instanceof Array){
		for (var i = 0; i < this.length; i++) {
			if (arrayEqual(this[i], element)) {
				return this.splice(i, 1);
			};
		};
	} else {
		var idx = this.indexOf(element);
		if(idx > 0){
			// found an entry
			return this.splice(idx, 1);
		}
	}
}

Array.prototype.contains = function(element){
	if(element instanceof Array){
		for (var i = 0; i < this.length; i++) {
			if (arrayEqual(this[i], element)) {
				return true;
			};
		};
		return false;
	} else {
		var idx = this.indexOf(element);
		return idx > 0;
	}
}

function SortedPositionList() {
	this.positions = [];
}

SortedPositionList.prototype.add = function(pos){
	this.positions.push(pos);
}

SortedPositionList.prototype.remove = function(pos){
	this.positions.remove(pos);
}

SortedPositionList.prototype.getNearrestTo = function(pos){
	var nearest;
	var smallestDistance = 9999999999;
	this.positions.foreach(function(position){
		var d = distance(position, pos);
		if(d < smallestDistance){
			smallestDistance = d;
			nearest = position;
		}
	});
}


/**
			State
**/

function BaseState(){}
BaseState.prototype.__proto__ = Agent.prototype;

BaseState.prototype.enter = function(){
}

BaseState.prototype.leave = function(){
}

/**
			Scouting
**/
function ScoutBaseState(){}
ScoutBaseState.prototype.__proto__ = BaseState.prototype;

ScoutBaseState.prototype.getName = function(){
	return "S";
}


/**
			Runner
**/
function RunnerBaseState(){}
RunnerBaseState.prototype.__proto__ = BaseState.prototype;

RunnerBaseState.prototype.getName = function(){
	return "R";
}


/**
			Agent
**/
function VelrokAgent(numberOfAgents, homebase, id) {

	this.numberOfAgents = numberOfAgents;
	this.homebase = homebase;
	this.id = id;

	console.log(id);
	if(id == 0){
		// we have one runner
		this.state = new RunnerBaseState();
		console.log("Im a Runner");
	} else {
		// and all the others are souts
		this.state = new ScoutBaseState();
		console.log("Im a Scout");
	}
}

VelrokAgent.prototype.updateState = function(newState){
	this.state.leave();
	this.state = newState;
	this.state.enter();
}

function forwardCallToState(agent, function_name) {
	// Forward the call to the state object
	agent.prototype[function_name] = function () {
		if (this.state[function_name])
			return this.state[function_name].apply(this, arguments);
		else
			log(this, "Unknown method: " + function_name);
	};
	agent.prototype[function_name].name = function_name;
}

forwardCallToState(VelrokAgent, 'newSurrounding');
forwardCallToState(VelrokAgent, 'chooseAction');
forwardCallToState(VelrokAgent, 'getMovedirection');
forwardCallToState(VelrokAgent, 'newPosition');
forwardCallToState(VelrokAgent, 'pointCollected');
forwardCallToState(VelrokAgent, 'pointNotCollected');
forwardCallToState(VelrokAgent, 'pointScored');
forwardCallToState(VelrokAgent, 'getMessage');
forwardCallToState(VelrokAgent, 'receiveMessage');
forwardCallToState(VelrokAgent, 'getName');

registerTeam('Velrok', VelrokAgent);