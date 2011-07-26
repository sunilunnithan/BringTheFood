<?php

include("../config/config.php");

$resp = array();

if (count($_POST)) {
    if (!$user->signed and isset($_GET['c'])) {
        //Change password with confirmation hash
        $user->new_pass($_GET['c'], $_POST);
    } else {
        ////Change the password of signed in user without a confirmation hash
        if ($user->validate_pass($_POST['password0'])) {
            if ($user->change_pass($_POST)) {
                //Tell the user to login again
                //$user->logout();
                $resp = array("success" => true, "message" => "Your password has been updated. Please login again.");
            } else {
                $resp = array("success" => false, "message" => "Your password did not update. Please try again.");
            }
        } else {
            $resp = array("success" => false, "message" => "Your password did not update. Retype Your Current Login Password.");
            //$user->error(19);
        }
    }
} else {
    $resp = array("success" => false);
}

echo json_encode($resp);
?>
