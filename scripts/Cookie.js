class Cookie {
  constructor(cIncome, cTally, cBW_list, cResult, cBW_pairs){
    this.ping();
    this.get(cIncome, cTally, cBW_list, cResult, cBW_pairs);
  }

  set(bw_pairs) {
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      document.cookie = bw_pairs[i].bucket + "=" + bw_pairs[i].weight + ";";
    }
  } 

  get(cIncome, cTally, cBW_list, cResult, cBW_pairs) {
    let bw_pairs = [];
    let cEntries = document.cookie.split(';');
    var income;
    for (let i=0; i<cEntries.length; i++){
      let cPair = cEntries[i].split("=");
      if ((!cPair[0].includes('undefined')) && (!cPair[0].includes('NaN'))) {
        let pair = {
          bucket: cPair[0],
          weight: parseFloat(cPair[1])
        };
        bw_pairs.push(pair);
      }
      if (cPair[0].includes('income')){
        income = parseFloat(cPair[1]);
      }
      else {
        income = 0;
      }
    }
    bw_pairs = cIncome.set(income, bw_pairs);
    cBW_pairs.reset(bw_pairs);
    cBW_pairs.check();
    if ((cIncome.get() != 0) && (!isNaN(cIncome.get()))){ // cookie found!
      displayBucketTree();
      cBW_list.create(bw_pairs);
      cIncome.write();
      cIncome.display();   
      cTally.create(bw_pairs);
      cResult.populate_table(bw_pairs);
      cResult.plot(bw_pairs);
    }
  }

  delete() {
    let cbw_pairs = document.cookie.split(';');
    for (let i=0; i<cbw_pairs.length; i++){
      let cPair = cbw_pairs[i].split("=");
      document.cookie = `${cPair[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    let remainder = document.cookie;
    document.cookie = `${remainder}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  ping() {
    console.log("I am a Cookie!");
  }
}

