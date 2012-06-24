var visualizeEntityTypePoint = function (argument) {
  return '<div class="point" ></div>';
}

var visualizeEntityTypeAgent = function (agent) {
  var classes = ['agent', agent.getTeam()];

  var html = '<div';

  // class attr
  html += ' class= "';
  html += classes.reduce(function(a,b){return a + " " + b});
  html += '">';

  // html content
  if(agent.getName){
    html += agent.getName();
  }
  
  html += '</div>';

  return html;
}
