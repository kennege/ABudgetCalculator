console.log("main loaded!")
let allBW_pairs = new BW_pairs();
let aResult = new Result();
let aBW_list = new BW_list();
let aTally = new Tally('aTally');
let anIncome = new Income();
let aCookie = new Cookie();

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

$(document).ready(function(){
  
  $('#income').focus();
  $('#plot-container').hide();
  let cookie_success;
  anIncome, allBW_pairs, cookie_success = aCookie.get(anIncome, allBW_pairs, aTally, aBW_list, aResult);
  if (cookie_success){
    $("#flotcontainer").width(  $("#plot-container").width()  )
    $('#plot-container').show();
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
        let pair = {
          bucket: checkboxes[i].value,
          weight: 0
        };     
          bw_pairs.push(pair);
      }
    }
    allBW_pairs.set(bw_pairs);
    aTally.create(bw_pairs);
    aBW_list.create(bw_pairs);
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
            node.innerHTML = '<li class=list-group-item> <input name="bucket" value="' + input + '" type="checkbox" checked>' +  input + '</li>'; 
      li.appendChild(node);    
      document.getElementById(cid).checked = false;
      document.getElementById(this.id).value = "";
    }
  });

  // button to reset tallies
  $("#tally_button").click(function(event){
    aTally.reset(allBW_pairs.get());
  });

  // button to finish assigning weights
  $("#bucket_button").click(function(event){
    let totalweight = 0;
    let new_bw_pairs = document.getElementsByName("chosenBucket");  
    let bw_pairs = [];
    let para;

    for (let i=0;i<new_bw_pairs.length;i++){
      let pair = {
        bucket : new_bw_pairs[i].id,
        weight : parseFloat(new_bw_pairs[i].value)
      }
      bw_pairs.push(pair);
      totalweight = totalweight + parseFloat(new_bw_pairs[i].value);
    }
    para = document.getElementById("weightpara");
    para.innerHTML = "<h3>Weight sum = " + totalweight.toFixed(2) + "</h3>";
    allBW_pairs.set(bw_pairs);
    allBW_pairs.check();
    anIncome.check();
    aCookie.delete();
    aCookie.set(anIncome, allBW_pairs);
    aResult.populate_table(allBW_pairs.get());
    $('#plot-container').show();
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
    aResult.plot(allBW_pairs.get());
  });

  // delete cookie and refresh page
  $("#reset_all").click(function(){
    aCookie.delete();
    console.clear();
    location.reload();
  });

});