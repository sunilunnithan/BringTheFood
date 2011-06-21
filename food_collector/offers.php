<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

include ('../db/DB_Connector.php');
connectToMySQL();
$offers =mysql_query('SELECT * FROM offer') or die ('Unable to retrieve offers');
$num_offers = mysql_num_rows($offer);
if ($num_offers>0){
    for ($i=0;$i<$num_offers;$i++){
            $offer_ID=mysql_result($offers, $i, 'offer_id');
            $supplier_ID=mysql_result($offers, $i, 'supplier_id');
            $descrption=mysql_result($offers, $i, 'description');
            $avail_date=mysql_result($offers, $i, 'available_date');
            $avial_time=mysql_result($offers, $i, 'available_time');
            $exp_date=mysql_result($offers, $i, 'expiry_date');
            $status=mysql_result($offers, $i, 'status');
            $collector_ID=mysql_result($offers, $i, 'collector_id');
            echo $offer_ID.','.$supplier_ID.','.$descrption.','.$avail_date.','.$avial_time.','.$exp_date.','.$exp_time.','.$status.','.$collector_ID.'<br>';
    }
}

?>
