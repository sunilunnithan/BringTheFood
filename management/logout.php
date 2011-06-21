<?php
	include("../config/config.php");
	
	$user->logout();
	header("Location: index.php");
        
?>
