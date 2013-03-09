teams = {}

window.registerTeam = (id, constructor) ->
	console.log("new team registered: #{id}")
	teams[id] = constructor

gm = null
timer = null
msBetweenMoves = 1000

redTeam = null
blueTeam = null

getMsBetweenMoves = () ->
	return msBetweenMoves

setMsBetweenMoves = (ms) ->
	$('#time_between_moves').html(ms);
	msBetweenMoves = ms
	@stopGameLoop()
	@startGameLoop()

window.log = (agent, msg) ->
	agentId = gm.getAgentId(agent)
	if agentId >= 0
		console.log "agent[#{agentId}] #{gm.moveCount}: #{msg}"

nextMove = () ->
	hasNextMove = gm.nextMove()
	if(hasNextMove)
		startTimer(true)
	else
		alert("Game Over")

	$('#teamAScore').html(gm.getRedTeamScore());
	$('#teamBScore').html(gm.getBlueTeamScore());

	visualizeGamingFieldInto(gm.gamingField, gaming_field);

startGameLoop = ()->
	if not timer
		timer = setInterval(nextMove, msBetweenMoves)

stopGameLoop = ()->
	clearInterval(timer)
	timer = null

resumeGame = () ->
	$('#start_game_loop').attr('disabled', true);
	$('#stop_game_loop').removeAttr('disabled');
	startGameLoop()

pauseGame = () ->
	$('#start_game_loop').removeAttr('disabled')
	$('#stop_game_loop').attr('disabled', true)
	stopGameLoop()

newGame = ()->
	console.log "newGame"
	gm = new GameMaster(new GamingField(8,8), redTeam, blueTeam)
	resumeGame()

getTeamClassFromSelection = (selectorChangeEvent) ->
	id = selectorChangeEvent.currentTarget.value
	return teams[id]

$(document).ready ()->
	visualizeTeamSelectionListInto(teams, $('#team_selection'))

	$("#new_game").click(newGame)
	$("#start_game_loop").click(resumeGame);
	$("#stop_game_loop").click(pauseGame);

	$('#game_speed_slider').change (event) ->
		setMsBetweenMoves(event.currentTarget.value)

	$('#red_team_selector').ready (element) ->
		redTeam = teams[$('#red_team_selector')[0].value]

	$('#red_team_selector').change (selector) ->
		redTeam = getTeamClassFromSelection(selector)

	$('#blue_team_selector').ready (selector) ->
		blueTeam = teams[$('#blue_team_selector')[0].value]

	$('#blue_team_selector').change (selector) ->
		blueTeam = getTeamClassFromSelection(selector)

	console.log('ready lets rock!');