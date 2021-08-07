<?php

$name = $_POST['name'];
$password = $_POST['password'];

require_once "config.php";

// Get BUDGET
$budget = array();  
$sql = "SELECT income, n_buckets, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10 FROM budget WHERE username='$name'";
mysqli_query($link, $sql, MYSQLI_ASYNC);
$result = mysqli_reap_async_query($link);
$row = mysqli_fetch_assoc($result);
$income = intval($row['income']);
$n_buckets = intval($row['n_buckets']);
array_push($budget, "income:$income");
for ($x = 0; $x < $n_buckets; $x++) {
  $b = "b".($x+1); 
  array_push($budget, $row["$b"]);
}
$json_data = json_encode($budget);
echo $json_data;

?>