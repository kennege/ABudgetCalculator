class User {
  #name;
  #password;
  #income;
  constructor(){
    this.#name = "";
    this.#password = "";
    this.#income = {};
    this.ping();
  }

  name = () => this.#name;

  income = () => this.#income;

  set(name, password) {
    this.#name = name;
    this.#password = password;
  }

  save() {
    // add username, password to cookie
  }

  check() {
    console.log("Checking user...")
    console.log("name: " + this.#name);
    console.log("income: " + this.#income);
  }

  ping = () => console.log("I am a User!");
}