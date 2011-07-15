<?php

 include ('../config/config.php');


    $myaccount = Array();

    if($user->signed) {

        $myaccount = $user->data;

        /*foreach($user->data as $field=>$val){
            echo $field."  ".$val;
        }*/

        $resp = array ('success' => true, 'myaccount' => $myaccount);
        
    }else {
        $resp =  array('success' => false);//do something here
    }

    echo json_encode($resp);
?>

