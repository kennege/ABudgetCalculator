

function display_budget(data) {

  for (let i=0; i<data.length; i++) {
    // if (data[i].spending_saving == "spending") {
    //   plot_spending(data, i);
    // } else {
    //   plot_saving(data, i);
    // }
    console.log(data[i]);
  }
}


function plot_savings(data, i, time) { 
  let [unit, period, factor] = convert_time(time);
  let plot_data = [];

  let budget = {};
  budget.label = "budget";
  budget.data = [];
  budget.data.push([0,0]);
  budget.data.push([unit, data[i].weight * (data[i].history[0] / factor)]);
  budget.points = {symbol: "circle"};
  budget.color = "black";
  plot_data.push(budget);    
  
  let history = {};
  history.label = "history";
  history.data = [];
  for (let i=0; i<data[i].history; i++) {
    history.data.push()
  }
  
  let colours = ['black','blue'];
  let xlabel = document.head.appendChild(document.createElement('style'));
  xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${period})'`;    
  $('#plot-container').show();
  $("#flotcontainer").width(  0.9*$("#plot-container").width()  )
  $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
  window.onresize = function(event) {
  $("#flotcontainer").width( 0.9* $("#plot-container").width()  )
    $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
  }
}

function convert_time(time) {
  let unit = period = factor = 1;
  switch(time) {
    case "day" : unit = 1; period = "day"; factor = 365; break;
    case "week" : unit = 1; period = "week"; factor = 52; break;
    case "fortnight" : unit = 1; period = "fortnight"; factor = 26; break;
    case "month" : unit = 1; period = "month"; factor = 12; break;
    case "year" : unit = 1; period = "year"; factor = 1; break;
    case "2 years" : unit = 2; period = "year"; factor = 1/2; break;
    case "5 years" : unit = 5; period = "year"; factor = 1/5; break;
    case "10 years" : unit = 10; period = "year"; factor = 1/10; break;
    case "20 years" : unit = 20; period = "year"; factor = 1/20; break;
    case "30 years" : unit = 30; period = "year"; factor = 1/30; break;
    default: unit = 1; period = "year"; factor = 1; break;
  }
  return [unit, period, factor];
}

