class Result {
  constructor(){
    this.ping();
  }

  populate_table(bw_pairs, anIncome) {
    this.bw_pairs = bw_pairs;
    // first half of bucket/income table
    let table1 = get_by_id("tbody_1");
    table1.innerHTML = "";
    for (let i=0;i<bw_pairs.length;i++){
      let row = table1.insertRow();
      insertTableEntry(row, 0, bw_pairs[i].bucket) // bucket name
      for (let j=0;j<5;j++){
        insertTableEntry(row, j+1, "$"+(anIncome.convert(bw_pairs[i].weight)[j])) 
      }    
    }
    let table_total1 = get_by_id('total1');
    table_total1.innerHTML = "";
    let row1 = table_total1.insertRow();
    insertTableEntry(row1, 0, 'Total');
    for (let j=0;j<5;j++){
      insertTableEntry(row1, j+1, "$"+(anIncome.convert(1)[j])) 
    }
   // second half of bucket/income table
   let table2 = get_by_id("tbody_2");
   table2.innerHTML = "";
   for (let i=0;i<bw_pairs.length;i++){
      let row = table2.insertRow();
      insertTableEntry(row, 0, bw_pairs[i].bucket) // bucket name
      for (let j=0;j<5;j++){
        insertTableEntry(row, j+1, "$"+(anIncome.convert(bw_pairs[i].weight)[j+5])) 
      }  
   }
   let table_total2 = get_by_id('total2');
   table_total2.innerHTML = "";
   let row2 = table_total2.insertRow();
   insertTableEntry(row2, 0, 'Total');
   for (let j=0;j<5;j++){
     insertTableEntry(row2, j+1, "$"+(anIncome.convert(1)[j+5])) 
   }
   $('#table_box').show();
  }

  plot(bw_pairs) { 
      let unit = 1;
      let time = "";
      let multiplier = 1;
      for (let i=1;i<=10;i++)
      {
        if (get_by_id("ch" + i).checked) {
          time = get_by_id("ch" + i).name;
          unit = parseFloat(get_by_id("ch" + i).value);
          multiplier = eval(get_by_id("ch" + i).title);
        }
      }
      let data = [];
      let mult = 0;
      let colours = ['black','blue','brown','red','aqua','crimson','cyan','pink','orange','yellow','purple','grey','green'];
      for (let i=0;i<bw_pairs.length;i++){
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
      $('#plot-container').show();
      $("#flotcontainer").width(  0.9*$("#plot-container").width()  )
      $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
      window.onresize = function(event) {
      $("#flotcontainer").width( 0.9* $("#plot-container").width()  )
        $.plot($("#flotcontainer"), data, {legend : {position: "nw"}});
    }
  }
  
  show() {
    $('#plot_box').show();
    $('#plot-container').show();
    $('#table_box').show();
  }

  ping = () => console.log("I am a Result!");
}

