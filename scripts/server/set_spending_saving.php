<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);
$error_message = "";

require_once "config.php";

// check user details
$valid_user = false;
$hashed_password = password_hash($password, PASSWORD_DEFAULT);
$sql = "SELECT id, username, password FROM users WHERE username='$name'";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_assoc($result);

if((mysqli_num_rows($result)>=1) && (password_verify($password, $row['password']))) { // user exists
  // Insert into SPENDING_SAVING
  for ($x = 0; $x < 10; $x++) { // reset 
    $b = "b".($x+1);
    $sql = "UPDATE spending_saving SET $b=null WHERE username='$name'";
    if (!mysqli_query($link, $sql)) {  
      $error_message = "Error deleting record: " . mysqli_error($link) . " at bucket: " . $b;
      break;
    }
  }
  $sql = "UPDATE spending_saving SET n_buckets='$n_buckets' WHERE username='$name'";
  if (!mysqli_query($link, $sql)) {  
    $error_message =  "Error updating n_buckets: " . mysqli_error($link);
  }
  for ($x = 0; $x < $n_buckets; $x++) { // add new
    $b = "b".($x+1);
    $bucket = $_POST["$b"];
    $sql = "UPDATE spending_saving SET $b='$bucket' WHERE username='$name'";
    if (!mysqli_query($link, $sql)) {  
      $error_message = "Error updating record: " . mysqli_error($link) . " at bucket: " . $b;
      break;
    }
  }
} else {
  $error_message = "user does not exist";
}
if (empty($error_message)){
  echo "SUCCESS";
} else {
  echo $error_message;
}
  mysqli_close($link);

?>