<?php
	include("../config/config.php");
	
	$user->logout();
	//header("Location: index.php");

        echo json_encode(array("success" => true));
        
?>
