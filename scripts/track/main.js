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

  if (server.is_logged_in()){
    server.show_logout();
    let [income, bw_pairs] = server.load_budget();
    let budget_box = $('#display_budget');
    anIncome.reset(parseFloat(income));
    anIncome.set_period("fortnight");
    allBW_pairs.set(bw_pairs);
    aResult.populate_table(bw_pairs);

    $('#plot-container').show();
    for (let i=0; i<2; i++){
    plot(bw_pairs);
    }
    aResult.show();
    budget_box.show();
    // let history = server.load_budget_history();
    // display_budget(income, bw_pairs);
    // if (!isEmpty(history)) {
    //   display_tracking(history);
    // } else {
    //   begin_tracking(bw_pairs);
    // }
  } else {
    let p = document.createElement('p');
    p.innerText = "You must be logged in to track your budget";
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

  $('#logoutbtn').click(function(event) {
    event.preventDefault();
    server.log_out();
  });
    
  });

  function plot(bw_pairs) { 
    for (let j=0;j<2;j++){
      let unit = 1;
      let time = "";
      let multiplier = 1;
      for (let i=1;i<=10;i++)
      {
        if (document.getElementById("ch" + i).checked) {
          time = document.getElementById("ch" + i).name;
          unit = parseFloat(document.getElementById("ch" + i).value);
          multiplier = eval(document.getElementById("ch" + i).title);
        }
      }
      let data = [];
      let mult = 0;
      let colours = ['black','blue','brown','red','aqua','crimson','cyan','pink','orange','yellow','purple','grey','green'];
      for (let i=0;i<Object.keys(bw_pairs).length;i++){
        if ((i+1) % (colours.length+1) == 0){
          mult+=colours.length;
        }
        let pair = {};
        pair.label = bw_pairs[i].bucket;
        pair.data = [];
        pair.data.push([0,0]);
        pair.data.push([unit, bw_pairs[i].weight * multiplier * anIncome.get()]);
        pair.points = {symbol: "circle"};
        pair.color = colours[i - mult];
        data.push(pair);        
      }
      let xlabel = document.head.appendChild(document.createElement('style'));
      xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${time})'`;     
        for (let i=0; i<2; i++){
          $('#plot-container').show();
        $("#flotcontainer").width(  $("#plot-container").width()  )
        $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
        window.onresize = function(event) {
        $("#flotcontainer").width(  $("#plot-container").width()  )
          $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
      }
    }
    }
  }