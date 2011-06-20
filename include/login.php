<?php

include("../config/config.php");

//Proccess Login
if (count($_POST)) {
    @$username = $_POST['email'];
    @$password = $_POST['password'];
    @$auto = $_POST['auto'];

    @$user = new uManagement($username, $password, $auto);
}

if ($user->signed){
    //header("Location: index.php");
    echo "Evviva!!";
}
?>