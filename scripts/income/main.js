console.log("main loaded!")
let budget_pairs = new BW_pairs();
let aResult = new Result();
let aBW_list = new BW_list();
let aTally = new Tally('aTally');
let anIncome = new Income();
let aUser = new User();
let aCookie = new Cookie();
let server = new Server();


$(document).ready(function(){
  
  $('#income').focus();
  $('#plot-container').hide();
  load();

  function load() {
    let cEntries = aCookie.get();
    budget_pairs.delete();
    let cPair;
    
    if (server.is_logged_in()){
      server.show_logout();
      $("#load_button_div").show();
    }
    
    for (let i=0; i<cEntries.length; i++){
      cPair = cEntries[i].split("=");
      if (cPair[0].includes('__income__')){
        anIncome.reset(parseFloat(cPair[1]));
      }   
      else if (cPair[0].includes('__period__')){
        anIncome.reset_period(cPair[1]);
      } 
      else if ((!cPair[0].includes('undefined')) && (!cPair[0].includes('NaN')) && (!cPair[0].includes('PHP'))) {
        budget_pairs.append(cPair[0], parseFloat(cPair[1]));
      }
    }
    if ((anIncome.get() != 0) && (!isNaN(anIncome.get()))){ 
      console.log("cookie found!");
      display_all(budget_pairs.get());
    }
  }

  function displayBucketTree(){
    $("#tree_box").fadeIn(1000); 
  }

  $('#load').click(function(event) {
    server.send(server.get_budget_data, server.get_budget_file, get_budget_cb);
  });

  function get_budget_cb(server_response) {
    let budget = JSON.parse(server_response);
    budget_pairs.delete();
    for (let i=0; i<budget.length; i++){
      let current_pair = budget[i].split(":");
      if (current_pair[0].includes("income")) {
        anIncome.reset(parseFloat(current_pair[1]));
      } else if (current_pair[0].includes("period")) {
        anIncome.reset_period(current_pair[1]);
      } else {
        budget_pairs.append(current_pair[0], parseFloat(current_pair[1]));
      }
    }
    aCookie.set(budget_pairs.get());
    aCookie.set(budget_pairs.convert('__income__', anIncome.get()));
    aCookie.set(budget_pairs.convert('__period__',anIncome.get_period()));
    display_all(budget_pairs.get());
  }

  function display_all(bw_pairs) {
    anIncome.display();   
    displayBucketTree();
    aBW_list.create(bw_pairs);
    aBW_list.pie_chart(bw_pairs);
    aTally.create(bw_pairs);
    aResult.populate_table(bw_pairs, anIncome);
    aResult.plot(bw_pairs);
    aResult.show();
    $("#button_div").fadeIn(1000);
  }
    
  // ensure only one income checkbox is selected
  $('.income_ch').click(function(event) {
    let options = ["year", "month", "fortnight", "week", "day"];
    for (let i = 0;i < 5; i++)
    {
      get_by_id(options[i]).checked = false;
    }
    this.checked = true;
    anIncome.set_period(this.id);
  });

  // button to set income
  $("#done_options").click(function(event) {
    anIncome.set(parseFloat($("#income").val()));
    anIncome.display();
    displayBucketTree();
  });

  // set income on Enter
  $("#income").keypress(function(event){
    if (event.keyCode === 13) {
      anIncome.set(parseFloat($("#income").val()));
      anIncome.display();
      displayBucketTree();
    }
  });

  // save buckets chosen from bucket tree
  $("#chosenbuckets").click(function(){
    // get chosen buckets from the bucket tree
    let checkboxes = get_by_name('bucket');
    budget_pairs.delete();
    
    for (let i=0; i<checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        budget_pairs.append(checkboxes[i].value, 0);
      }
    }
    aTally.create(budget_pairs.get());
    aBW_list.create(budget_pairs.get());
    return false;
  });
  
  // add new buckets to bucket tree
  $(".new_box").keypress(function(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      let lid = "l" + this.id.slice(1);
      let cid = "c" + this.id.slice(1);
      let input = this.value;
      let li = get_by_id(lid);
      let node = generate("div");
            node.innerHTML = '<li class=list-group-item> <input name="bucket" value="' 
            + input + '" type="checkbox" checked>' +  input + '</li>'; 
      li.appendChild(node);    
      get_by_id(cid).checked = false;
      get_by_id(this.id).value = "";
    }
  });

  // button to reset tallies
  $("#tally_button").click(function(event){
    aTally.reset(budget_pairs.get());
  });

  // button to finish assigning weights
  $("#bucket_button").click(function(event){
    let total_weight = 0;
    let new_bw_pairs = get_by_name("chosenBucket");  
    budget_pairs.delete();
    for (let i=0;i<new_bw_pairs.length;i++){
      budget_pairs.append(new_bw_pairs[i].id, parseFloat(new_bw_pairs[i].value));
      total_weight = total_weight + parseFloat(new_bw_pairs[i].value);
    }
    let para = get_by_id("weightpara");
    para.innerText = "Weight sum = " + total_weight.toFixed(2);
    aCookie.set(budget_pairs.get());
    aCookie.set(budget_pairs.convert('__income__', anIncome.get()));
    aCookie.set(budget_pairs.convert('__period__',anIncome.get_period()));
    aResult.populate_table(budget_pairs.get(), anIncome);
    $('#plot-container').show();
    $("#button_div").fadeIn(1000);
    aResult.show();
    aResult.plot(budget_pairs.get());
    aBW_list.pie_chart(budget_pairs.get());
  });

  // ensure only one plotting checkbox is selected
  // and plot for selected period
  $('.plot_ch').click(function(event) {
    for (let i = 1;i <= 10; i++)
    {
        get_by_id("ch" + i).checked = false;
    }
    this.checked = true;
    $('#plot-container').show();
    aResult.show();
    aResult.plot(budget_pairs.get());
  });

  $("#save").click(function() {
    delete_by_id("response");
    if (server.is_logged_in()){
      aUser.set_income(anIncome.get());
      aUser.set_period(anIncome.get_period());
      aUser.set_bw_pairs(budget_pairs.get());
      aCookie.delete();
      aCookie.set(budget_pairs.get());
      aCookie.set(budget_pairs.convert("__income__", anIncome.get()));
      aCookie.set(budget_pairs.convert("__period__", anIncome.get_period()));
      server.send(server.set_budget_data(anIncome.get(), anIncome.get_period(), budget_pairs.get()), server.set_budget_file, set_budget_cb);
    } else {
      let p = generate('p');
      p.id = "response";
      p.innerText = "You must be signed in to save your budget!";
      let button_div = get_by_id('button_div');
      button_div.appendChild(p);
    }
  });

  function set_budget_cb(server_response) {
    let note = "";
    if (server_response.includes("SUCCESS")) {
      print("SERVER: saving budget SUCCESS");
      note = "Budget saved!";
    }
    else {
      print("SERVER: saving budget FAILED: " + server_response);
      note = "Error! Budget not saved.";
    }
    let p = generate('p');
    p.id = "response";
    p.innerText = note;
    let button_div = get_by_id('button_div');
    button_div.appendChild(p);
  }

  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    server.log_out();
  });

  // delete cookie and refresh page
  $("#reset_all").click(function(){
    aCookie.delete();
    console.clear();
    location.reload();
  });

});