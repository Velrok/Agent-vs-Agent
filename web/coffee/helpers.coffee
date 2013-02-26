window.arrayEqual = (one, other)->
	if one.length != other.length
		return false

	for entry, i in one
		if entry != other[i]
			return false

	return true

window.surrondingKeys = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE', 'C']

window.relativeToCoordinate = (pos, direction)->
	[x, y] = pos
	for dir in direction.split("")
		switch dir
			when "N"
				y++
			when "S"
				y--
			when "E"
				x++
			when "W"
				x--
	return [x, y]

window.coordinateToRelative = (start, dest)->
	[startX, startY] = start
	[destX, destY] = dest
	direction = ""
	if startY < destY
		direction += "N"
	else if startY > destY
		direction += "S"

	if startX < destX
		direction += "E"
	else if startX > destX
		direction += "W"

	if direction == ""
		return "C"
	else
		return direction

window.distance = (pos1, pos2)->
	[p1X, p1Y] = pos1
	[p2X, p2Y] = pos2
	lengthX = p2X - p1X
	lengthY = p2Y - p1Y

	return Math.abs(Math.sqrt(lengthX * lengthX + lengthY * lengthY))

window.getRandomDirection = ()->
	window.surrondingKeys[Math.floor(Math.random() * 8)]
