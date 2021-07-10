class BW_pairs {
  constructor(){
    this.ping();
    this.bw_pairs = [{
      bucket : "income",
      weight : 0
    }];
  }

  reset = (bw_pairs) => this.bw_pairs = bw_pairs;

  get = () => this.bw_pairs;
  

  check() {
    for (let i=0;i<Object.keys(this.bw_pairs).length;i++){
      console.log(this.bw_pairs[i].bucket + " " + this.bw_pairs[i].weight);
    } 
  }

  ping = () => console.log("I am a BW_pair!");
}