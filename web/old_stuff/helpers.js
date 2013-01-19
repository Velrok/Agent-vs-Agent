
/*
Compares two arrays and there values.

@returns -  true if and only if both arrays that the same size and all elements
            are equal by == comparison.
*/
var arrayEqual = function (array1, array2){
  if (array1.length != array2.length){
    return false;
  }

  for (var i = 0; i < array1.length; i++){
    if (array1[i] != array2[i])
      return false;
  }

  return true;
}

/**
A list of all possible surroundings keys.
**/
var surroundingKeys = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE', 'C'];

/**
Given a position and a direction ( N, NW, W, …) it 
returns the new position.
*/
function relativeToCoordinate(pos, direction) {
  var x = 0;
  var y = 1;
  var result = [pos[x], pos[y]];
  direction.split("").forEach(function (dir) {
    if (dir == "N") result[y]++;
    if (dir == "S") result[y]--;
    if (dir == "E") result[x]++;
    if (dir == "W") result[x]--;
  });
  return result;
}

/**
Returns the direction needed to move from 
coordinate ( [x,y] ) c to coordinate c2.
*/
function coordinateToRelative(c, c2) {
  var dir = "";
  var x = 0, y = 1;
  if (c[y] < c2[y]) dir += "N";
  else if (c[y] > c2[y]) dir += "S";
  
  if(c[x] < c2[x]) dir += "E";
  else if(c[x] > c2[x]) dir += "W";
  
  if (dir == "") {
    return "C";
  } 
  return dir; 
}

/**

@param positionA - an array: [x,y]
@param positionB - an array: [x,y]

@returns - The eucledian distance between the two positions
**/
function distance(pos1, pos2){
  var x = pos1[0] - pos2[0];
  var y = pos1[1] - pos2[1];

  return Math.abs(Math.sqrt(x*x + y*y));
}

/**
@return -   a random direction.
*/
var getRandomDirection = function(){
  switch(Math.floor(Math.random() * 8)){
    case 0: return "N";
    case 1: return "NE";
    case 2: return "E";
    case 3: return "SE";
    case 4: return "S";
    case 5: return "SW";
    case 6: return "W";
    case 7: return "NW";
    default: throw "error";
  };
};