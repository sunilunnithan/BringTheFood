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
            $offer_ID=mysql_result($offers, $i, 'Offer_ID');
            $supplier_ID=mysql_result($offers, $i, 'supplier_ID');
            $descrption=mysql_result($offers, $i, 'description');
            $avail_date=mysql_result($offers, $i, 'av_date');
            $avial_time=mysql_result($offers, $i, 'av_time');
            $exp_date=mysql_result($offers, $i, 'exp_date');
            $exp_time=mysql_result($offers, $i, 'exp_time');
            $status=mysql_result($offers, $i, 'status');
            $collector_ID=mysql_result($offers, $i, 'collector_ID');
            echo $offer_ID.','.$supplier_ID.','.$descrption.','.$avail_date.','.$avial_time.','.$exp_date.','.$exp_time.','.$status.','.$collector_ID.'<br>';
    }
}

?>
