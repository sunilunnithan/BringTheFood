<?php
	include("../config/config.php");
	$role = "";
	//If user is not signed in refirect
	if(!$user->signed) {
            header("Location: index.php");
        }else {
            foreach($user->data as $field=>$val){
                if ($field == "role") {
                    //echo $field." :". $val;
                    $role = $val;
                    break;
                }
            }
        }

?>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<title>My Account | Moving Food </title>
</head>

<body>
    <h1>You Logged As <?php echo ucfirst($role);?> </h1>
	<hr>
	
	<a href="update.php">Update Information</a>
	<a href="change_password.php">Change Password</a>
	<a href="logout.php">Logout</a>
	<table border=0>
		<tr><td></td><td></td></tr>
		<?php
			foreach($user->data as $field=>$val){
				echo "<tr><td>{$field}</td><td>=></td><td> {$val}</td></tr>";
			}
		?>
	</table>
  <?php if (strcmp($role,"collector") == 0 ) {
      //Display offers maps only if the user is a collactor.?>
      <iframe src="../map/display_map.php" width="600" height="500" align="right"> </iframe>
   <?php } ?>
</body>
</html>