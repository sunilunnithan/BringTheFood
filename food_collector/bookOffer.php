<?php
    header("HTTP/1.0 404 Not Found");

    $collectorId = $_POST['collectorId'];
    $offerId = $_POST['offerId'];
    $date = date('d m y');
    $time =date('h:m:s');
    $insert =  mysql_query("INSERT INTO booking (offer_ID, collecter_ID,book_date,book_time) VALUES('$offerId','$collectorId','$date','$time')") or die ('Unable to add booking');
    $update =mysql_query("UPDATE offer SET status ='booked' WHERE offer_ID ='$offerId'") or die ('Unable to complete booking');
    echo "Done";
    
   
?>