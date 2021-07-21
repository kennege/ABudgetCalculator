<?php
$password = $_POST['password'];
$name = $_POST['name'];
$email = $_POST['email'];


$con = mysqli_connect('127.0.0.1',$name,$password,'income');
if (!$con) {
  die('Could not connect: ' . mysqli_error($con));
}

echo "Connected to DB\n";





// sql to create table
$sql = "CREATE TABLE '$name' (
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(50),
  name VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  income FLOAT(10),
  reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )";
  
  if ($con->query($sql) === TRUE) {
    echo "Table " . $name . " created successfully";
  } else {
    echo "Error creating table: " . $con->error;
  }
  
  $con->close();
?>