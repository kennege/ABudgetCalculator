class Cookie {
  constructor(){
    this.ping();
    this.check();
  }

<<<<<<< HEAD:scripts/income/Cookie.js
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
=======
  set(array) {
    // receives [{bucket:key,weight:value}] array
    let cEntries = this.get();
>>>>>>> fuck flot:scripts/Cookie.js
    let cPair;
    for (let i=0;i<Object.keys(array).length;i++){
      let cKey = array[i].bucket;
      let cVal = array[i].weight;
      for (let i=0; i<cEntries.length; i++){
        cPair = cEntries[i].split("="); 
        if (cPair[0].includes(cKey)){
          document.cookie = cPair[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
        }
      }
      document.cookie = cKey + "=" + cVal + "; path=/;";
    }
<<<<<<< HEAD:scripts/income/Cookie.js
    let cookie_success = false;
    cBW_pairs.set(bw_pairs);
    if ((cIncome.get() != 0) && (!isNaN(cIncome.get()))){ // cookie found!
      console.log("cookie found!");
      cIncome.display();   
      displayBucketTree();
      displayTallies();
      cBW_list.create(bw_pairs);
      cResult.populate_table(bw_pairs);
      $('#plot-container').show();
=======
  } 
>>>>>>> fuck flot:scripts/Cookie.js

  get = () => document.cookie.split(';');
  length = () => this.get().length;

  forget(key) {
    let cEntries = this.get();
    for (let i=0; i<this.length(); i++){
      let cPair = cEntries[i].split("="); 
      if (cPair[0].includes(key)) {
        document.cookie = cPair[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      }
    }
  }

  delete() {
    let cEntries = this.get();
    let remainder;

    for (let i=0; i<this.length(); i++){
      let cPair = cEntries[i].split("=");
      document.cookie = cPair[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }
    remainder = document.cookie;
    let cPair = remainder.split("=");
    document.cookie = cPair[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    remainder = document.cookie;
    document.cookie = remainder + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }

  check(){
    console.log("Checking cookie...");
    console.log(document.cookie);
  }

  ping = () => console.log("I am a Cookie!");
}