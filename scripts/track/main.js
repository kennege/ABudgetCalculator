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
    aResult.populate_table(bw_pairs, anIncome.convert);
    aResult.plot(bw_pairs);
    generate_track_box(bw_pairs);

    let history = server.load_history(allBW_pairs.length());
    if (history.length > 0) {
      // display_tracking(history);
    } else {
      // begin_tracking(bw_pairs);
    }

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
    let new_budget_entries = document.getElementsByName("budgetItem");  
    let budget_pairs = [];
    for (let i=0;i<new_budget_entries.length;i++){
      let pair = {
        bucket : new_budget_entries[i].id,
        weight : parseFloat(new_budget_entries[i].value)
      }
      budget_pairs.push(pair);
    }
    server.append_history(budget_pairs);
  });

  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    server.log_out();
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
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
      let node = document.createElement("div");
      node.style.marginLeft = "20%"
      node.style.marginRight = "20%"
      node.innerHTML = `<li class="newBudget list-group-item"> $<input name="budgetItem" 
      style='width:80px' id="${bw_pairs[i].bucket}"> ${bw_pairs[i].bucket}</li>`;    
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
