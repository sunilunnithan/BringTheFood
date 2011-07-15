<?php

include("../config/config.php");

 $resp = Array();
 if (count($_POST)) {
     /*On Success it returns a hash (along with the email and user_id)
     which could then be use to construct the confirmation URL
     On Failure it returns false */
    $result = $user->pass_reset($_POST['email']);
    if ( $result ) {
     //Hash succesfully generated
     //You would send an email to $res['email'] with the URL+HASH $res['hash'] to enter the new password
     //In this demo we will just redirect the user directly
      $resp  = array("success" => true, "result" => $result);
    }else {
      $resp = array("success" => false);
    }
 } else {
     $resp = array("success" => false);
 }

echo json_encode($resp);

?>