function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function check_bw_pairs() {
  for (let i=0;i<Object.keys(bw_pairs).length;i++){
    alert(bw_pairs[i].bucket + " " + bw_pairs[i].weight);
  } 
}