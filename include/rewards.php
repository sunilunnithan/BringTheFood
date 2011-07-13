<?php
include ('../config/config.php');

//function to get total number of people served by a supplier
function get_supplier_score(){
    $supplier_id=$_SESSION['demo']['user_id'];
    $score =0;
    $people_served= mysql_query("SELECT SUM(people_served) AS served_so_far FROM offer WHERE supplier_id ='$supplier_id'");
    if ($people_served){
        $score =mysql_result($people_served, 0, 'served_so_far');
    }
    return $score;
}


if ($_GET['action'] == 'rewards') {
$score =get_supplier_score();
echo json_encode(array("success" => true, "score" => $score));
}

?>
