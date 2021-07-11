class Settings {
  constructor(){
  this.reset();
  this.ping();
  }

  get_init_dep = () => this.init_dep;
  set_init_dep(init_dep){
    if (!isNaN(parseFloat(init_dep))){
      this.init_dep = parseFloat(init_dep);
    }
  }

  get_reg_dep = () => this.reg_dep;
  set_reg_dep(ref_dep){
    if (!isNaN(parseFloat(reg_dep))){
      this.reg_dep = parseFloat(reg_dep);
    }
  }

  get_dep_freq = () => this.dep_freq;
  set_dep_freq(dep_freq){
    if (!isNaN(parseInt(dep_freq))){
      this.dep_freq = parseInt(dep_freq);
    }
  }
  get_num_years = () => this.num_years;
  set_num_years(num_years){
    if (!isNaN(parseInt(num_years))){
      this.num_years = parseInt(num_years);
    }
  }
  get_rate = () => this.rate;
  set_rate(rate){
    if (!isNaN(parseFloat(rate))){
      this.rate = parseFloat(rate);
    }
  }
  check() {
    console.log(this.init_dep);
    console.log(this.reg_dep);
    console.log(this.dep_freq);
    console.log(this.num_years);
    console.log(this.rate);
    console.log(this.num_dep);
  }

  freq2years(dep_freq, reg_dep){
    let ratios = {
      'Yearly' : 1,
      'Monthly' : 12,
      'Fortnightly' : 26,
      'Weekly' : 52,
      'Daily' : 365
    };
    for (key in ratios){
      if (dep_freq in key) {
        this.num_dep = ratios[key] * reg_dep;
        return this.num_dep;
      }
    }
  }

  reset() {
    this.init_dep = 0;
    this.reg_dep = 0;
    this.dep_freq = 'Monthly';
    this.num_years = 10;
    this.rate = 5;
    this.num_dep = 0;
  }

  ping = () => console.log("I am Settings!");
}