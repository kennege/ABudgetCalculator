<?php

$name = $_POST['name'];
$password = $_POST['password'];
$income = floatval($_POST['income']);
$period = $_POST['period'];
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
  // Insert into BUDGET
  $id = $row['id'];
  $sql = "UPDATE budget SET id='$id', income='$income', period='$period', n_buckets='$n_buckets'  WHERE username='$name'";
  if (!mysqli_query($link, $sql)) {  
    $error_message =  "Error updating income: " . mysqli_error($link);
  }
  $sql = "UPDATE budget SET b1=null,b2=null,b3=null,b4=null,b5=null,b6=null,b7=null,b8=null,b9=null,b10=null WHERE username='$name'";
  if (!mysqli_query($link, $sql)) {  
    $error_message = "Error deleting budget: " . mysqli_error($link);
  }
  for ($x = 0; $x < $n_buckets; $x++) { // add new budget
    $b = "b".($x+1);
    $bucket = $_POST["$b"];
    $sql = "UPDATE budget SET $b='$bucket' WHERE username='$name'";
    if (!mysqli_query($link, $sql)) {  
      $error_message = "Error updating record: " . mysqli_error($link) . " at bucket: " . $b;
      break;
    }
  }
  $sql = "UPDATE track SET b1=null,b2=null,b3=null,b4=null,b5=null,b6=null,b7=null,b8=null,b9=null,b10=null,dates=null WHERE username='$name'";
  if (!mysqli_query($link, $sql)) {  
    $error_message = "Error deleting track: " . mysqli_error($link);
  }
  for ($x = 0; $x < $n_buckets; $x++) { // initialise history
    $b = "b".($x+1);
    $new_bw_pair = explode(":",$_POST["$b"]);
    $new_bucket = $new_bw_pair[0];
    $sql = "UPDATE track SET $b='$new_bucket:' WHERE username='$name'";
    if (!mysqli_query($link, $sql)) {  
      $error_message = "Error updating record: " . mysqli_error($link) . " at bucket: " . $b;
      break;
    }
  }
  $sql = "UPDATE spending_saving SET b1=null,b2=null,b3=null,b4=null,b5=null,b6=null,b7=null,b8=null,b9=null,b10=null,n_buckets=null WHERE username='$name'";
  if (!mysqli_query($link, $sql)) {  
    $error_message = "Error deleting spending_saving: " . mysqli_error($link);
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