let allBW_pairs = new BW_pairs();
let anIncome = new Income();
let aResult = new Result();
let aCookie = new Cookie();
let server = new Server();

function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

$(document).ready(function(){
    
  let budget_box = document.getElementById('display_budget');
  budget_box.style.display = "block";


  if (server.is_logged_in()){
    server.show_logout();
    let [income, bw_pairs] = server.load_budget();
    
    anIncome.reset(parseFloat(income));
    anIncome.set_period("fortnight");
    allBW_pairs.set(bw_pairs);
    $('#plot_box').show();
    aResult.populate_table(bw_pairs, anIncome);
    aResult.plot(bw_pairs);
    generate_track_box(bw_pairs);

    let [history, dates] = server.load_history(allBW_pairs.length());
    if (history.length != 0) {
      server.found_history(true);
      display_checkboxes();
    }
    let spending_saving = server.get_spending_saving(bw_pairs);
    let data = sort_data(bw_pairs, spending_saving, history, dates);
    display_budget(data);

  } else {
    let p = document.createElement('p');
    p.innerText = "You must be logged in to track your budget.";
    budget_box.appendChild(p);
  }


  // ensure only one plotting checkbox is selected
  // and plot for selected period
  $('.plot_ch').click(function(event) {
    for (let i = 1;i <= 10; i++)
    {
      document.getElementById("ch" + i).checked = false;
    }
    this.checked = true;
    $('#plot-container').show();
    aResult.plot(allBW_pairs.get());
  });


  $('#done_button').click(function(event) {
    let list_div = document.getElementById('list_div');
    if (document.contains(document.getElementById("error_msg"))) {
      document.getElementById("error_msg").remove();
    }
    
    if (!server.contains_history) {
      let spending_saving = get_checkboxes(allBW_pairs.get());
      if (spending_saving.length != allBW_pairs.length()) {
        let message = document.createElement('p');
        message.id = "error_msg";
        message.innerText = spending_saving;
        list_div.appendChild(message);        
      } else {
        server.set_spending_saving(spending_saving);
      }
    }
    
    let budget_pairs = [];
    let new_budget_entries = document.getElementsByName("budgetItem");  
    for (let i=0; i<new_budget_entries.length; i++) {
      allBW_pairs.append(budget_pairs, new_budget_entries[i].id, parseFloat(new_budget_entries[i].value));
    }
    let server_response = server.append_history(budget_pairs);

    if (!server_response.includes("SUCCESS")) {
      let message = document.createElement('p');
      message.id = "error_msg";
      message.innerText = server_response;
      list_div.appendChild(message);
    } else {
      let [history, dates] = server.load_history(budget_pairs.length);
      let spending_saving = server.get_spending_saving(budget_pairs);
      let data = sort_data(bw_pairs, spending_saving, history, dates);
      display_budget(data);
    }
  });


  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    server.log_out();
    location.reload();
  });
    
});

function generate_track_box(bw_pairs) {
  let article = document.getElementById('track_box');
  article.style.display = "block";
  let title = document.createElement("div");
  title.innerHTML = `<h3>Input current totals </h3>`
  article.appendChild(title);
  let div = document.createElement('div');
  div.className = "well";
  div.id = "list_div";
  let subtitle = document.createElement('div');
  subtitle.innerHTML = "<p id=check_title style='display:none'>check one: ( Saving / Spending )</p>" 
  div.appendChild(subtitle);

  for (let i=0;i<bw_pairs.length;i++){
    let node = document.createElement("div");
    node.style.marginLeft = "20%"
    node.style.marginRight = "20%"
    node.innerHTML = `<li class="newBudget list-group-item"> <p class=check style="display:none">
                      ( <input id="${bw_pairs[i].bucket}_save" type=checkbox> / <input id="${bw_pairs[i].bucket}_spend" type=checkbox> )</p>   
                      $<input name="budgetItem" style='width:80px' id="${bw_pairs[i].bucket}"> ${bw_pairs[i].bucket}</li>`;    
    div.appendChild(node); 
    article.appendChild(div);
  } 						
  let chosenBuckets = document.getElementsByClassName("newBucket");
  for (let i=0;i<chosenBuckets.length;i++){
    chosenBuckets[i].style.listStyleType = "none";
  }

  let done_button = document.createElement("button");
  done_button.innerText = "Done";
  done_button.className = "btn";
  done_button.id = "done_button";
  article.appendChild(done_button);
}

function display_checkboxes() {
  document.getElementById('check_title').style.display = "block";
  let checks = document.getElementsByClassName('check');
  for (let i=0; i<checks.length; i++) {
    checks[i].style.display = "block";
  }
}

function get_checkboxes(bw_pairs) {
  let new_bw_pairs = [];
  for (let i=0; i<bw_pairs.length; i++) {
    let saving = document.getElementById(bw_pairs[i].bucket+"_save");
    let spending = document.getElementById(bw_pairs[i].bucket+"_spend");
    if (!(saving.checked || spending.checked)) {
      return "You must choose saving/spending for each category";
    } else if (saving.checked) {
      allBW_pairs.append(new_bw_pairs, bw_pairs[i].bucket,"savings");
    } else {
      allBW_pairs.append(new_bw_pairs, bw_pairs[i].bucket,"spending");
    }
  }
  return new_bw_pairs;
}

function sort_data(bw_pairs, spending_saving, history, dates) {
  data = [];
  for (let i=0; i<bw_pairs.length; i++) {
    let bucket_info = {};
    bucket_info.bucket = bw_pairs[i].bucket;
    bucket_info.weight = bw_pairs[i].weight;
      
    for (let j=0; j<spending_saving.length; j++) { 
      if (bw_pairs[i].bucket == spending_saving[j].bucket) {
        bucket_info.spending_saving = spending_saving[j].weight;
      }
    }
    for (let j=0; j<history.length; j++) { 
      if (bw_pairs[i].bucket == history[j].bucket) {
        bucket_info.history = history[j].weight;
      }
    }
    bucket_info.dates = dates[0].weight;
    data.push(bucket_info);
  }
  return data;
}