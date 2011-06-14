<?php
//    include "../db/DB_Connector.php";
include ('../../db/DB_Connector.php');
connectToMySQL();


    function get_offer_JSON($ID){    $supplier =mysql_query("SELECT * FROM collector WHERE collector_ID='$ID'") or die ('Unable to retrieve supplier'. mysql_error());
    if ($supplier){
            $supplier_ID=mysql_result($supplier, 0, 'collector_ID');
            $name= mysql_result($supplier, 0, 'name');
            $address=mysql_result($supplier, 0, 'address');
            $phone=mysql_result($supplier, 0, 'phone');
            $email=mysql_result($supplier, 0, 'email');
            $this_supplier =array ('supplier_name'=>$name,'supplier_address'=>$address,'supplier_phone'=>$phone,'supplier_email'=>$email);
            $supplier_JSON =json_encode($this_supplier);
            //echo $supplier_JSON;
            return $supplier_JSON;
    }

}

?>
