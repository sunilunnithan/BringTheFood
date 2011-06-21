<?php
        $db_host = "localhost";
	$db_user = "root";
	$db_pass = "root";
	$db_name = "food_db";
	
	$db_link = mysql_connect($db_host, $db_user, $db_pass);
	$connection = mysql_select_db($db_name, $db_link);
	include('class.uManagement.php');
	$user = new uManagement();
?>
