
<?php
include ('db/DB_Connector.php');
?>
<hmtl>
    <head>Moving Foods</head>

    <body>
        <p><?php ?></p>
        <ul>
           <li><a href="food_supplier/index.html">Supplier</a></li>
           <li><a href="food_collector/index.html">Collector</a></li>
           <li><a href="food_distributor/index.html">Distributor</a></li>
        </ul>
        <?php
        $result=connectToMySQL();
        echo $result;
        
        ?>
    </body>
</html>
