<?php
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

include ('../db/DB_Connector.php');
connectToMySQL();

function get_offers_JSON(){
$offers =mysql_query('SELECT * FROM offer') or die ('Unable to retrieve offers');
$num_offers = mysql_num_rows($offers);
if ($num_offers>0){
    $offer_JSON_Array=array();
    for ($i=0;$i<$num_offers;$i++){
            $offer_ID=mysql_result($offers, $i, 'Offer_ID');
            $supplier_ID=mysql_result($offers, $i, 'supplier_ID');
            $description=mysql_result($offers, $i, 'description');
            $avail_date=mysql_result($offers, $i, 'av_date');
            $avial_time=mysql_result($offers, $i, 'av_time');
            $exp_date=mysql_result($offers, $i, 'exp_date');
            $exp_time=mysql_result($offers, $i, 'exp_time');
            $status=mysql_result($offers, $i, 'status');
            $collector_ID=mysql_result($offers, $i, 'collector_ID');
            $supp =mysql_query("SELECT name FROM supplier WHERE supplier_ID ='$supplier_ID'") or die ("Unable to fetch supplier");
            $name =mysql_result($supp,0,'name');
            $this_offer =array(
                'description'=>$description,
                'supplier_ID'=>$supplier_ID,
                'supplier_name'=>$name,
                'status' => $status,
                'offer_ID' => $offer_ID);
            array_push($offer_JSON_Array,$this_offer);
            //echo $offer_ID.','.$supplier_ID.','.$descrption.','.$avail_date.','.$avial_time.','.$exp_date.','.$exp_time.','.$status.','.$collector_ID.'<br>';
    }
    $offers=json_encode($offer_JSON_Array);
    //echo $offers;
    return $offers;
}
return json_encode(array());
}


get_offers_JSON();

?>
