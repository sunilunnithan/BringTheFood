<?php

 include ('../config/config.php');


    $myaccount = Array();
    $myaddress = Array();

    $address_row =  $user->getRow("SELECT * FROM address WHERE user_id='{$user->id}'");
    
    if($user->signed) {

        $myaccount = array("name" => $user->data["name"], "email" => $user->data['email']); //$user->data;

       /* foreach($user->data as $field=>$val){
            echo $field." :  ".$val."<br />";
        }*/

        
        $resp = array ('success' => true, 'myaccount' => $myaccount);

        if ($address_row) {
            $myaddress = array("street" => $address_row['street'],
                'city' =>$address_row['city'], 'zip' => $address_row['zip'],
                'country' => $address_row['country'], 'phone' => $address_row['phone']);
        }

       // $myaddress = Array ('myaddress' => $myadd);
        
    }else {
        $resp =  array('success' => false);//do something here
    }

    $resp = array_merge($resp, array("myaddress" =>$myaddress));
    
    echo json_encode($resp);
?>

