class Cookie {
  constructor(){
    this.ping();
    this.check();
  }

  set(cIncome, cBW_pairs) {
    this.delete();
    let bw_pairs = cBW_pairs.get();
    let income = cIncome.get();
    let period = cIncome.get_period();
    for (let i=0;i<Object.keys(bw_pairs).length;i++){
      document.cookie = bw_pairs[i].bucket + "=" + bw_pairs[i].weight + ";";
    }
    document.cookie = "income" + "=" + income + ";";
    document.cookie = "period" + "=" + period + ";";
    this.check();
  } 

  get(cIncome, cBW_pairs, cBW_list, cResult) {
    let bw_pairs = [];
    let cEntries = document.cookie.split(';');
    let cPair;
    let bw_pair;
    this.check();

    for (let i=0; i<cEntries.length; i++){
      cPair = cEntries[i].split("=");
      if (cPair[0].includes('income')){
        cIncome.reset(parseFloat(cPair[1]));
      }   
      else if (cPair[0].includes('period')){
        cIncome.reset_period(cPair[1]);
      }   
      else if ((!cPair[0].includes('undefined')) && (!cPair[0].includes('NaN'))) {
        bw_pair = {
          bucket: cPair[0],
          weight: parseFloat(cPair[1])
        };
        bw_pairs.push(bw_pair);
      }
    }
    let cookie_success = false;
    cBW_pairs.set(bw_pairs);
    if ((cIncome.get() != 0) && (!isNaN(cIncome.get()))){ // cookie found!
      console.log("cookie found!");
      cIncome.display();   
      displayBucketTree();
      cBW_list.create(bw_pairs);
      cResult.populate_table(bw_pairs);
      $('#plot-container').show();

      cResult.plot(bw_pairs);
      cookie_success = true;
    }
    return cIncome, cBW_pairs, cookie_success;
  }

  delete() {
    let cbw_pairs = document.cookie.split(';');
    let remainder;

    for (let i=0; i<cbw_pairs.length; i++){
      let cPair = cbw_pairs[i].split("=");
      document.cookie = `${cPair[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    remainder = document.cookie;
    document.cookie = `${remainder}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  check(){
    console.log("Checking cookie...");
    console.log(document.cookie);
  }

  ping = () => console.log("I am a Cookie!");
}
