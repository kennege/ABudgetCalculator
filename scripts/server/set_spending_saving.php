<?php

$name = $_POST['name'];
$password = $_POST['password'];
$n_buckets = intval($_POST['n_buckets']);
$error_message = "";

require_once "config.php";

$sql = "UPDATE spending_saving SET b1=null, b2=null, b3=null, b4=null, b5=null, b6=null, b7=null, b8=null, b9=null, b10=null WHERE username='$name'";
if (!mysqli_query($link, $sql)) {  
  $error_message = "Error deleting record: " . mysqli_error($link) . " at bucket: " . $b;
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

if (empty($error_message)){
  echo "SUCCESS";
} else {
  echo $error_message;
}

?>