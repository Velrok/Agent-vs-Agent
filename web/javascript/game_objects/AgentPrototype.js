"use strict";

/**
A prototype for any new agent.
This serves as a documentation and base implementation for new agents.

@param  numberOfAgents - the number of agents that will be 
        created this game. The team size.

@param  homebase - an array [x,y] describing the homebase coordinates.
        An agent that carrys a point has to move to the home base to 
        score a point. 

@param  id - Number, unique in the team.
*/
function Agent(numberOfAgents, homebase, id) {
  
}

/*
1. callback.

This should be used to create a descision.

@param  surrounding - an object with the following structure:
        keys are optional and one of this: N, NW, W, SW, S, SE, E, NE
        each key, if present will contain a list of strings.
        Each string may be one of this: "Point" or "Agent"

*/
Agent.prototype.newSurrounding = function(surrounding) {
  
};

/*
2. callback

This should return one of this: 'move', 'collect', 'comunicate'
*/
Agent.prototype.chooseAction = function() {
  return "pass";
};

/*
This gets called when you return 'move' on chooseAction.

You should return on if this: N, NE, E, SE, S, SW, W, NW
to move in the according direction.

*/
Agent.prototype.getMoveDirection = function() {
  return "N";
};

/*
This gets called after the move.

@param  newPos - array [x,y]
*/
Agent.prototype.newPosition = function(newPos) {
  
};

/*
This gets called if the action was 'collect' and it was
a success.

The agent should now return to home base to score a point.
*/
Agent.prototype.pointCollected = function() {
  
};

/*
This gets called if the action was 'collect' and it was
NOT successfull.

The environment issn't what the agent thought it to be.
Maybee another agent was faster in collecting the point.
*/
Agent.prototype.pointNotCollected = function() {
  
};

/*
This gets called if an agent returns to the homebase while
its carrys a point.
The point will be added to the teams score.
*/
Agent.prototype.pointScored = function() {
  
};

/*
This gets called if the action was 'communicate'.

@returns -  a string that will be send to all in the team
            the sender included.
*/
Agent.prototype.getMessage = function() {
  return "";
};

/*
This gets called after a team mate send a message.

@param msg -  The message string.
*/
Agent.prototype.receiveMessage = function(msg) {
  
};

/*
This will be displayed ontop the agent.
Its probably a good idea to keep this short about 3 characters.
*/
Agent.prototype.getName = function() {
  return "";
};




