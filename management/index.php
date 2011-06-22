<?php
	if(!file_exists("../config/config.php")){
		header("Location: install/");
	}

	include("../config/config.php");

	if($user->signed){
		//If user is signed in redirect to myAccount
		header("Location: myAccount.php");
	}else{
		//User is not signed in redirect to login page
		header("Location: login.php");
	}
?>
<html>
<head>
	<link rel=stylesheet type=text/css href="style" />
	<title>Moving Food Demo</title>
</head>
<body>

</body>
</html>