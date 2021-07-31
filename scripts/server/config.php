<?php

define('DB_SERVER', 'remotemysql.com');
define('DB_USERNAME', '3kcTdYeFXT');
define('DB_PASSWORD', '3xzrfxC1Ty');
define('DB_NAME', '3kcTdYeFXT');
define('DB_PORT', '3306');
 
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT);
 
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>