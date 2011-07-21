<?php

include("../config/config.php");

//quering user table
$resp = Array();
//$address_row =  $user->getRow("SELECT * FROM address WHERE user_id='{$user->id}'");
//Proccess Update
if (count($_POST)) {

    //Add validation for custom fields, name, address
    $user->addValidation("name", "0-45","/^\w+[\s\-\'\.\w]*$/i");
    $user->addValidation("street", "0-50");
    //Update User
    $user->update($_POST);

    //If there is not error
    if($user->update($_POST) == true){ //!$user->has_error()) { //
    //if (! $user->update($_POST)) { //$user->update($_POST) == true){
        //Update info
        $resp = array('success' => true, 'message' => "Information Updated!");
    } else {
        $resp = array('success' => false, 'message' => 'Information Not Updated!');
    }
} else {
    $resp = array('success' => false, 'message' => "No need to update!");
}
//echo $user->email; //$_POST['name'];
echo json_encode($resp);
?>