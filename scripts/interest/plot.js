function plot(settings) { 
  let n = settings.get_num_years(); 
  let totals = settings.get_totals();
  let deposits = settings.get_deposits();
  labels = ['deposits', 'total']; 

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
    hoverable: true,},
  };

  let deposit_data = GenerateData(deposits, n);
  let total_data = GenerateData(totals, n);
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
  window.onresize = function(event) {
    $.plot($("#flotcontainer"), dataset, options);  
  }

  $('#plot_box').fadeIn(1000);
  $("#reset_all").fadeIn(1000);
}

function GenerateData(input_data, n){
  let data = [];
  for(i=0;i<n;i++){ 
    data.push([i + 1, input_data[i]]);
  }
  return data;
}

function showTooltip(x, y, contents, color) {     
  $('<div id="tooltip">' + contents + '</div>').css( {
    position: 'absolute',
    width: '140px',
    display: 'none',
    'font-family': 'sans-serif',
    'font-size': '12px',
    top: y + 5,
    left: x + 5,
    'border-width': '2px',
    'border-style': 'solid',
    'border-color': color,
    padding: '4px',
    'background-color': "#eee",
    opacity: 0.90
  }).appendTo("body").fadeIn(200);
}

