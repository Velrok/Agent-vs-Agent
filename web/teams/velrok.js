"use strict";

function VelrokAgent() {
}

VelrokAgent.prototype = Agent;

function forwardCallToState(agent, function_name) {
	// Forward the call to the state object
	agent.prototype[function_name] = function () {
		if (this.state[function_name])
			return this.state[function_name].apply(this, arguments);
		else
			log(this, "Unknown method: " + function_name);
	};
	obj.prototype[function_name].name = function_name;
}

registerTeam('Velrok', VelrokAgent);