<?php
   // header("HTTP/1.0 404 Not Found");
   include ('../db/DB_Connector.php');
    connectToMySQL();
    $collectorId = $_POST['collectorId'];
    $offerId = $_POST['offerId'];
    $date = date('d/m/y');
    $time =date('h:m:s');
    $insert =  mysql_query("INSERT INTO booking (offer_ID, collector_ID,book_date,book_time) VALUES('$offerId','$collectorId','$date','$time')") or die ('Unable to add booking'.mysql_error());
    $check =mysql_query("SELECT status from offer WHERE offer_ID='$offerId'") or die ('Unable to retrieve offers');
    if(mysql_result($check, 0,'status')!="booked"){
        $update =mysql_query("UPDATE offer SET status ='booked' WHERE offer_ID ='$offerId'") or die ('Unable to complete booking');
    }
    else
    header("HTTP/1.0 404 Not Found");
   

?>