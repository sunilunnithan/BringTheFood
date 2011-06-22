<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
include ('../config/geocode.php');
include ('../cofig/config.php');
//connectToMySQL();

//function to return JSON array of available offers
function get_offers_JSON(){
$offers =mysql_query('SELECT * FROM offer') or die ('Unable to retrieve offers');
$num_offers = mysql_num_rows($offers);
if ($num_offers>0){
    $offer_JSON_Array=array();
    for ($i=0;$i<$num_offers;$i++){
            $offer_ID=mysql_result($offers, $i, 'offer_id');
            $supplier_ID=mysql_result($offers, $i, 'supplier_id');
            $description=mysql_result($offers, $i, 'description');
            $avail_date=mysql_result($offers, $i, 'available_date');
            $avial_time=mysql_result($offers, $i, 'available_time');
            $exp_date=mysql_result($offers, $i, 'expiry_date');
            //$exp_time=mysql_result($offers, $i, 'exp_time');
            $status=mysql_result($offers, $i, 'status');
            $collector_ID=mysql_result($offers, $i, 'collector_id');
            
            //make sure that it works fine with the address
            $this_supplier =mysql_query("SELECT * FROM users WHERE role ='supplier' AND user_id ='$supplier_ID'") or die ("Unable to fetch supplier");
            $name =mysql_result($supp,0,'name');
            $this_offer =array(
                'description'=>$description,
                'supplier_ID'=>$supplier_ID,
                'supplier_name'=>$name,
                'status' => $status,
                'offer_ID' => $offer_ID);
            array_push($offer_JSON_Array,$this_offer);
    }
    $offers=json_encode($offer_JSON_Array);
    //echo $offers;
    return $offers;
}
return json_encode(array());
}


//function to be invoked when supplier adds an offer.
function add_offer(){
    //cross-check with the GUI
    $supplier_ID=$_POST['sid'];
    $description =$_POST['desc'];
    $av_date =$_POST['avdate'];
    $av_time =$_POST['avtime'];
    $exp_date=$_POST['expdate'];
    $new_address=$_POST['newaddress'];
    $insert_offer=mysql_query("INSERT INTO offer (supplier_id, collector_id,description,available_date,available_time,expire_date,status) VALUES ('$supplier_ID','','$description','$av_date','$av_time','$exp_date','available')");


    if ($new_address=='yes'){
        //get the latest offer_id
        $offer_id =mysql_query("SELECT MAX(offer_id) AS latest_offer_id FROM offer");
        if ($offer_id){
            $latest_offer_id =mysql_result($offer_id, 0, 'latest_offer_id');
        }
        $street=$_POST['street'];
        $city=$_POST['city'];
        $zip=$_POST['zip'];
        $country=$_POST['country'];
        $phone=$_POST['phone'];
        //get latitude and longitude from geocode
        $insert_offer_address =mysql_query("INSERT INTO address () VALUES()");
    }
    if ($insert)
        return 1;
    else
        return -1;
}


//function to be invoked when the supplier wants to remove an offer which is still available.
function remove_offer(){
    $offer_id = $_POST['offerid'];
    $delete =mysql_query("DELETE FROM offer WHERE offer_id ='$offer_id' AND status ='available'");
    if ($delete)
        return 1;
    else
        return -1;
}

//function to be invoked when the supplier needs to update an offer
function update_offer(){
    //Cross-check with the GUI
    $offer_id=$_POST['offerid'];
    $description=$_POST['description'];
    $av_date=$_POST['avdate'];
    $av_time=$_POST['avtime'];
    $exp_date=$_POST['expdate'];
    $status=$_POST['status'];

    $update = mysql_query("UPDATE offer SET description='$description',availabl_date='$av_date', available_time ='$av_time', expiry_date='$exp_date', status='$status' WHERE offer_id='$offer_id' ");
    if ($update)
        return 1;
    else
        return -1;
}

//function to be invoked when the collector books an offer.
function book_offer(){

}

?>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Bring the Food!</title>
        <link rel="stylesheet" href="../sencha-touch-1.1.0/resources/css/sencha-touch.css" type="text/css">
        <script type="text/javascript" src="../sencha-touch-1.1.0/sencha-touch-debug.js"></script>
       <script type="text/javascript" src="js/offers.js"></script>
</head>
<body>
    <div id="panel"></div>
</body>
</html>

