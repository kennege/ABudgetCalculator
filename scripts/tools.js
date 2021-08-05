function commas(str) {
  return (str+"").replace(/.(?=(?:[0-9]{3})+\b)/g, '$&,');
}

function insertTableEntry(row, column, amount) {
  let entry = row.insertCell(column);
  entry.append(amount);
}

function parse_date(str) {
  // convert string in format d/m/y to date object
  var dmy = str.split('/');
  return new Date(dmy[0], dmy[1]-1, dmy[2]);
}

function date_diff(first, second) {
  // difference between two dates in number of days
  return Math.round((second-first)/(1000*60*60*24));
}

function get_by_id(id) {
  return document.getElementById(id);
}

function get_by_class(cls) {
  return document.getElementsByClassName(cls);
}

function get_by_name(name) {
  return document.getElementsByName(name);
}

function delete_by_id(id) {
  if (document.contains(document.getElementById(id))) {
    document.getElementById(id).remove();
  }
}

function clear_by_id(id)
{
  if (document.contains(document.getElementById(id))) {
    document.getElementById(id).innerHTML = 'Track your Budget';
  }
}

function show_by_id(id) {
  return document.getElementById(id).style.display = "block";
}

function generate(type) {
  return document.createElement(type);
}

function print(...input) {
  input.forEach(arg => console.log(arg))
}
