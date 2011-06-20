<?php
	include("inc/config.php");
	
	//In is not signed
	//if($user->signed) header("Location: index.php");
	
      
        //Proccess Password change
	if(count($_POST)){
		if(!$user->signed and isset($_GET['c'])){
			//Change password with confirmation hash
			$user->new_pass($_GET['c'],$_POST);	
		}else{
			//Validate current password
                        if ($user->validate_pass($_POST[password0])){ 
                            //Change the password of signed in user without a confirmation hash 
                            $user->make_hash($user->id); $user->save_hash();
                            $user->new_pass($user->confirm,$_POST);
                        }
			else $user->error("Current password is wrong !!");
                
                }
		
		//If there is not error
		if(!$user->has_error()){
			//A workaround to display a confirmation message in this specific  Example
			$user->error("Password Changed");
                        header("Location: myAccount.php");
		}
	}else if(!$user->signed and !isset($_GET['c'])){
		//Refirect
		header("Location: index.php");
	}


 
	
?>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<title>Change Password | Moving Food </title>
</head>

<body>
	<h1>Change Password</h1>
	<hr>
	<div class="report">
		<ul>
		<?php
			if(count($_POST) and $user->has_error()){
				foreach($user->error() as $i=>$x){
					echo "<li>$x</li>";
				}
			}
		?>
		</ul>
	</div>

    <form method="post" action="">
       <?php if($user->signed) echo ' <label>Current Password:</label><span class="required">*</span> <input name="password0" type="password">'; ?>        
   
        <label>New Password:</label><span class="required">*</span>
        <input name="password" type="password">        
        
        <label>Retype New Password:</label><span class="required">*</span>
        <input name="password2" type="password">        
        
        <input value="Change" type="submit">
    </form>
    
    <a href="myAccount.php">Back to my account / Login</a>
</body>
</html>