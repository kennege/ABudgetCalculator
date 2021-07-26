let settings = new Settings();
let server = new Server();

$(document).ready(function(){

  $('#init_dep').focus();
  $('#plot-container').hide();
  $('#table-container').hide();
  
  if (server.is_logged_in()){
    server.show_logout();
  }

  // ensure only one frequency checkbox is selected
  $('.frequency').click(function(event) {
    console.log("here");
  for (let i = 1;i <= 5; i++)
    {
      get_by_id("c" + i).checked = false;
    }
    this.checked = true;
    settings.set_dep_freq(this.value);
    get_by_id('dep_freq').innerText = this.value;
  });
  
  // get inputs and plot
  $("#submit").click(function(event) {
    settings.save();

    $('#plot-container').show();
    $('#table-container').show();
    for (let i=0; i<2; i++){
      plot(settings);
    }
    generateTable(settings);
  });

  // display data on hover
  $("#flotcontainer").bind("plothover", function (event, pos, item){
    if (item) {
      if (previousPoint != item.dataIndex) {
        previousPoint = item.dataIndex;

        $("#tooltip").remove();

        let x = item.datapoint[0];
        let y = item.datapoint[1];

        let label = "Year: " + x + "<br> Interest: $" + commas(Math.round(settings.get_interests()[x-1])) + 
          "<br> Deposits: $" + commas(Math.round(settings.get_deposits()[x-1] + settings.get_init_dep())) +  
          "<br> Total: $" + commas(Math.round(y));  

        showTooltip(item.pageX, item.pageY, label, item.series.color);
      }
    }
    else {
      $("#tooltip").remove();
      previousPoint = null;            
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