<?php
	include("inc/config.php");
	
	//Proccess Update
	if(count($_POST)){
		
		foreach($_POST as $name=>$val){
			if($user->data[$name] == $val){
			
				unset($_POST[$name]);
			}		
		}

                
		//Add validation for custom fields, name, address
		//$user->addValidation("name","0-25","/\w+/");
                $user->addValidation("name","0-25",'#^[a-z\s\.]+$#i');
		//$user->addValidation("last_name","0-15","/\w+/");
		$user->addValidation("address","0-50");

		if(count($_POST)){
			//Update info
			$user->update($_POST);			
		}else{
			$user->error("No need to update!");
		}
		
		//If there is not error
		if(!$user->has_error()){
			//A workaround to display a confirmation message in this specific  Example
			$user->error("Information Updated!");
		}
	}
	
?>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css" />
	<title>Update | Moving Food</title>
</head>

<body>
	<h1>Update</h1>
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
        <label>Name or Company Name:</label><span class="required">*</span>
        <input name="name" type="text" value="<?=@$_POST['name']?>">


        <label>Password:</label><span class="required">*</span>
        <input name="password" type="password" value="<?=@$_POST['password']?>">


        <label>Re-enter Password:</label><span class="required">*</span>
        <input name="password2" type="password" value="<?=@$_POST['password2']?>">


        <label>Email: </label><span class="required">*</span>
        <input name="email" type="text" value="<?=@$_POST['email']?>">

        <label>Street Address: </label><span class="required">*</span>
        <input name="street" type="text" value="<?=@$_POST['street']?>">
        <label>City: </label><span class="required">*</span>
        <input name="city" type="text" value="<?=@$_POST['city']?>">
        <label>CAP: </label><span class="required">*</span>
        <input name="zip" type="text" value="<?=@$_POST['zip']?>">
        <label>County: </label><span class="required">*</span>
        <input name="country" type="text" value="<?=@$_POST['province']?>">
        <label>Phone: </label><span class="required">*</span>
        <input name="phone" type="text" value="<?=@$_POST['phone']?>">

        <label>Role: </label>
        <select name="role" value="<?=@$_POST['role']?>">
            <option value="supplier">Supplier</option>
            <option value="collector">Collector</option>
            <option value="distributor">Distributor</option>
        </select>
        <br>
        
                
        <input value="Update" type="submit">
    </form>
    
    <a href="myAccount.php">Back to my account</a>
</body>
</html>