<?php
/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

include ('../db/DB_Connector.php');
connectToMySQL();

function supplier_JSON($ID){
    $supplier =mysql_query("SELECT * FROM supplier WHERE supplier_ID ='$ID'") or die ('Unable to retrieve supplier');
    if ($supplier){
            $supplier_ID=mysql_result($supplier, 0, 'supplier_ID');
            $name= mysql_result($supplier, 0, 'name');
            $address=mysql_result($supplier, 0, 'address');
            $phone=mysql_result($supplier, 0, 'phone');
            $email=mysql_result($supplier, 0, 'email');
            $this_supplier =array ('supplier_name'=>$name,'supplier_address'=>$address,'supplier_phone'=>$phone,'supplier_email'=>$email);
            $supplier_JSON =json_encode($this_supplier);
            echo $supplier_JSON;
            return $supplier_JSON;
         
}

echo supplier_JSON(1);
}

?>
