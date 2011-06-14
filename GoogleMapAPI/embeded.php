<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Nested List - Source Code Browser</title>
        <link rel="stylesheet" href="../sencha-touch-1.1.0/resources/css/sencha-touch.css" type="text/css">
        <script type="text/javascript" src="../sencha-touch-1.1.0/sencha-touch-debug.js"></script>
       <script type="text/javascript" src="js/index.js"></script>

       <?php
    $MovingFoodGMapKey = 'ABQIAAAA0rgRviA_63qGVWEKdx8ZOxRYrjFVhF5kx3H2A1TMuRZMY43TWRR7RygmrBmV4H-NDeem5LnW9Lo_Cw';
?>
<script src="http://maps.google.com/maps?file=api&v=2&key=<?php echo $MovingFoodGMapKey;?>"
        type="text/javascript">
</script>

<?php
    include('showMap.php');
?>
</head>
<body>
    <div id="buttons"></div>


</body>
</html>


</head>

<body onLoad="load()" >
    <div align="center"><div id="map_canvas" style="width: 100px; height: 100px"></div></div>
    <!--You can reduce the size of map by decreasing the height and width value of <div> tag-->
</body>

</html>