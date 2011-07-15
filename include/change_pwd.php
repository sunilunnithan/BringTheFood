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
            //   $user->new_pass($user->data['email'], $_POST); //, "signed_user");
            $user->make_hash($user->id);
            $user->save_hash();
            // $res = $user->pass_reset($_POST['email']);
            $user->new_pass($user->confirm, $_POST);
        } else {
            //$user->report("Something is wrong in your current password");
            $user->error(19);
        }
    }
            //If there is not error
    if (!$user->has_error()) {
        //A workaround to display a confirmation message in this specific  Example
        $user->error("Password Changed");
        //header("Location: myAccount.php");
        $resp  = array("success" => true, "message" => $user->error("Password Changed"));
    } else {
        $resp  = array("success" => false, "message" => $user->error("Password Did not Change"));
    }
  } else {
    $resp  =  array("success" => false);
  }

  echo json_encode($resp);

  ?>
