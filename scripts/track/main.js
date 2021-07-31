let allBW_pairs = new BW_pairs();
let anIncome = new Income();
let aCookie = new Cookie();
let server = new Server();

$(document).ready(function(){
    
  let budget_box = get_by_id('display_budget');
  budget_box.style.display = "block";


  if (server.is_logged_in()){
    server.show_logout();
    let [income, bw_pairs] = server.load_budget();
    
    anIncome.reset(parseFloat(income));
    anIncome.set_period("fortnight");
    allBW_pairs.set(bw_pairs);
    generate_track_box(bw_pairs);

    if (bw_pairs.length == 0) {
      let p = generate('p');
      p.innerText = "You must save your budget before you can track it.";
      budget_box.appendChild(p);
    } else {   
      show_by_id('track_box');
      anIncome.reset(parseFloat(income));
      anIncome.set_period("fortnight");
      allBW_pairs.set(bw_pairs);
      generate_track_box(bw_pairs);

      let [history, dates] = server.load_history(allBW_pairs.length());
      if (dates.length != 0) {
        show_by_id('plot_box');
        server.found_history(true);
        let spending_saving = server.get_spending_saving(bw_pairs);
        let data = sort_data(income, bw_pairs, spending_saving, history, dates);
        display_budget(data);
      } else {
        show_by_id('check_title');
      }
      display_checkboxes();
    }
    display_checkboxes();
  } else {
    let p = generate('p');
    p.innerText = "You must be logged in to track your budget.";
    budget_box.appendChild(p);
  }

  // ensure only one plotting checkbox is selected
  // and plot for selected period
  $('.plot_ch').click(function(event) {
    for (let i = 1;i <= 10; i++)
    {
      get_by_id("ch" + i).checked = false;
    }
    this.checked = true;
    display_budget(data);
  });

  $('#done_button').click(function(event) {
    let list_div = get_by_id('list_div');
    delete_by_id("error_msg");
    
    if (!server.contains_history()) {
      let spending_saving = get_checkboxes(allBW_pairs.get());
      if (spending_saving.length != allBW_pairs.length()) {
        let message = generate('p');
        message.id = "error_msg";
        message.innerText = spending_saving;
        list_div.appendChild(message);        
      } else {
        server.set_spending_saving(spending_saving);
      }
    }
    
    let budget_pairs = [];
    let new_budget_entries = get_by_name("budgetItem");  
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
      let [income, bw_pairs] = server.load_budget();
      let [history, dates] = server.load_history(budget_pairs.length);
      if (dates.length != 0) {
        show_by_id('plot_box');
        server.found_history(true);
        let spending_saving = server.get_spending_saving(budget_pairs);
        let data = sort_data(income, bw_pairs, spending_saving, history, dates);
        display_budget(data);  
      }   
    }
  });

  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    server.log_out();
    location.reload();
  });
    
});

function generate_track_box(bw_pairs) {
  let article = get_by_id('track_box');
  show_by_id('track_box');
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

function display_checkboxes() {
  show_by_id('check_title');
  let checks = get_by_class('check');
  for (let i=0; i<checks.length; i++) {
    checks[i].style.display = "block";
  }
}

function get_checkboxes(bw_pairs) {
  let new_bw_pairs = [];
  for (let i=0; i<bw_pairs.length; i++) {
    let saving = get_by_id(bw_pairs[i].bucket+"_save");
    let spending = get_by_id(bw_pairs[i].bucket+"_spend");
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

function sort_data(income, bw_pairs, spending_saving, history, dates) {
  data = [];
  for (let i=0; i<bw_pairs.length; i++) {
    let bucket_info = {};
    bucket_info.bucket = bw_pairs[i].bucket;
    bucket_info.weight = bw_pairs[i].weight;
    bucket_info.income = income;
    bucket_info.id = i;
      
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