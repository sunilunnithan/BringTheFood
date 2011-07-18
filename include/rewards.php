<?php

include ('../config/config.php');

//function to get total number of people served by a supplier
function get_supplier_score() {
    $supplier_id = $_SESSION['demo']['user_id'];
    $score = 0;
    $people_served = mysql_query("SELECT SUM(people_served) AS served_so_far FROM offer WHERE supplier_id ='$supplier_id' AND status='collected'");
    if (mysql_num_rows($people_served) > 0) {
        $score = mysql_result($people_served, 0, 'served_so_far');
        if ($score == null){
            $score = 0;
        }
    }
    return $score;
}


function get_supplier_rank(){
    $supplier_id = $_SESSION['demo']['user_id'];
    $rank = 0;
    $people_served_sorted = mysql_query("SELECT supplier_id,SUM(people_served) AS served_so_far FROM offer WHERE status='collected' GROUP BY supplier_id ORDER BY served_so_far DESC");
    $n =mysql_num_rows($people_served_sorted);
    for ($i=0;$i<$n;$i++){
        if (mysql_result($people_served_sorted,$i, 'supplier_id')==$supplier_id){
            $rank=$i;
            break;
        }
    }
    return $rank+1;
}


$score = get_supplier_score();
$rank = get_supplier_rank();
echo json_encode(array("success" => true, "score" => $score,"rank"=>$rank));
?>
