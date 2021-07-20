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
    for (let i=0;i<Object.keys(array).length;i++){
      let cKey = array[i].bucket;
      let cVal = array[i].weight;
      for (let i=0; i<cEntries.length; i++){
        cPair = cEntries[i].split("="); 
        if (cPair[0].includes(cKey)){
          cVal = cPair[1];
        }
      }
      document.cookie = cKey + "=" + cVal + "; path=/;";
    }
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

  get = () => document.cookie.split(';');

  delete() {
    let cEntries = document.cookie.split(';');
    let remainder;

    for (let i=0; i<cEntries.length; i++){
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