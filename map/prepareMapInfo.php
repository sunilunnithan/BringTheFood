<?php

    /*
     * To change this template, choose Tools | Templates
     * and open the template in the editor.
     * Developer: Komminist Weldemariam
     */
    include("../config/config.php");


    $street = "street";
    $lat = "lat";
    $lng = "lng";

    $status_a = "available";
    $status_l = "locked";


    //Get the id of the logged user.
    foreach ($user->data as $field => $val) {
        if ($field == "user_id") {
            $user_id = $val;
            //echo "my id is : ".$my_id;
            break;
        }
    }

    $get_offer_sql = "SELECT * FROM offer WHERE status = '{$status_a}' OR (status = '{$status_l}'AND collector_id = '{$user_id}') ";

    //Executes SQL query and checks for success: $user->check_sql

    if ($user->getRow($get_offer_sql)) {
        if (!$user->check_sql($get_offer_sql)) {
            echo "Query Faild to for the geocode, Check the SQL.";
           // $user->error(18);
        } else {
            $offers = mysql_query($get_offer_sql);
        }

        $num_rows = 0;
        //echo mysql_num_rows($offers);
        if (count($offers) >= 1) {
            while ($offer = mysql_fetch_assoc($offers)) {

                $description[] = ucfirst($offer["description"]);
                $available_date[] = $offer["available_date"];
                $available_time[] = $offer["available_time"];
                $expire_date[] = $offer["expire_date"];
                $status[] = ucfirst($offer["status"]);
                //$fist_status =  ucfirst($offer["status"]);
                //echo ucfirst($offer["status"])."<br />";;

                $supp_id = $offer["supplier_id"];
                //echo "supplier_id: ".$supp_Id;
                $get_offer_address_sql = "SELECT $street,$lat, $lng FROM address WHERE address_type_id = '{$supp_id}' ";
                //Executes SQL query and checks for success: $user->check_sql
                //echo $user->getRow($get_offer_address_sql);
                if (!$user->check_sql($get_offer_address_sql)) {
                    echo "Query Faild in fetching the geocode information. Check the SQL.";
                    $user->error(17);
                } else {
                    //$result = mysql_query($sql_2);
                    //echo "Query Faild to for the geocode, Check the SQL.";
                    $offer_address = $user->getRow($get_offer_address_sql);
                    if ($offer_address) {
                        $gstreet[] = $offer_address['street'];
                        $glat[] = $offer_address['lat'];
                        $glng[] = $offer_address['lng'];
                        $num_rows = $num_rows + 1;
                    }
                }
            }
        } else {
            echo "Nothing happened !";
        }
    } else {
        echo 'There are no avaliable offers.';
        //$user->report("There are no avaliable offers.");
    }
?>
