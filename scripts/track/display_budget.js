let PLOT_COLS = (window.innerWidth < 800) ? 1 : 2;
window.onresize = function(event) {
  PLOT_COLS = (window.innerWidth < 800) ? 1 : 2;
}

function display_budget(data) { // also enter time
  if (document.contains(document.getElementById('category_plot_box'))) {
    document.getElementById('category_plot_box').innerHTML = "";
  }
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
  let scale;  
  for (let i=1;i<=10;i++)
  {
    if (get_by_id("ch" + i).checked) {
      scale = eval(get_by_id("l" + i).title);
    }
  }
  var options = {
    series:{
        stack:true,
        bars:{show: true, 
          barWidth:0.9,
        lineWidth: 0,
      }
    },
    legend:{
      position: "nw"
    },
  };
  let period = convert_period(data.period);
  let history_bins = bin_spending(dates, history, data.weight*data.income, period);
  let budget_data = [];
  let history_data = [];
  let n_bins = Math.floor(((365/scale)/period));
  n_bins = (n_bins < 1) ? 1 : n_bins;
  for (let i=0; i<n_bins; i++) {
    budget_data.push([i, (data.weight * data.income)/period]);
    if (history_bins.length > i) {
      history_data.push([i, history_bins[i]]);
    } 
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
  xlabel.innerHTML = `#${plot_area_id}:after {content: 'Time (${data.period}s)'}`; 
  $(`#${plot_area_id}`).width((0.9/PLOT_COLS)*$("#plot_row_0").width())  
  $(`#${plot_area_id}`).height((0.4/PLOT_COLS)*$("#plot_row_0").width())   
  $.plot($(`#${plot_area_id}`), dataset, options);  
  let styleElem = generate('style');
  styleElem.style.position = "absolute";
  styleElem.style.left = "50%";
  styleElem.style.bottom = "-30px";
  document.getElementById(plot_area_id).appendChild(styleElem);
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
  $(`#${plot_area_id}`).width((0.9/PLOT_COLS)*$("#plot_row_0").width())  
  $(`#${plot_area_id}`).height((0.4/PLOT_COLS)*$("#plot_row_0").width())  
  $.plot($(`#${plot_area_id}`), plot_data, {legend : {position: "nw"}});
}

function bin_spending(dates, history, budget, period) {
  let bins = [];
  let bin = 0;
  let bin_num = 0;
  let bin_size = 365/period;
  for (let i=0; i<history.length; i++) {
    bin = bin + history[i];
    let date_distance = date_diff(parse_date(dates[0]), parse_date(dates[i]));  
    if (date_distance > (bin_num * bin_size)){
      bins.push((budget/period) - bin);
      bin_num = bin_num + 1;
      bin = 0;
    }
  }
  bins.push((budget/period) - bin);
  return bins;
}

function convert_period(period) {
  let period_scalar;
  switch (period) {
    case "year": period_scalar = 1; break;
    case "month": period_scalar = 12; break;
    case "fortnight": period_scalar = 26; break;
    case "week": period_scalar = 52; break;
    case "day": period_scalar = 365; break;
    default: period_scalar = 26; 
  }
  return period_scalar;
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

  function display_checkboxes() {
    // show_by_id('check_title');
    let checks = get_by_class('check');
    for (let i=0; i<checks.length; i++) {
      checks[i].style.display = "block";
    }
  }
  

function generate_track_box(bw_pairs) {
  let article = get_by_id('track_box');
  clear_by_id('track_box');
  let title = generate("div");
  title.innerHTML = `<h3>Input current totals </h3>`
  article.appendChild(title);
  let div = generate('div');
  div.className = "well";
  div.id = "list_div"; 
  let subtitle = generate('div');
  subtitle.innerHTML = "<p id=check_title style='display:none'>New budget detected. Check one: ( Saving / Spending ) for each category.</p>" 
  div.appendChild(subtitle);
  article.appendChild(div);

  for (let i=0;i<bw_pairs.length;i++){
    let node = generate("div");
    node.style.marginLeft = "20%"
    node.style.marginRight = "20%"
    node.innerHTML = `<li class="newBudget list-group-item"> <p class=check style="display:none">
                      ( <input id="${bw_pairs[i].bucket}_save" type=checkbox> / <input id="${bw_pairs[i].bucket}_spend" type=checkbox> )</p>   
                      $<input name="budgetItem" style='width:80px' id="${bw_pairs[i].bucket}"> ${bw_pairs[i].bucket}</li>`;    
    div.appendChild(node); 
    article.appendChild(div);
  } 						
  let chosenBuckets = get_by_class("newBucket");
  for (let i=0;i<chosenBuckets.length;i++){
    chosenBuckets[i].style.listStyleType = "none";
  }

  let done_button = generate("button");
  done_button.innerText = "Done";
  done_button.className = "btn";
  done_button.id = "done_button";
  article.appendChild(done_button);
}