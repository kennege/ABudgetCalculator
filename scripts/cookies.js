(function getCookie() {
  bw_pairs = [];
  let cEntries = document.cookie.split(';');
  for (let i=0; i<cEntries.length; i++){
    let cPair = cEntries[i].split("=");
    if ((!cPair[0].includes('undefined')) && (!cPair[0].includes('NaN'))) {
      let pair = {
        bucket: cPair[0],
        weight: parseFloat(cPair[1])
      };
      bw_pairs.push(pair);
    }
  }
  if ((get_income() != 0) && (!isNaN(get_income()))){ // cookie found!
    applyCookie();
  }
}());

function setCookie() {
  // document.cookie = "income=" + get_income() + ";";
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    document.cookie = bw_pairs[i].bucket + "=" + bw_pairs[i].weight + ";";
  }
} 

function applyCookie() {
  document.getElementById('income').value = Math.round(get_income() / 26).toFixed(2);
  document.getElementById('setincome').innerText = `Your income is set to $${Math.round(get_income() / 26).toFixed(2)}`
  document.getElementById('income_table').style.display = 'block';
  document.getElementById('tree_box').style.display = 'block';
  document.getElementById('bucket_box').style.display = 'block';
  document.getElementById('tally_box').style.display = 'block';
  document.getElementById('table_box').style.display = 'block';
  document.getElementById('plot_box').style.display = 'block';
  populateIncomeTable();
  generateTallies();
  createBucketList();
  populateTable();
  drawPlot();
}

function deleteCookie() {
  let cbw_pairs = document.cookie.split(';');
  for (let i=0; i<cbw_pairs.length; i++){
    let cPair = cbw_pairs[i].split("=");
    document.cookie = `${cPair[0]}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}