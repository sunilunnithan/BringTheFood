<?php
include ('db/DB_Connector.php');
?>
<html>
    <head>Moving Foods</head>

    <body>
        <p><?php ?></p>
        <ul>
           <li><a href="food_supplier/index.html">Supplier</a></li>
           <li><a href="food_collector/index.html">Collector</a></li>
           <li><a href="food_distributor/index.html">Distributor</a></li>
        </ul>
        <?php
        $result = connectToMySQL();
        echo 'DB Connected? ' . $result;
        ?>
    </body>
</html>
