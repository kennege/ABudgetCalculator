<?php
$password = $_POST['password'];
$username = $_POST['name'];

$con = mysqli_connect('127.0.0.1',$username,$password,'income');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
} else {
  echo "Connected to DB\n";
}
?>