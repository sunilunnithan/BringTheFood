<?php

include("../config/config.php");

//if ($user->signed)
//    header("Location: index.php");

$resp = array();

//Proccess Registration
if (count($_POST)) {

    //Add validation for custom fields, name, address
    //$user->addValidation("name","0-25","/\w+/");
    $user->addValidation("name", "0-25", '#^[a-z\s\.]+$#i');
    //$user->addValidation("last_name","0-15","/\w+/");
    $user->addValidation("address", "0-50");

    //Register User
    $user->register($_POST);

    //If there is not error
    if (!$user->has_error()) {
        $resp = array('success' => true);
    } else {
        $resp = array('success' => false, 'message' => $user->error());
    }
} else {
    $resp = array('success' => false);
}

echo json_encode($resp);
?>