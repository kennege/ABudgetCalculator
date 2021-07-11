settings = new Settings();

function plot(bw_pairs) { 
  
  for (let i=0;i<2;i++){
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
      if (!bw_pairs[i].bucket.includes("income")) {
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
    }
    let xlabel = document.head.appendChild(document.createElement('style'));
    xlabel.innerHTML = `#flotcontainer:before {content: 'Time (${time})'`;
    $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
  
    $('#plot_box').fadeIn(1000);
    $("#reset_all").fadeIn(1000);
  }
}

function cal_comp_int(settings){
  let P = settings.get_init_dep();
  let r = settings.get_rate();
  let n = settings.get_num_years();
}

// ensure only one frequency checkbox is selected
$('.frequency').click(function(event) {
  for (let i = 1;i <= 5; i++)
  {
    document.getElementById("c" + i).checked = false;
  }
  this.checked = true;
  settings.set_dep_freq(this.value);
  document.getElementById('dep_freq').innerText = this.value;
});

$(document).ready(function(){

  $('#init_dep').focus();

  $("#submit").click(function(event) {
    settings.set_init_dep($('#init_dep').val());
    settings.set_reg_dep($('#reg_dep').val());
    settings.set_num_years($('#num_years').val());
    settings.set_rate($('#rate').val());
    settings.check();
    cal_comp_int(settings);
    $("#plot_box").show();
    $("#reset_all").show();
  });

  $('#reset_all').click(function(event) {
    $("#plot_box").hide();
    $("#reset_all").hide();
    settings.reset();
    console.clear();
    location.reload();
  });

});

