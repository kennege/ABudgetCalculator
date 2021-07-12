class Settings {
  #init_dep;
  #reg_dep;
  #dep_freq;
  #num_years;
  #dep_per_year;
  #rate;
  constructor(){
  this.reset();
  this.ping();
  }

  get_init_dep = () => this.#init_dep;
  
  set_init_dep(init_dep){
    if (!isNaN(parseFloat(init_dep))){
      this.#init_dep = parseFloat(init_dep);
    }
  }

  get_reg_dep = () => this.#reg_dep;
  
  set_reg_dep(reg_dep){
    if (!isNaN(parseFloat(reg_dep))){
      this.#reg_dep = parseFloat(reg_dep);
    }
  }

  get_dep_freq = () => this.#dep_freq;
  
  set_dep_freq(dep_freq){
      this.#dep_freq = dep_freq;
  }
  
  get_num_years = () => this.#num_years;
  
  set_num_years(num_years){
    if (!isNaN(parseInt(num_years))){
      this.#num_years = parseInt(num_years);
    }
  }

  get_rate = () => this.#rate;

  set_rate(rate){
    if (!isNaN(parseFloat(rate))){
      this.#rate = 0.01 * parseFloat(rate);
    }
  }

  freq2years(){
    let ratios = {
      'Yearly' : 1,
      'Monthly' : 12,
      'Fortnightly' : 26,
      'Weekly' : 52,
      'Daily' : 365
    };
    for (var key in ratios){
      if (this.#dep_freq.includes(key)) {
        this.#dep_per_year = ratios[key];
        return this.#dep_per_year;
      }
    }
  }

  reset() {
    this.#init_dep = 10000;
    this.#reg_dep = 1000;
    this.#dep_freq = 'Monthly';
    this.#num_years = 10;
    this.#rate = 5;
    this.#dep_per_year = 0;
  }

  check() {
    console.log("Checking settings...");
    console.log(this.#init_dep);
    console.log(this.#reg_dep);
    console.log(this.#dep_freq);
    console.log(this.#num_years);
    console.log(this.#rate);
    console.log(this.#dep_per_year);
  }

  ping = () => console.log("I am Settings!");
}