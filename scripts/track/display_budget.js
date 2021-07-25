function display_budget(bw_pairs, history, dates) {

  for (let i=0; i>bw_pairs.length; i++) {
    
  }


}


function plot(bw_pair) { 
  let unit = 1;
  let time = "";
  let multiplier = 1;
  for (let i=1;i<=10;i++)
  {
    if (document.getElementById("ch" + i).checked) {
      time = document.getElementById("ch" + i).name;
      unit = parseFloat(document.getElementById("ch" + i).value);
      multiplier = eval(document.getElementById("ch" + i).title);
    }
  }
  let data = [];
  let mult = 0;
  let colours = ['black','blue','brown','red','aqua','crimson','cyan','pink','orange','yellow','purple','grey','green'];
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    if ((i+1) % (colours.length+1) == 0){
      mult+=colours.length;
    }
    let pair = {};
    pair.label = bw_pairs[i].bucket;
    pair.data = [];
    pair.data.push([0,0]);
    pair.data.push([unit, bw_pairs[i].weight * multiplier * anIncome.get()]);
    pair.points = {symbol: "circle"};
    pair.color = colours[i - mult];
    data.push(pair);    
  }
  let xlabel = document.head.appendChild(document.createElement('style'));
  xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${time})'`;    
  $('#plot-container').show();
  $("#flotcontainer").width(  0.9*$("#plot-container").width()  )
  $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
  window.onresize = function(event) {
  $("#flotcontainer").width( 0.9* $("#plot-container").width()  )
    $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
}
}