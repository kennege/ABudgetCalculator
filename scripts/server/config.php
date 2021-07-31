<?php

define('DB_SERVER', 'remotemysql.com');
define('DB_USERNAME', '3kcTdYeFXT');
define('DB_PASSWORD', 'Iz24Odma0T');
define('DB_NAME', '3kcTdYeFXT');
 
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>