const PLOT_COLS = 2;

function display_budget(data) { // also enter time
  show_by_id("category_plot_box");
  clear_by_id("category_plot_box");
  let n_buckets = data.length;
  let row = -1;
  for (let i=0; i<n_buckets; i++) {
    let plot_id = i - (PLOT_COLS * Math.floor(i / PLOT_COLS));
    let plot_class = lookup_plot_class(plot_id);
    if ((i % PLOT_COLS) == 0) {
      row+=1;
    }
    let plot_area_id = generate_plot_container(i, plot_class, row);
    if (data[i].spending_saving == "spending") {
      plot_spending(data[i], plot_area_id);
    } else {
      plot_savings(data[i], plot_area_id);
    }
  }
}

function plot_spending(data, plot_area_id) {
  let dates = data.dates;
  let history = data.history;
  let time; let unit; let multiplier;  
  for (let i=1;i<=10;i++)
  {
    if (get_by_id("ch" + i).checked) {
      time = get_by_id("ch" + i).name;
      unit = parseFloat(get_by_id("ch" + i).value);
      multiplier = eval(get_by_id("ch" + i).title);
    }
  }
  let date_distances = convert_dates(dates, time);
  print(date_distances);
  print(multiplier, unit, time);
  var options = {
    series:{
        stack:true,
        bars:{show: true, 
          barWidth:0.8,
        lineWidth: 0,
      }
    },
    legend:{
      position: "nw"
    },
  };

  let budget_data = [];
  for (let i=0; i<unit; i++) {
    budget_data.push([i, (data.weight * data.income * multiplier)/unit]);
  }
 
  let history_data = [];
  for (let i=0; i<date_distances.length; i++) {
    history_data.push([date_distances[i], history[i]]);
  }
  let dataset = [
    {
    label : data.bucket + " budget",
    data : budget_data,
    color : 'black'
  }, 
  {
    label : "Log",
    data : history_data,
    color : '#375e97'
  }];

  let xlabel = document.head.appendChild(generate('style'));
  xlabel.innerHTML = `#${plot_area_id}:after {content: 'Time (${time})'}`; 
  $(`#${plot_area_id}`).width(0.45*$("#plot_row_0").width())  
  $(`#${plot_area_id}`).height(0.2*$("#plot_row_0").width())   
  $.plot($(`#${plot_area_id}`), dataset, options);  
  let styleElem = generate('style');
  styleElem.style.position = "absolute";
  styleElem.style.left = "50%";
  styleElem.style.bottom = "-30px";
  // styleElem.innerHTML = `#${plot_area_id}:after {content: '$'; position: absolute; bottom: -30px; left: 50%;}`; 
  document.getElementById(plot_area_id).appendChild(styleElem);
  // ylabel.innerHTML = `#${plot_area_id}:after {content: '$'; position: absolute; bottom: -30px; left: 50%;}`; 
  // window.onresize = function(event) {
  //   $.plot($(`#${plot_area_id}`), dataset, options);  
  // }
}


function plot_savings(data, plot_area_id) { 
  let dates = data.dates;
  let history = data.history;
  let time; let unit; let multiplier;  
  for (let i=1;i<=10;i++)
  {
    if (get_by_id("ch" + i).checked) {
      time = get_by_id("ch" + i).name;
      unit = parseFloat(get_by_id("ch" + i).value);
      multiplier = eval(get_by_id("ch" + i).title);
    }
  }

  let date_distances = convert_dates(dates, time);
  let plot_data = [];
  let budget_data = [];
  budget_data.push([0,history[0]]);
  budget_data.push([unit, history[0] + (data.weight * data.income * multiplier)]);
 
  let history_data = [];
  for (let i=0; i<date_distances.length; i++) {
    history_data.push([date_distances[i], history[i]]);
  }
  plot_data = [
  {
    label : data.bucket + " budget",
    data : budget_data,
    color : 'black'
  }, 
  {
    label : "Log",
    data : history_data,
    color : '#375e97'
  }]; 
  let xlabel = document.head.appendChild(generate('style'));
  xlabel.innerHTML = `#${plot_area_id}:after {content: 'Time (${time})'`;  
  $(`#${plot_area_id}`).width(0.45*$("#plot_row_0").width())  
  $(`#${plot_area_id}`).height(0.2*$("#plot_row_0").width())  
  $.plot($(`#${plot_area_id}`), plot_data, {legend : {position: "nw"}});
//   window.onresize = function(event) {
//     $(`#${plot_area_id}`).width(0.25*$("#plot_row_0").width())  
//     $(`#${plot_area_id}`).height(0.2*$("#plot_row_0").width())      
//     $.plot($(`#${plot_area_id}`), plot_data, {legend : {position: "nw"}});
//   }
}

function convert_dates(dates, time) {
  let factor;
  switch (time) {
    case "hours": factor = 24; break;
    case "days": factor = 1; break;
    case "months": factor = 1/30; break;
    case "years": factor = 1/365; break;
    default: factor = 1/30; break;
  }
  
  let date_distances = [0];
  let initial = parse_date(dates[0]); 
  for (let i=1; i<dates.length; i++) {
    let next = parse_date(dates[i]);
    let distance_vs_time = factor * date_diff(initial, next);
    date_distances.push(distance_vs_time);
  }
  return date_distances;
}

function generate_plot_container(plot_id, plot_class, plot_row) {
  let article = get_by_id("category_plot_box");
  let row_div = "";
  if ((plot_id % PLOT_COLS) == 0) {
    row_div = generate('div');
    row_div.className = "flex-container";
    row_div.id = "plot_row_"+plot_row;
  } else {
    row_div = get_by_id("plot_row_"+plot_row);
  }
  let plot_div = generate('div');
  plot_div.style.margin = "2% 2%";
  plot_div.id = "plot_" + plot_id;
  row_div.appendChild(plot_div);
  if ((plot_id % PLOT_COLS) == 0) {
    article.appendChild(row_div);
  }
  return "plot_"+plot_id;
}

function lookup_plot_class(id) {
  let cls = "";
  switch (id) {
    case 0: cls = "flex-item-right"; break;
    case 1: cls = "flex-item-left"; break;
    default: cls = "flex-item-left";
  }
  return cls;
}