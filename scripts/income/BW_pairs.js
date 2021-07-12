class BW_pairs {
  #bw_pairs;
  constructor(){
    this.ping();
    this.#bw_pairs = [];
  }

  set = (bw_pairs) => this.#bw_pairs = bw_pairs;

  get = () => this.#bw_pairs;

  check() {
    console.log("Checking BW pairs... ")
    for (let i=0;i<Object.keys(this.#bw_pairs).length;i++){
      console.log(this.#bw_pairs[i].bucket + ": " + this.#bw_pairs[i].weight);
    } 
  }

  ping = () => console.log("I am a BW_pair!");
}