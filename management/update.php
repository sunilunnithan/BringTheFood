<?php
	include("../config/config.php");
	
        //quering user table
        $user_row = $user->getRow("SELECT name, email FROM {$user->opt['table_name']} WHERE user_id='{$user->id}'");
        //querting address table
        $address_row = $user->getRow("SELECT * FROM address WHERE address_type_id='{$user->id}' && address_type='user'");
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
        <?php if ($user_row) { ?>
                 <label>Name or Company Name:</label><span class="required">*</span>
                 <input name="name" type="text" value="<?php echo $user_row['name'] ?>">
                 <label>Email: </label><span class="required">*</span>
                 <input name="email" type="text" value="<?php echo $user_row['email'] ?>">
        <?php } else { ?>
                 <label>Name or Company Name:</label><span class="required">*</span>
                 <input name="name" type="text" value="<?=@$_POST['name']?>">
                 <label>Email: </label><span class="required">*</span>
                 <input name="email" type="text" value="<?=@$_POST['email']?>">
          <?php } ?>
        <?php if ($address_row) { ?>
        <label>Street Address: </label><span class="required">*</span>
        <input name="street" type="text" value="<?php echo $address_row['street']; ?>">
        <label>City: </label><span class="required">*</span>
        <input name="city" type="text" value="<?php echo $address_row['city']; ?>">
        <label>CAP: </label><span class="required">*</span>
        <input name="zip" type="text" value="<?php echo $address_row['zip']; ?>">
        <label>County: </label><span class="required">*</span>
        <input name="country" type="text" value="<?php echo $address_row['country']; ?>">
        <label>Phone: </label><span class="required">*</span>
        <input name="phone" type="text" value="<?php echo $address_row['phone']; ?>">
          <?php } else { ?>
           <label>Street Address: </label><span class="required">*</span>
            <input name="street" type="text" value="<?=@$_POST['street']?>">
            <label>City: </label><span class="required">*</span>
            <input name="city" type="text" value="<?=@$_POST['city']?>">
            <label>CAP: </label><span class="required">*</span>
            <input name="zip" type="text" value="<?=@$_POST['zip']?>">
            <label>County: </label><span class="required">*</span>
            <input name="country" type="text" value="<?=@$_POST['country']?>">
            <label>Phone: </label><span class="required">*</span>
            <input name="phone" type="text" value="<?=@$_POST['phone']?>">
           <?php } ?>

      <!--  <label>Role: </label>
        <select name="role" value="<?=@$_POST['role']?>">
            <option value="supplier">Supplier</option>
            <option value="collector">Collector</option>
            <option value="distributor">Distributor</option>
        </select>
  -->     
        
                
        <input value="Update" type="submit">
    </form>
    
    <a href="myAccount.php">Back to my account</a>
</body>
</html>