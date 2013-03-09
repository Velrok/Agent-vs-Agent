class GameMaster

	initRed: ()->
		@redHome = [@gamingField.getWidth() / 2, @gamingField.getHeight() / 2]
		@gamingField.add(new RedHomeBase(), @redHome)
		for i in [0..@teamSize]
			@redAgents.push(new RedTeamClass(@teamSize, @redHome, i, "red"))

	initBlue: ()->
		@blueHome = [@redHome[0] + 1, @redHome[1] + 1]
		@gamingField.add(new BlueHomeBase(), @blueHome)
		for i in [0..@teamSize]
			@blueAgents.push(new BlueTeamClass(@teamSize, @blueHome, i, "blue"))

	constructor: (gamingField, RedTeamClass, BlueTeamClass)->
		@gamingField = gamingField
		@teamSize = 3
		initRed()
		initBlue()

	nextMove: ()->
		for i in [0..@teamSize]
			processAgent(@redAgents[i])
			processAgent(@blueAgents[i])

	processAgent: (agent)->
		# newSurrounding
		# chooseAction
		# todo: continue


window.GameMaster = GameMaster