<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function connectToMySQL(){
//drop the database if it is there

    mysql_connect('localhost','root','root') or die ('Unable to connect to Food database:'.mysql_error());
    mysql_select_db('food_db');
    return 1;
}


?>
