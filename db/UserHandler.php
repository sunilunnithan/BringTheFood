<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function CreateDB(){
//drop the database if it is there

    mysql_query("DROP DATABASE  IF EXISTS scaamp") or die("Trying to drop non-existent database:".mysql_error());
    $db = mysql_query("CREATE DATABASE scaamp") or die ('Unable to create SCAAMP database:'.mysql_error());
    $dbname ='scaamp';
    mysql_select_db($dbname);
    return 1;
}


?>
