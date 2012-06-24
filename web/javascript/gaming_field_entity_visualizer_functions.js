var visualizeEntityTypePoint = function (argument) {
  return '<div class="point" ></div>';
}

var visualizeEntityTypeAgent = function (agent) {
  var classes = ['agent', agent.getTeam()];

  var html = '<div';

  // class attr
  html += ' class= "';
  html += classes.join(" ");
  html += '">';

  // html content
  if(agent.getName){
    html += agent.getName();
  }
  
  html += '</div>';

  return html;
}
