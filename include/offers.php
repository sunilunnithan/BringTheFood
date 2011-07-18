<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
include ('../config/config.php');

//function to return JSON array of available offers
function get_offers_JSON($my_offers_only = false) {

    $offers = mysql_query("SELECT * FROM offer WHERE status<>'collected'");

    if ($my_offers_only) {
        $supplier_ID = $_SESSION['demo']['user_id'];
        $offers .= " AND supplier_id='$supplier_ID'";
    }

    $num_offers = mysql_num_rows($offers);
    if ($num_offers > 0)  {
        $offer_JSON_Array = array();
        for ($i = 0; $i < $num_offers; $i++) {
            $offer_ID = mysql_result($offers, $i, 'offer_id');
            $supplier_ID = mysql_result($offers, $i, 'supplier_id');
            $supplier_name = mysql_result(mysql_query("SELECT name FROM users WHERE user_id = $supplier_ID"), 0, 'name');
            $description = mysql_result($offers, $i, 'description');
            $avail_date = mysql_result($offers, $i, 'available_date');
            $avail_time = mysql_result($offers, $i, 'available_time');
            $exp_date = mysql_result($offers, $i, 'expire_date');
            $image = mysql_result($offers, $i, 'image');
            $people_served = mysql_result($offers, $i, 'people_served');
            $exp_time=mysql_result($offers, $i, 'expire_time');
            $status = mysql_result($offers, $i, 'status');
            $collector_ID = mysql_result($offers, $i, 'collector_id');
            if($collector_ID!=0){
            $collector_name = mysql_result(mysql_query("SELECT name FROM users WHERE user_id = $collector_ID"), 0, 'name');
            }
            else{
            $collector_name="";
            }
            //get the address of this offer
            $address_of_offer = mysql_query("SELECT * FROM address WHERE offer_id ='$offer_ID' OR user_id='$supplier_ID'");
            $street = mysql_result($address_of_offer, 0, 'street');
            $city = mysql_result($address_of_offer, 0, 'city');
            $zip = mysql_result($address_of_offer, 0, 'zip');
            $country = mysql_result($address_of_offer, 0, 'country');
            $lati = mysql_result($address_of_offer, 0, 'lat');
            $long = mysql_result($address_of_offer, 0, 'lng');

            //build the array of offer details
            $this_offer = array(
                'offer_id' => $offer_ID,
                'supplier_id' => $supplier_ID,
                'supplier_name' => $supplier_name,
                'collector_id'=>$collector_ID,
                'collector_name'=>$collector_name,
                'desc' => $description,
                'status' => $status,
                'avdate' => $avail_date,
                'avtime' => $avail_time,
                'expdate' => $exp_date,
                'image' => $image,
                'peopleserved' => $people_served,
                'street' => $street,
                'zip' => $zip,
                'city' => $city,
                'country' => $country,
                'latitude' => $lati,
                'longitude' => $long);

            array_push($offer_JSON_Array, $this_offer);
        }
        //return json array of all offers available
        return (json_encode(array('data' => $offer_JSON_Array)));
    } else
//return empty json array
        return json_encode(array('data' => array()));
}

//function to be invoked when supplier adds an offer.
function add_offer() {
    //cross-check with the GUI
    $supplier_ID = $_SESSION['demo']['user_id']; //get from session
    $description = $_POST['desc'];
    $av_date = $_POST['avdate'];
    $av_time = $_POST['avtime'];

    $exp_date = $_POST['expdate'];
    $exp_time = $_POST['exptime'];

    $image = $_POST['image']; //make a file upload here
    $people = $_POST['peopleserved'];
    $new_address = isset($_POST['newaddress']) ? $_POST['newaddress'] : false;  // Yes/No field to ask if the address is new
    $insert_offer = mysql_query("INSERT INTO offer (supplier_id, collector_id,description,available_date,available_time,expire_date,expire_time, status,image,people_served) VALUES ('$supplier_ID','','$description','$av_date','$av_time','$exp_date','$exp_time',available','$image','$people')");

    //if address of offer is new, insert the address ensuring that it corresponds to this offer
    if ($new_address) {
        //get the latest offer_id for the current supplier
        $offer_id = mysql_query("SELECT MAX(offer_id) AS latest_offer_id, supplier_id FROM offer WHERE supplier_id='$supplier_ID'");
        if ($offer_id) {
            $latest_offer_id = mysql_result($offer_id, 0, 'latest_offer_id');
            $supplier_id = mysql_result($offer_id, 0, 'supplier_id');
        }

        $street = $_POST['street'];
        $city = $_POST['city'];
        $zip = $_POST['zip'];
        $country = $_POST['country'];
        $phone = $_POST['phone'];
        //get the latitude and longitude from google map API
        $latitude_longitude = grapGeocodeInfo($street . ',' . $zip . ',' . $city . ',' . $country);
        $lat = $latitude_longitude['lat'];
        $long = $latitude_longitude['lng'];
        $insert_offer_address = mysql_query("INSERT INTO address (street,city,zip,country,phone,lat,lng,offer_id) VALUES('$street','$city','$zip','$country','$phone','$lat','$long','$latest_offer_id')");

        if ($insert_offer && $insert_offer_address)  // check both offer and address
            return 1;
        else
            return -1;
    }

    if ($insert_offer)    // just check correct insertion of offer
        return 1;
    else
        return -1;
}

