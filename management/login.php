<?php
	include("../config/config.php");
		
	//Proccess Login
	if(count($_POST)){
	  @$username = $_POST['email'];
	  @$password = $_POST['password'];
	  @$auto = $_POST['auto'];
          @$user = new uManagement($username,$password,$auto);
	}
	
	if($user->signed) header("Location: index.php");
?>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<title>Login | Moving Food </title>
</head>

<body>
	<h1>Login</h1>
	<hr>
	
	<div class="report">
		<ul>
		<?php
			if(count($_POST)){
				foreach($user->error() as $i=>$x){
					echo "<li>$x</li>";
				}
			}
		?>
		</ul>
	</div>
	
    <form method="post" action="">
        <label>Email:</label>
        <input name="email" type="text" value="<?=@$_POST['email']?>">
        
        
        <label>Password:</label>
        <input name="password" type="password">
        
        
        <label>Remember me?:</label>
        <input name="auto" type="checkbox" style="display:inline-block">
        
        
        <input value="SignIn" type="submit">
    </form>
    
    <a href="register.php">Register a New Account</a>
    <a href="forgot.php">Forgot password?</a>
</body>
</html>