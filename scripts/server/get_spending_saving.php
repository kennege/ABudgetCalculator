<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);

require_once "config.php";
 
$spending_saving = array();  
// get bucket/weight pairs
$sql = "SELECT b1, b2, b3, b4, b5, b6, b7, b8, b9, b10 FROM spending_saving WHERE username='$name'";
if (!mysqli_query($link, $sql, MYSQLI_ASYNC)) {  
  $error_msg = "FAIL: history not found";
}
$result = mysqli_reap_async_query($link);
$row = mysqli_fetch_assoc($result); 
for ($x = 0; $x < $n_buckets; $x++) {
  $b = "b".($x+1); 
  array_push($spending_saving, $row["$b"]);
}
$json_data = json_encode($spending_saving);
echo $json_data;

mysqli_close($link);

?>