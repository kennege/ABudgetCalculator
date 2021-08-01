class User {
  #name;
  #password;
  #income;
  #period;
  #exists;
  #remember;
  #bw_pairs;
  constructor(){
    this.#name = "";
    this.#period = "";
    this.#password = "";
    this.#income = {};
    this.#exists = false;
    this.#remember = true;
    this.#bw_pairs = [];
    this.ping();
  }

  name = () => this.#name;
  password = () => this.#password;
  income = () => this.#income;
  bw_pairs = () => this.#bw_pairs;
  exists = () => this.#exists;
  remember = () => this.#remember;

  set_name (name) {
    this.#name = name;
    this.#exists = true;
  }

  set_remember = (remember) => this.#remember = remember;
  set_password  = (password) => this.#password = password;
  set_income  = (income) => this.#income = income;
  set_period  = (period) => this.#period = period;
  set_bw_pairs = (bw_pairs) => this.#bw_pairs = bw_pairs;
  
  check() {
    console.log("Checking user...")
    console.log("name: " + this.#name);
    console.log("password: " + this.#password);
  }

  ping = () => console.log("I am a User!");
}