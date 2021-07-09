class Cookie {
  constructor(){
    this.get();
  }

  get() {
    bw_pairs = [];
    let cEntries = document.cookie.split(';');
    for (let i=0; i<cEntries.length; i++){
      let cPair = cEntries[i].split("=");
      if ((!cPair[0].includes('undefined')) && (!cPair[0].includes('NaN'))) {
        let pair = {
          bucket: cPair[0],
          weight: parseFloat(cPair[1])
        };
        bw_pairs.push(pair);
      }
    }
    if ((anIncome.get() != 0) && (!isNaN(anIncome.get()))){ // cookie found!
      this.apply();
    }
  };

  set(bw_pairs) {
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      document.cookie = bw_pairs[i].bucket + "=" + bw_pairs[i].weight + ";";
    }
  } 

  apply() {
    document.getElementById('tree_box').style.display = 'block';
    document.getElementById('table_box').style.display = 'block';
    document.getElementById('plot_box').style.display = 'block';
    aBW_list.create();
    aBW_list.display()
    anIncome.write();
    anIncome.display();
    aTally.generate(bw_pairs);
    aTally.display();
    populateTable();
    drawPlot();
  }

  delete() {
    let cbw_pairs = document.cookie.split(';');
    for (let i=0; i<cbw_pairs.length; i++){
      let cPair = cbw_pairs[i].split("=");
      document.cookie = `${cPair[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
  }
}

