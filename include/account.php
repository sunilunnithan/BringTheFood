<?php

    include ('../config/config.php');

    //function to be invoked when a user register
    function register() {
        $resp = array();

    //Proccess Registration
        if (count($_POST)) {
            $user->addValidation("name", "0-25", '#^[a-z\s\.]+$#i');
            $user->addValidation("address", "0-50");

            //Register User
            $user->register($_POST);

            //If there is not error
            if (!$user->has_error()) {
              //  return true;
                return array('success' => true);
            } else {
               // return false;
                return array('success' => false, 'message' => $user->error());
            }
        } else {
            //return false;
            return array('success' => false);
        }
    }

    //function to be invoked when a user updates profile
    function update() {

        //quering user table
        $resp = Array();
        $address_row = $user->getRow("SELECT * FROM address WHERE user_id='{$user->id}'");

        //Proccess Update
        if (count($_POST)) {

            //Add validation for custom fields, name, address
            $user->addValidation("name", "0-25", '#^[a-z\s\.]+$#i');
            $user->addValidation("street", "0-50");
            //Update User
            $user->update($_POST);

            //If there is not error
            if (!$user->has_error()) { //$user->update($_POST) == true){
                //Update info
                return array('success' => true, 'message' => $user->error("Information Updated!"));
                //return true;
            } else {
                //return false;
                return array('success' => false, 'message' => $user->error('Information Not Updated due to Error!'));
            }
        } else {
            //return false;
            return array('success' => false, 'message' => $user->error("No need to update!"));
        }
    }

    //function to be invoked when a user login
    function login() {

        if (count($_POST)) {
            @$username = $_POST['email'];
            @$password = $_POST['password'];
            @$auto = $_POST['auto'];
            @$user = new uManagement($username, $password, $auto);
        }

        if ($user->signed) {
            $role = $user->data['role'];
            return array("success" => true, "role" => $role, "id" => $user->data['user_id']);
        } else {
            return array("success" => false);
        }
    }

    //function to be invoked when a user logout
    function logout() {
        $user->logout();
        if ($user) {
            return true;
        } else {
            return false;
        }
    }

    //function to be invoked when a user changes a password
    function change_pass() {
        //Proccess Password change
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
                return array("success" => true, "message" => $user->error("Password Changed"));
            } else {
                return array("success" => false, "message" => $user->error("Password Did not Change"));
            }
        } else {
            return array("success" => false);
        }
        /* } else if (!$user->signed and !isset($_GET['c'])) {
          //Refirect
          header("Location: index.php");
          } */
    }

    //function to be invoked when a reset password
    function forgot() {
        //Proccess Update
        if (count($_POST)) {
            $res = $user->pass_reset($_POST['email']);
            if ($res) {
                //Hash succesfully generated
                //You would send an email to $res['email'] with the URL+HASH $res['hash'] to enter the new password
                //In this demo we will just redirect the user directly
                return array("success" => true, "result" => $res);
                //$url = "change_password.php?c=" . $res['hash'];
                //Redirect
                //header("Location: {$url}",true);		}
            } else {
                return array("success" => false);
            }
        }
    }

    //based on _GET value call one of the above functions at a time!
    //function lee() {
        if ($_GET['action'] == 'register') {
        echo json_encode(register());
        } else if ($_GET['action'] == 'login') {
        echo json_encode(login());
        } else if ($_GET['action'] == 'logout') {
        echo json_encode(logout());
        } else if ($_GET['action'] == 'update') {
        echo json_encode(update());
        } else if ($_GET['action'] == 'new_pass') {
        echo json_encode(change_pass());
        } else if ($_GET['action'] == 'forgot') {
        echo json_encode(forgot());
        }
    //}


?>

