const plot_cols = 3;

function display_budget(data) { // also enter time
  show_by_id("category_plot_box");
  let n_buckets = data.length;
  let plot_rows = Math.ceil(n_buckets / plot_cols);

  for (let i=0; i<n_buckets; i++) {
    let plot_id = i - (plot_cols * Math.floor(i / plot_cols));
    let plot_class = lookup_plot_class(plot_id);
    let plot_area_id = generate_plot_container(plot_id, plot_class, plot_rows);
    console.log(plot_area_id);
    // if (data[i].spending_saving == "spending") {
    //   plot_spending(data, i);
    // } else {
    //   plot_saving(data[i], time, plot_div_id);
    // }
    console.log(data[i]);
  }
}


function plot_savings(data, time, plot_area_id) { 
  let dates = data.dates;
  let history = dates.history;
  let [step, period, factor] = convert_time(time);
  let date_distances = convert_dates(dates);
  let plot_data = [];

  let budget_data = [];
  budget_data.push([0,history[0]]);
  budget_data.push([step, data.weight * (data.history[0] / factor)]);
  
  history_data = [];
  history_data.push([0,history[0]]);
  for (let i=0; i<date_distances.length; i++) {
    history.data.push([date_distances[i], history[i]]);
  }

  plot_data = [
  {
    label : "budget",
    data : budget_data,
    color : 'black'
  }, 
  {
    label : "history",
    data : history,
    color : '#375e97'
  }];
  
  let xlabel = document.head.appendChild(generate('style'));
  xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${period})'`;    
  $.plot($(`#${plot_area_id}`), plot_data, {legend : {position: "nw"}});
  window.onresize = function(event) {
    $.plot($(`#${plot_area_id}`), plot_data, {legend : {position: "nw"}});
  }
}

function convert_time(time) {
  let step = period = factor = 1;
  switch(time) {
    case "day" : step = 1; period = "day"; factor = 365; break;
    case "week" : step = 1; period = "week"; factor = 52; break;
    case "fortnight" : step = 1; period = "fortnight"; factor = 26; break;
    case "month" : step = 1; period = "month"; factor = 12; break;
    case "year" : step = 1; period = "year"; factor = 1; break;
    case "2 years" : step = 2; period = "year"; factor = 1/2; break;
    case "5 years" : step = 5; period = "year"; factor = 1/5; break;
    case "10 years" : step = 10; period = "year"; factor = 1/10; break;
    case "20 years" : step = 20; period = "year"; factor = 1/20; break;
    case "30 years" : step = 30; period = "year"; factor = 1/30; break;
    default: step = 1; period = "year"; factor = 1; break;
  }
  return [step, period, factor];
}

function convert_dates(dates, step, period, factor) {
  let date_distances = [];
  let initial = parse_date(dates[0]); 
  for (let i=1; i<dates.length; i++) {
    let next = parse_date(dates[i]);
    let distance_in_years = date_diff(initial, next) / 365;
    date_distances.push(distance_in_years);
  }
  return date_distances;
}

function generate_plot_container(plot_id, plot_class, plot_row) {
  let article = get_by_id("category_plot_box");
  let row_div = "";
  if ((plot_id % plot_cols) == 0) {
    row_div = generate('div');
    row_div.className = "flex-container";
    row_div.id = "plot_row_"+plot_row;
  } else {
    row_div = get_by_id("plot_row_"+plot_row);
  }
  let plot_div = generate('div');
  plot_div.className = plot_class;
  plot_div.id = "plot_"+plot_id;
  row_div.appendChild(plot_div);
  article.appendChild(row_div);
  return "plot_"+plot_id;
}

function lookup_plot_class(id) {
  let cls = "";
  switch (id) {
    case 0: cls = "flex-item-left"; break;
    case 1: cls = "flex-item-center"; break;
    case 2: cls = "flex-item-right"; break;
    default: cls = "flex-item-left";
  }
  return cls;
}