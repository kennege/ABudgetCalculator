class Server {
  constructor(){
    this.ping();
  }

  save_budget(username, password, income, bw_pairs) {
    let n_buckets = Object.keys(bw_pairs).length; 
    let data = {
      name: username,
      password: password,
      income: income,
      n_buckets: n_buckets,
    };
    for (let i=0;i<n_buckets;i++){
     let bucket = bw_pairs[i].bucket;
     let weight = bw_pairs[i].weight;
     let bucket_name = "b"+i+1;
     data[`${bucket_name}`] = `${bucket}:${weight}`;
    }
    for (const [key, value] of Object.entries(data)) {
      console.log(`${key}: ${value}`);
    }
    $.ajax({
      type: "POST",
      url: "../php/save_budget.php",
      data: data,
      cache: false,
      success: function(data) {
        console.log(data);
      },
      error: function(xhr, status, error) {
        console.error(xhr);
      }
    });
  }

  check() {
    console.log("Checking Server...")
  }

  ping = () => console.log("I am a Server!");
  
}

