settings = new Settings();

function plot(settings, stats) { 
  let n = settings.get_num_years(); // number of years (num_years)
  let total = stats.total;
  let deposits = stats.deposits;
  let colours = ['black','blue'];
  labels = ['deposits', 'total']; 

  function GenerateData(input_data, n){
    let data = [];
    for(i=0;i<n;i++){ 
      data.push([i + 1, input_data[i]]);
      
    }
    return data;
  }

  var options = {
    series:{
        stack:true,
        bars:{show: true, 
          barWidth:0.8,
        lineWidth: 0,
        fillColor: { colors: [ { opacity: 0.8 }, { opacity: 0.1 } ] }
      }
    },
    legend:{
      position: "nw"
    },
    grid:{
      backgroundColor: { 
        colors: ['ivory', 'white'] },
    clickable: true,
    hoverable: true,
},
  };

  let deposit_data = GenerateData(deposits, n);
  let total_data = GenerateData(total, n);
  let dataset = [
    {
    label : "deposits",
    data : deposit_data,
    color : 'black'
  }, 
  {
    label : "total",
    data : total_data,
    color : '#375e97'
  }];

  let xlabel = document.head.appendChild(document.createElement('style'));
  xlabel.innerHTML = `#flotcontainer:before {content: 'Time (years)'`;  
   $.plot($("#flotcontainer"), dataset, options);  

  // $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});

  $('#plot_box').fadeIn(1000);
  $("#reset_all").fadeIn(1000);
}

function calc_total(settings){
  let P_now = settings.get_init_dep(); // principal (init_dep)
  let P_prev = P_now;
  let r = settings.get_rate(); // interest rate (rate)
  let n = settings.get_num_years(); // number of years (num_years)
  let dep_per_year = settings.freq2years(); // deposits/year
  let dep = settings.get_reg_dep(); // amount deposited
  let A = 0;
  let running_total = [];

  for (let i=0; i<n; i++){
    A = P_now * (1 + r);
    P_prev = P_now;
    P_now += A - P_prev + (dep * dep_per_year); 
    running_total.push(P_now.toFixed(2));
  }
  return running_total;
}

function calc_deposits(settings) {
  let P = 0;
  let n = settings.get_num_years(); // number of years (num_years)
  let dep_per_year = settings.freq2years(); // deposits/year
  let dep = settings.get_reg_dep(); // amount deposited
  let running_total = [];

  for (let i=0; i<n; i++){
    P += dep * dep_per_year;
    running_total.push(P);
  }
  return running_total;
}

function calc_interest(settings, total, deposits){
  let P0 = settings.get_init_dep(); // principal (init_dep)
  let n = settings.get_num_years(); // number of years (num_years) 
  let running_total = []; 
  
  for (let i=0; i<n; i++){
    running_total.push(total[i] - deposits[i] - P0);
  }
  return running_total;
}

$(document).ready(function(){

  $('#init_dep').focus();

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

  // get inputs and plot
  $("#submit").click(function(event) {
    settings.set_init_dep($('#init_dep').val());
    settings.set_reg_dep($('#reg_dep').val());
    settings.set_num_years($('#num_years').val());
    settings.set_rate($('#rate').val());
    // settings.check();

    let total = calc_total(settings);
    let deposits = calc_deposits(settings);
    let interest = calc_interest(settings, total, deposits);
    let stats = {
      'total' : total,
      'deposits' :  deposits,
      'interest' : interest
    };
    for (let i=0; i<2; i++){
      plot(settings, stats);
    }
  });

  $('#reset_all').click(function(event) {
    $("#plot_box").hide();
    $("#reset_all").hide();
    settings.reset();
    console.clear();
    location.reload();
  });
});

