class Server {
  #directory;
  constructor(){
    this.#directory = "../scripts/server/";
    this.ping();
  }

  get_user = () => sessionStorage.getItem('name');
  get_password = () => sessionStorage.getItem('password');

  sign_up(name, password_1, password_2) {
    let response = "";
    if (this.check_passwords(password_1, password_2)) {
      let data = {
        name: name,
        password: password_1,
        confirm_password: password_2
      };      
      response = this.send_data(data, `${this.#directory}create_user.php`);
      if (response.includes('SUCCESS')){
        this.save_session(name, password_1);
      }  
    }
    return response;
  }

  log_in(name, password) {
    let data = {
      name: name,
      password: password,
    };
    let response = this.send_data(data, `${this.#directory}login.php`);
    if (response.includes('SUCCESS')){
      this.save_session(name, password);
    }
    return response;
  }

  log_out() {
    $("#load_button_div").hide();
    let data = {action:'call_this'};
    let response = this.send_data(data, `${this.#directory}logout.php`);
    sessionStorage.clear();
    this.show_login();
    return response;
  }

  save_budget(income, bw_pairs) {
    let n_buckets = Object.keys(bw_pairs).length; 
    let data = {
      name: this.get_user(),
      password: this.get_password(),
      income: income,
      n_buckets: n_buckets,
    };
    for (let i=0;i<n_buckets;i++){
      let bucket = bw_pairs[i].bucket;
      let weight = bw_pairs[i].weight;
      let bucket_name = `b${(i+1)}`;
      data[`${bucket_name}`] = `${bucket}:${weight}`;
    }
    return this.send_data(data, `${this.#directory}save_budget.php`);
  }

  load_budget() {
    let data = {
    name: this.get_user(),
    password: this.get_password()
    };
    let server_response = this.send_data(data, `${this.#directory}load_budget.php`);
    let budget = JSON.parse(server_response);
    let n_buckets = budget.length;
    let bw_pairs = [];
    let income = 0;
    for (let i=0; i<n_buckets; i++){
      let current_pair = budget[i].split(":");
      if (current_pair[0].includes("income")) {
        income = parseFloat(current_pair[1]);
      } else {
        let pair = {
          bucket: current_pair[0],
          weight: parseFloat(current_pair[1]),
        };     
        bw_pairs.push(pair);
      }
    }
    return [income, bw_pairs];
  }

  append_history(bw_pairs) {
    let data = {
      name: this.get_user(),
      password: this.get_password(),
      n_buckets: bw_pairs.length,
    };
    for (let i=0;i<n_buckets;i++){
      let bucket = bw_pairs[i].bucket;
      let weight = bw_pairs[i].weight;
      let bucket_name = `b${(i+1)}`;
      data[`${bucket_name}`] = `${bucket}:${weight}`;
    }
    let server_response = this.send_data(data, `${this.#directory}append_history.php`);
    return server_response;
  }

  load_history() {
    let data = {
      name: this.get_user(),
      password: this.get_password()
    };
    let server_response = this.send_data(data, `${this.#directory}load_history.php`);
    console.log(server_response);
    return server_response;
  }

  send_data(data, file) {
    let response = "";
    $.ajax({
      async: false,
      type: "POST",
      url: file,
      data: data,
      cache: false,
      success: function(server_response) {
        response = server_response;
      },
      error: function(server_response, status, error) {
        response = server_response;
      }
    });
    return response;
  }

  show_login() {
    $('#logout').hide();
    $('#login').show();
  }

  show_logout() {
    $('#logout').show();
    $('#login').hide();
  }

  is_logged_in() {
    let status = sessionStorage.getItem('logged_in'); 
    if (status !== null) { 
      if (status.includes("true")) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  save_session(name, password) {
    sessionStorage.setItem('logged_in', true);
    sessionStorage.setItem('name',name);
    sessionStorage.setItem('password',password);
    this.show_logout();
  }

  check_passwords(p1, p2) {
    if (p1 !== p2){
      show_popup('passwords dont match, try again');
      return false;
    } else if (p1.length < 6) {
      show_popup('password must have at least 6 characters');
      return false;
    }
    return true;  
  }

  check() {
    console.log("Checking Server...")
  }

  ping = () => console.log("I am a Server!");
}