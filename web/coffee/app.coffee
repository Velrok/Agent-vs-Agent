teams = {}

window.registerTeam = (id, constructor) ->
	teams[id] = constructor

gm = new GameMaster()
timer = null
msBetweenMoves = 100

getMsBetweenMoves = () ->
	return msBetweenMoves

setMsBetweenMoves = (ms) ->
	$('#time_between_moves').html(ms);
	msBetweenMoves = ms
	@stopGameLoop()
	@startGameLoop()

@log = (agent, msg) ->
	agentId = gm.getAgentId(agent)
	if agentId >= 0
		console.log "agent[#{agentId}] #{gm.moveCount}: #{msg}"

startGameLoop = ()->
	if not timer
		timer = setInterval(nextMove, msBetweenMoves)

nextMove = () ->
	hasNextMove = gm.nextMove()
	if(hasNextMove)
		startTimer(true)
	else
		alert("Game Over")

	$('#teamAScore').html(gm.teamAScore);
	$('#teamBScore').html(gm.teamBScore);

	visualizeGamingFieldInto(gm.gamingField, gaming_field);

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
	gm.newGame()


# buttons

$("#new_game").click(newGame)
$("#start_game_loop").click(resumeGame);
$("#stop_game_loop").click(pauseGame);

$('#game_speed_slider').change (event) ->
	setMsBetweenMoves(event.currentTarget.value)

getTeamClassFromSelection = (selectorChangeEvent) ->
	id = selectorChangeEvent.currentTarget.value
	return teams[id]

init = ()->
	visualizeTeamSelectionListInto(teams, $('#team_selection'))

$(document).ready ()->
	init()

$('#red_team_selector').ready (element) ->
	agent = teams[$('#red_team_selector')[0].value]
	gm.setTeamAAgentClass(agent)

$('#red_team_selector').change (selector) ->
	gm.setTeamAAgentClass(getTeamClassFromSelection(selector))

$('#blue_team_selector').ready (selector) ->
	agent = teams[$('#blue_team_selector')[0].value]
	gm.setTeamBAgentClass(agent)

$('#blue_team_selector').change (selector) ->
	gm.setTeamBAgentClass(getTeamClassFromSelection(selector))

console.log('ready lets rock!');