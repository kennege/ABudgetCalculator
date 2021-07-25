<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);

require_once "config.php";

// check user details
$valid_user = false;
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$sql = "SELECT id, username, password FROM users WHERE username='$name'";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_assoc($result);

if((mysqli_num_rows($result)>=1) && (password_verify($password, $row['password']))) { // user exists
  
  $spending_saving = array();  
  // get bucket/weight pairs
  for ($x = 0; $x < $n_buckets; $x++) {
    $b = "b".($x+1);
    $sql = "SELECT $b FROM spending_saving WHERE username='$name'";
    $result = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($result);  
    array_push($spending_saving, $row["$b"]);
  }

  $json_data = json_encode($spending_saving);
  echo $json_data;
} else {
  echo "user does not exist";
}
mysqli_close($link);

?>