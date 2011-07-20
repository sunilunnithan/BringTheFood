<?php

 include ('../config/config.php');


    $myaccount = Array();
    $myaddress = Array();

    $user_address_id =  $user->getRow("SELECT address_id FROM users WHERE user_id='{$user->id}'");
    $address_row =  $user->getRow("SELECT * FROM address WHERE address_id='{$user_address_id['address_id']}'");
    
    if($user->signed) {

        $myaccount = array("name" => $user->data["name"]); //$user->data;

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
        $resp =  array('success' => false, 'myaccount' => $myaccount);//do something here
    }

    $resp['myaccount'] = array(array_merge($resp['myaccount'], $myaddress));

    
    echo json_encode($resp);
?>

