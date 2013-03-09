class GamingField
	constructor: (width, height)->
		@width = width
		@height = height
		@pieces = {}

	add: (piece, coordinates)->
		x = coordinates[0] % @width
		y = coordinates[1] % @height
		location = [x, y]
		if not @pieces[location]?
			@pieces[location] = []
		(@pieces[location]).push(piece)
		console.log @pieces[location]

	getWidth: ()->
		@width

	getHeight: ()->
		@height


window.GamingField = GamingField