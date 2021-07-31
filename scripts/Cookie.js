class Cookie {
  constructor(){
    this.ping();
    this.expire_message = "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    this.check();
  }

  set(array) {
    // receives [{bucket:key,weight:value}] array
    let cEntries = this.get();
    let cPair;
    for (let i=0;i<Object.keys(array).length;i++){
      let cKey = array[i].bucket;
      let cVal = array[i].weight;
      for (let i=0; i<cEntries.length; i++){
        cPair = cEntries[i].split("="); 
        if (cPair[0].includes(cKey)){
          document.cookie = cPair[0] + this.expire_message;
        }
      }
      document.cookie = cKey + "=" + cVal + "; path=/;";
    }
  } 

  get = () => document.cookie.split(';');
  length = () => this.get().length;

  forget(key) {
    let cEntries = this.get();
    for (let i=0; i<this.length(); i++){
      let cPair = cEntries[i].split("="); 
      if (cPair[0].includes(key)) {
        document.cookie = cPair[0] + this.expire_message;
      }
    }
  }

  delete() {
    let cEntries = this.get();
    let remainder;

    for (let i=0; i<this.length(); i++){
      let cPair = cEntries[i].split("=");
      document.cookie = cPair[0] + this.expire_message;
    }
    remainder = document.cookie;
    let cPair = remainder.split("=");
    document.cookie = cPair[0] + this.expire_message;
    remainder = document.cookie;
    document.cookie = remainder + this.expire_message;
  }

  check(){
    console.log("Checking cookie...");
    console.log(document.cookie);
  }

  ping = () => console.log("I am a Cookie!");
}