let budget_pairs = new BW_pairs();
let ss_pairs = new BW_pairs();
let history_pairs = new BW_pairs;
let date_pair = new BW_pairs;
let anIncome = new Income();
let aCookie = new Cookie();
let server = new Server();

$(document).ready(function(){
  
  let budget_box = get_by_id('display_budget');
  budget_box.style.display = "block";
  
  if (server.is_logged_in()){
    server.show_logout();
    server.send(server.get_budget_data, server.get_budget_file, get_budget_cb);
    show_by_id('track_box');
    show_by_id("category_plot_box");
  } else {
    let p = generate('p');
    p.innerText = "You must be logged in to track your budget.";
    budget_box.appendChild(p);
  }

  function get_budget_cb(server_response) {
    let budget = JSON.parse(server_response);
    budget_pairs.delete();
    for (let i=0; i<budget.length; i++){
      let current_pair = budget[i].split(":");
      if (current_pair[0].includes("income")) {
        anIncome.reset(parseFloat(current_pair[1]));
      } else if (current_pair[0].includes("period")) {
        anIncome.set_period(current_pair[1]);
      } else {
        budget_pairs.append(current_pair[0], parseFloat(current_pair[1]));
      }
    }
    if (budget_pairs.length == 0) {
      let p = generate('p');
      p.innerText = "You must save your budget before you can track it.";
      budget_box.appendChild(p);
    } else {   
      generate_track_box(budget_pairs.get());
      server.send(server.get_bw_pair_data(budget_pairs.get()), server.get_spending_saving_file, get_spending_saving_cb);
      server.send(server.get_history_data(budget_pairs.get()), server.get_history_file, get_history_cb);    
    }
    print("SERVER: Received " + budget.length + " pairs from BUDGET.\n");
  }
  
  function get_spending_saving_cb(server_response) {
    let spending_saving = JSON.parse(server_response);
    ss_pairs.delete();
    if (spending_saving[0]) {
      for (let i=0; i<spending_saving.length; i++){
        let current_pair = spending_saving[i].split(":");
        ss_pairs.append(current_pair[0], current_pair[1]);
      }
      print("SERVER: Received " + spending_saving.length + " pairs from SPENDING_SAVING.\n");
    }
  }
  
  function get_history_cb(server_response) {
    if (!server_response.includes('FAIL')) {
      let history = JSON.parse(server_response);
      let dates_array = [];   
      history_pairs.delete();
      date_pair.delete();     
      for (let i=0; i<history.length; i++){
        if (history[i] !== null) {
          if (history[i].includes(':')) { 
            let current_pair = history[i].split(":");
            let history_strs = current_pair[1].split(",");
            let history_array = [];
            for (let j=0; j<history_strs.length; j++) {
              if (history_strs[j]) {
                history_array.push(parseFloat(history_strs[j]));
              }
            }   
            history_pairs.append(current_pair[0], history_array);
          } else {
            let dates_strs = history[i].split(",");
            for (let j=0; j<dates_strs.length; j++) {
              if (dates_strs[j]) {
                dates_array.push(dates_strs[j]);
              }
            }
            date_pair.append("dates", dates_array);
          }
        }
      }
      if (date_pair.length() != 0) {
        show_by_id('plot_box');
        server.found_history(true);
        let data = sort_data(anIncome.get(), anIncome.get_period(), budget_pairs.get(), ss_pairs.get(), history_pairs.get(), date_pair.get());
        display_budget(data);
      } else {
        show_by_id('check_title');
        display_checkboxes();
      }
      print("SERVER: Received " + history.length + " history pairs from TRACKING.\n");
    } else {
      print("SERVER: No history detected in TRACKING.\n");
    }
  }

  function set_history_cb(server_response){
    if (!server_response.includes("SUCCESS")) {
      let list_div = get_by_id('list_div');
      let message = generate('p');
      message.id = "error_msg";
      message.innerText = server_response;
      list_div.appendChild(message);
      print("SERVER: Set track FAILED: " + server_response); 
    } else {
      print("SERVER: Set track SUCCEEDED");
      server.send(server.get_budget_data, server.get_budget_file, get_budget_cb); 
    }
  }

  function set_spending_saving_cb(server_response){
    if (server_response.includes("SUCCESS")) {
      print("SERVER: Set spending/saving SUCCEEDED");
    } else {
      print("SERVER: Set spending/saving FAILED: " + server_response);
    }
  }
  
  document.addEventListener('click', function(e){
    if (e.target && e.target.id == 'done_button'){
      let list_div = get_by_id('list_div');
      let error = false;
      delete_by_id("error_msg");
      
      if (!server.contains_history()) {
        update_ss_pairs(budget_pairs.get());
        if (ss_pairs.length() != budget_pairs.length()) {
          let message = generate('p');
          message.id = "error_msg";
          message.innerText = "you must select spending or saving for each category";
          list_div.appendChild(message); 
          error = true;       
        } else {
          server.send(server.set_spending_saving_data(ss_pairs.get()), server.set_spending_saving_file, set_spending_saving_cb);
        }
      }
      
      let new_budget_entries = get_by_name("budgetItem");  
      budget_pairs.delete();
      for (let i=0; i<new_budget_entries.length; i++) {
        if (!parseFloat(new_budget_entries[i].value)) {
          let message = generate('p');
          message.id = "error_msg";
          message.innerText = "empty entry detected";
          error = true;
          list_div.appendChild(message);  
          break;
        }     
      }
      if (!error) {
        for (let i=0; i<new_budget_entries.length; i++) {
          budget_pairs.append(new_budget_entries[i].id, parseFloat(new_budget_entries[i].value));
        }
        server.send(server.set_history_data(budget_pairs.get()), server.set_history_file, set_history_cb);
      }
    }  
  });

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

  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    server.log_out();
    location.reload();
  });
    
});

function update_ss_pairs(bw_pairs) {
  ss_pairs.delete();
  for (let i=0; i<bw_pairs.length; i++) {
    let saving = get_by_id(bw_pairs[i].bucket+"_save");
    let spending = get_by_id(bw_pairs[i].bucket+"_spend");
    if (!(saving.checked || spending.checked)) {
      return null;
    } else if (saving.checked) {
      ss_pairs.append(bw_pairs[i].bucket,"savings");
    } else {
      ss_pairs.append(bw_pairs[i].bucket,"spending");
    }
  }
}

function sort_data(income, period, bw_pairs, spending_saving, history, dates) {
  data = [];

  let total_savings = {};
  total_savings.bucket = "Total Savings";
  total_savings.weight = 0;
  total_savings.income = income;
  total_savings.period = period;
  total_savings.id = bw_pairs.length;
  total_savings.spending_saving = "saving";
  total_savings.history = new Array(history[0].length).fill(0);

  for (let i=0; i<bw_pairs.length; i++) {
    let bucket_info = {};
    bucket_info.bucket = bw_pairs[i].bucket;
    bucket_info.weight = bw_pairs[i].weight;
    bucket_info.income = income;
    bucket_info.period = period;
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
    if (bucket_info.spending_saving.includes("saving")) {
      total_savings.weight = total_savings.weight + bucket_info.weight;
      total_savings.dates = bucket_info.dates;
      for (let j=0; j<bucket_info.history.length;j++){
        total_savings.history[j] = total_savings.history[j] + bucket_info.history[j];
      }
    }
  }
  data.push(total_savings);
  return data;
}

