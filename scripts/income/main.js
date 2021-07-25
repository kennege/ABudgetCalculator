console.log("main loaded!")
let allBW_pairs = new BW_pairs();
let aResult = new Result();
let aBW_list = new BW_list();
let anIncome = new Income();
let aUser = new User();
let aCookie = new Cookie();
let server = new Server();

function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function displayBucketTree(){
  $("#tree_box").fadeIn(1000); 
}

function displayTallies(){
  let domContainer = document.querySelector('#tally_block');
  ReactDOM.render(<Tally bw_pairs={allBW_pairs}/>, domContainer);
  $("#tally_box").fadeIn(1000); 
}

$(document).ready(function(){
  
  $('#income').focus();
  $('#plot-container').hide();
<<<<<<< HEAD
<<<<<<< HEAD
  let cookie_success;
  anIncome, allBW_pairs, cookie_success = aCookie.get(anIncome, allBW_pairs, aBW_list, aResult);
  if (cookie_success){
    $("#flotcontainer").width(  $("#plot-container").width()  )
=======
  
  let cEntries = aCookie.get();
  let bw_pairs = [];
  let cPair;
  let bw_pair;

  for (let i=0; i<cEntries.length; i++){
    cPair = cEntries[i].split("=");
    if (cPair[0].includes('__income__')){
      anIncome.reset(parseFloat(cPair[1]));
    }   
    else if (cPair[0].includes('__period__')){
      anIncome.reset_period(cPair[1]);
    } 
    else if (cPair[0].includes('__name__')) {
      aUser.set_name(cPair[1]);
=======
  load();

  function load() {
    let cEntries = aCookie.get();
    let bw_pairs = [];
    let cPair;
    
    if (server.is_logged_in()){
      server.show_logout();
      $("#load_button_div").show();
>>>>>>> fuck flot
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
        allBW_pairs.append(bw_pairs, cPair[0], parseFloat(cPair[1]));
      }
    }
    if ((anIncome.get() != 0) && (!isNaN(anIncome.get()))){ 
      console.log("cookie found!");
      allBW_pairs.set(bw_pairs);
      display_all(bw_pairs);
    }
  }

  $('#load').click(function(event) {
    let [income, bw_pairs] = server.load_budget();
    anIncome.reset(parseFloat(income));
    anIncome.reset_period("fortnight");
    allBW_pairs.set(bw_pairs);
    aCookie.set(allBW_pairs.get());
    aCookie.set(allBW_pairs.convert('__income__', anIncome.get()));
    aCookie.set(allBW_pairs.convert('__period__',anIncome.get_period()));
    display_all(bw_pairs);
  });

  function display_all(bw_pairs) {
    anIncome.display();   
    displayBucketTree();
    aBW_list.create(bw_pairs);
    aTally.create(bw_pairs);
    aResult.populate_table(bw_pairs, anIncome);
    aResult.plot(bw_pairs);
<<<<<<< HEAD
>>>>>>> general cookie
    $('#plot-container').show();
=======
    aResult.show();
>>>>>>> fuck flot
    $("#button_div").fadeIn(1000);
  }
    
  // ensure only one income checkbox is selected
  $('.income_ch').click(function(event) {
    let options = ["year", "month", "fortnight", "week", "day"];
    for (let i = 0;i < 5; i++)
    {
      document.getElementById(options[i]).checked = false;
    }
    this.checked = true;
    anIncome.set_period(this.id);
  });

  // button to set income
  $("#done_options").click(function(event) {
    anIncome.set(parseFloat($("#income").val()));
    anIncome.check();
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
    let checkboxes = document.getElementsByName('bucket');
    let bw_pairs = [];
    
    for (let i=0; i<checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        allBW_pairs.append(bw_pairs, checkboxes[i].value, 0);
      }
    }
    allBW_pairs.set(bw_pairs);
    aBW_list.create(bw_pairs);
    displayTallies();
    return false;
  });
  
  // add new buckets to bucket tree
  $(".new_box").keypress(function(event){
    if (event.keyCode === 13) {
      event.preventDefault();
      let lid = "l" + this.id.slice(1);
      let cid = "c" + this.id.slice(1);
      let input = this.value;
      let li = document.getElementById(lid);
      let node = document.createElement("div");
            node.innerHTML = '<li class=list-group-item> <input name="bucket" value="' 
            + input + '" type="checkbox" checked>' +  input + '</li>'; 
      li.appendChild(node);    
      document.getElementById(cid).checked = false;
      document.getElementById(this.id).value = "";
    }
  });

  // button to finish assigning weights
  $("#bucket_button").click(function(event){
    let total_weight = 0;
    let new_bw_pairs = document.getElementsByName("chosenBucket");  
    let bw_pairs = [];

    for (let i=0;i<new_bw_pairs.length;i++){
      allBW_pairs.append(bw_pairs, new_bw_pairs[i].id, parseFloat(new_bw_pairs[i].value));
      total_weight = total_weight + parseFloat(new_bw_pairs[i].value);
    }
    let para = document.getElementById("weightpara");
    para.innerHTML = "<h3>Weight sum = " + total_weight.toFixed(2) + "</h3>";
    allBW_pairs.set(bw_pairs);
    allBW_pairs.check();
    anIncome.check();
    aCookie.set(allBW_pairs.get());
    aCookie.set(allBW_pairs.convert('__income__', anIncome.get()));
    aCookie.set(allBW_pairs.convert('__period__',anIncome.get_period()));
    aResult.populate_table(allBW_pairs.get(), anIncome);
    $('#plot-container').show();
    $("#button_div").fadeIn(1000);
    aResult.show();
    aResult.plot(allBW_pairs.get());
  });

  // ensure only one plotting checkbox is selected
  // and plot for selected period
  $('.plot_ch').click(function(event) {
    for (let i = 1;i <= 10; i++)
    {
        document.getElementById("ch" + i).checked = false;
    }
    this.checked = true;
    $('#plot-container').show();
    aResult.show();
    aResult.plot(allBW_pairs.get());
  });

  $("#save").click(function() {
    let note = "";
    if (server.is_logged_in()){
      aUser.set_income(anIncome.get());
      aUser.set_period(anIncome.get_period());
      aUser.set_bw_pairs(allBW_pairs.get());
      let server_response = server.save_budget(anIncome.get(),allBW_pairs.get());
      if (server_response.includes("SUCCESS")) {
        note = "Budget saved!";
      }
      else {
        note = "Error! Budget not saved.";
      }
    }
    else {
      note = "You must be signed in to save your budget!";
    }
    let p = document.createElement('p');
    p.innerText = note;
    let button_div = document.getElementById('button_div');
    button_div.appendChild(p);
  });

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