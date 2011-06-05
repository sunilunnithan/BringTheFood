<!DOCTYPE html>
<?php
    include "../food_supplier/offers.php";
    $offers = get_offers_JSON();
    ?>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Food Collector</title>
    <link rel="stylesheet" href="../sencha-touch-1.1.0/resources/css/sencha-touch.css" type="text/css"/>
    <script type="text/javascript" src="../sencha-touch-1.1.0/sencha-touch-debug.js"></script>
    <script type="text/javascript">
        function getStore() {
            return new Ext.data.JsonStore({
                model  : 'Offers',

                getGroupString : function(record) {
                    return record.get('supplier_name');
                },

//                data: [
//                    {description: '2 pizzas', supplier_name: 'Restaurant X', status : 'Available'},
//                    {description: '1 pasta', supplier_name: 'Catering services Y', status : 'Available'},
//                    {description: 'tomatos', supplier_name: 'Catering services Y', status : 'Available'},
//                    {description: 'Mix', supplier_name: 'Mensa Z', status : 'Available'},
//                    {description: 'Wine', supplier_name: 'Mensa Z', status : 'Available'},
//                    {description: 'Bottles', supplier_name: 'Mensa Z', status : 'Available'},
//                    {description: 'Crates of vegetables', supplier_name: 'Mensa Z', status : 'Available'}
//                ]
                  data : <?php echo $offers?>
            
        });

        }
    </script>
    <script type="text/javascript" src="js/offers.js"></script>
</head>
<body>
    <?php
    echo "#";
    echo $offers;
    echo "#";
    ?>
</body>
</html>
