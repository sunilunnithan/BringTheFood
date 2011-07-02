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
    $role = $user->data['role'];

    $response = array("success" => true, "role" => $role, "id" => $user->data['user_id']);
} else {
    $response = array("success" => false);
}

echo json_encode($response);
?>