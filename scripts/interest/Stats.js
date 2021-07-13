class Stats {
  #stats;
  constructor(){
  this.ping();
  this.#stats = {};
  }

set = (stats) => this.#stats = stats;

get = () => this.#stats;

check() {
  console.log("Checking settings...");
  console.log(this.#stats.total);
  console.log(this.#stats.interest);
  console.log(this.#stats.deposits);
}

ping = () => console.log("I am Stat!");

};