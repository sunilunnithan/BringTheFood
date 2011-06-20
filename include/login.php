<?php

include("../config/config.php");

//Proccess Login
if (count($_POST)) {
    @$username = $_POST['email'];
    @$password = $_POST['password'];
    @$auto = $_POST['auto'];

    @$user = new uManagement($username, $password, $auto);
}

$response = array();

if ($user->signed) {
    //header("Location: index.php");
    $response = array("success" => true);
} else {
    $response = array("success" => false);
}

echo json_encode($response);
?>