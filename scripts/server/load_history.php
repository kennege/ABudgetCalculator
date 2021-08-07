<?php
$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);
$history = array();  
$error_msg = "";

require_once "config.php";
  
// get bucket/weight pairs
$sql = "SELECT b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, dates FROM track WHERE username='$name'";
if (!mysqli_query($link, $sql, MYSQLI_ASYNC)) {  
  $error_msg = "FAIL: history not found";
}
$result = mysqli_reap_async_query($link);
$row = mysqli_fetch_assoc($result); 
for ($x = 0; $x < $n_buckets; $x++) {
  $b = "b".($x+1); 
  array_push($history, $row["$b"]);
}
array_push($history, $row["dates"]);
if (count($history)==0){
  $error_msg = "FAIL: history not found";
}
if (empty($error_msg)) {
  $json_data = json_encode($history);
  echo $json_data;
} else {
  echo $error_msg;
}

?>