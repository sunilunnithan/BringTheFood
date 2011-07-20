<?php
	include("../config/config.php");

        //quering user table
        $resp = Array();
        //$address_row =  $user->getRow("SELECT * FROM address WHERE user_id='{$user->id}'");

        //Proccess Update
	if(count($_POST)){

		//Add validation for custom fields, name, address
		$user->addValidation("name","0-25",'#^[a-z\s\.]+$#i');
		$user->addValidation("street","0-50");
                //Update User
                $user->update($_POST);

                //If there is not error
		if(!$user->has_error()) { //$user->update($_POST) == true){
			//Update info
			$resp = array('success' => true, 'message' => $user->error("Information Updated!"));

		}else{
			$resp = array('success' => false, 'message' => $user->error('Information Not Updated due to Error!'));
                }

        }else{
        $resp = array('success' => false,'message' => $user->error("No need to update!"));
        }
        echo $user->email; //$_POST['name'];
	echo json_encode($resp);
?>