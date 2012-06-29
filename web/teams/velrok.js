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
			Collecting
**/
function CollectingBaseState(){}
CollectingBaseState.prototype.__proto__ = BaseState.prototype;

CollectingBaseState.prototype.getName = function(){
	return "C";
}

function CollectingPoints(){};
CollectingPoints.prototype.__proto__ = CollectingBaseState.prototype;

CollectingPoints.prototype.newSurrounding = function(surr){
	if(surr.C && surr.C.contains('Point')){
		this.updateState(new PickupPoint());
	}
}

function PickupPoint(){}
PickupPoint.prototype.__proto__ = CollectingBaseState.prototype;

PickupPoint.prototype.chooseAction = function(){
	return 'collect';
}

PickupPoint.prototype.pointCollected = function(){
	this.say("Got a point.");
	this.updateState(new ReturningToHomeBase());
}

PickupPoint.prototype.pointNotCollected = function(){
	this.say('Something went wrong no point here :(.');
	if(this.knownPointLocations.length > 0){
		this.updateState(new CollectingPoints());
	} else {
		this.updateState(new Scouting());
	}
}

PickupPoint.prototype.enter = function(){
	this.say("I will pickup the point now.");
}

function ReturningToHomeBase(){}
ReturningToHomeBase.prototype.__proto__ = CollectingBaseState.prototype;

ReturningToHomeBase.prototype.chooseAction = function(){
	return 'move';
}

ReturningToHomeBase.prototype.getMovedirection = function(){
	return coordinateToRelative(this.myPosition, this.homebase);
}

ReturningToHomeBase.prototype.enter = function(){
	this.say("Running back to homebase!");
}

/**
			Scouting
**/
function ScoutBaseState(){}
ScoutBaseState.prototype.__proto__ = BaseState.prototype;

ScoutBaseState.prototype.getName = function(){
	return "S";
}

function Scouting(){}
Scouting.prototype.__proto__ = ScoutBaseState.prototype;

Scouting.prototype.newSurrounding = function(surr){
	var foundPoints = [];
	for(var k in surroundingKeys){
		if(surr.k){
			for(e in surr.k){
				if(e == "Point"){
					this.knownPointLocations.add(
						relativeToCoordinate(this.myPosition, k));
				}
			}
		}
	}
	if(this.knownPointLocations.length > 0){
		this.updateState(new CollectingPoints());
	}
}

Scouting.prototype.chooseAction = function(){
	return "move";
}

Scouting.prototype.getMovedirection = function(){
	return getRandomDirection();
}

Scouting.prototype.enter = function(){
	this.say("Scouting for points.");
}

/**
			Agent
**/
function VelrokAgent(numberOfAgents, homebase, id) {

	this.numberOfAgents = numberOfAgents;
	this.homebase = homebase;
	this.id = id;

	this.myPosition = homebase;

	this.knownPointLocations = new SortedPositionList();

	this.state = new Scouting();

	this.say("Hello");
}
VelrokAgent.prototype.__proto__ = Agent.prototype;

VelrokAgent.prototype.updateState = function(newState){
	this.state.leave();
	this.state = newState;
	this.state.enter();
}

VelrokAgent.prototype.newPosition = function(newPos){
	this.myPosition = newPos;
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
forwardCallToState(VelrokAgent, 'getMoveDirection');
forwardCallToState(VelrokAgent, 'pointCollected');
forwardCallToState(VelrokAgent, 'pointNotCollected');
forwardCallToState(VelrokAgent, 'pointScored');
forwardCallToState(VelrokAgent, 'getMessage');
forwardCallToState(VelrokAgent, 'receiveMessage');
forwardCallToState(VelrokAgent, 'getName');

registerTeam('Velrok', VelrokAgent);