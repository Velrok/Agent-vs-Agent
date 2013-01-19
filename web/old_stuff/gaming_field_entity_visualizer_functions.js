var visualizeEntityTypePoint = function (argument) {
  return '<div class="point" ></div>';
}

var visualizeEntityTypeAgent = function (agent) {
  var classes = ['agent'];

  if(agent.hasPoint()){
    classes.push(agent.getTeam() + "_got_point");
  } else {
    classes.push(agent.getTeam());
  }

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