//function to be invoked when the supplier wants to remove an offer which is still available.
function remove_offer() {
    $offer_id = $_POST['offerid'];
    $delete = mysql_query("DELETE FROM offer WHERE offer_id ='$offer_id' AND status ='available'");
    if ($delete)
        return 1;
    else
        return -1;
}

//function to be invoked when the supplier needs to update an offer
function update_offer() {
    //Cross-check with the GUI
    $offer_id = $_POST['offer_id'];
    $description = $_POST['desc'];
    $av_date = $_POST['avdate'];
    $av_time = $_POST['avtime'];
    $exp_date = $_POST['expdate'];
    $exp_time = $_POST['exptime'];

    $status = $_POST['status'];
    $image = $_POST['image']; //make image upload here
    $people = $_POST['peopleserved'];
    //address of an offer
    $street = $_POST['street'];
    $city = $_POST['city'];
    $zip = $_POST['zip'];
    $country = $_POST['country'];
    $phone = $_POST['phone'];

    $update_offer = mysql_query("UPDATE offer SET description='$description',available_date='$av_date', available_time ='$av_time', expire_date='$exp_date',expire_time='$exp_time', status='$status', image='$image', people_served ='$people' WHERE offer_id='$offer_id' ");

    //assuming that the offer was registered with new address at the beginning. otherwise, change of address for the supplier is done as part of account update for user.
    $update_offer_address = mysql_query("UPDATE address SET street='$street',city='$city', zip ='$zip', country='$country', phone='$phone' WHERE offer_id='$offer_id'");
    if ($update_offer && $update_offer_address)
        return 1;
    else
        return -1;
}

//function to be invoked when the collector books an offer.
function book_offer() {

    $collectorId = $_SESSION['demo']['user_id'];
    $offerId = $_GET['offerId'];
    //$date = date('d/m/y');
    //$time =date('h:m:s');
    //$insert =  mysql_query("INSERT INTO stock(offer_ID, collector_ID,collection_date,amount, remark, status) VALUES(d','$collectorId','$date','$time')") or die ('Unable to add booking'.mysql_error());
    $check = mysql_query("SELECT status from offer WHERE offer_ID='$offerId'");
    if ($check) {
        if (mysql_result($check, 0, 'status') == "available") {
            if (mysql_query("UPDATE offer SET status ='booked', collector_id='$collectorId' WHERE offer_ID ='$offerId'") )
                return 1;
            else
                return -1;
        }
        else
            return -1;
    } else {
        return -1;
    }
}

//function to unlock offer by collecter
function unlock_offer() {

    $collectorId = $_SESSION['demo']['user_id'];
    $offerId = $_GET['offerId'];
    $check = mysql_query("SELECT status from offer WHERE offer_ID='$offerId'");
    if ($check) {
        if (mysql_result($check, 0, 'status') == "booked") {
            if (mysql_query("UPDATE offer SET status ='available' WHERE offer_ID ='$offerId'"))
                return 1;
            else
                return -1;
        }
        else
            return -1;
    } else {
        return -1;
    }
}



//function to complete offer by supplier after offer is collected
function complete_offer() {

    $collectorId = $_SESSION['demo']['user_id'];
    $offerId = $_GET['offerId'];
    $check = mysql_query("SELECT status from offer WHERE offer_ID='$offerId'");
    if ($check) {
        if (mysql_result($check, 0, 'status') == "booked") {
            if (mysql_query("UPDATE offer SET status ='collected' WHERE offer_ID ='$offerId'"))
                return 1;
            else
                return -1;
        }
        else
            return -1;
    } else {
        return -1;
    }
}

if ($_GET['action'] == 'add') {
    if (add_offer() == 1) {
        echo json_encode(array('success' => true));
    }
} else if ($_GET['action'] == 'remove')
    remove_offer();
else if ($_GET['action'] == 'update') {
    if (update_offer() == 1) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
} else if ($_GET['action'] == 'view')
    echo get_offers_JSON();
else if ($_GET['action'] == 'myoffers')
    echo get_offers_JSON(true);
else if ($_GET['action'] == 'lock') {
    if (book_offer () == 1) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}

else if ($_GET['action'] == 'unlock') {
    if (unlock_offer() == 1) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}

else if ($_GET['action'] == 'complete') {
    if (complete_offer() == 1) {
        echo json_encode(array('success' => true));
    } else {
        echo json_encode(array('success' => false));
    }
}
?>

