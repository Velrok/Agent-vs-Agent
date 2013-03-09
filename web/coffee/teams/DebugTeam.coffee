class TestTeam extends Agent
	chooseAction: ()->
		console.log "chooseAction"
		return "N"

window.registerTeam "TestTeam", TestTeam