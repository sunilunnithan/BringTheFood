<?php
 //do something!
?>

<html>
<head>
<!-- Call this code inside the header  --->
<?php
    $MovingFoodGMapKey = 'ABQIAAAA0rgRviA_63qGVWEKdx8ZOxRYrjFVhF5kx3H2A1TMuRZMY43TWRR7RygmrBmV4H-NDeem5LnW9Lo_Cw';
?>
<script src="http://maps.google.com/maps?file=api&v=2&key=<?php echo $MovingFoodGMapKey;?>"
        type="text/javascript">
</script>
<?php
    include('showMap.php');
?>


</head >

<body onLoad="load()" onunload="GUnload()" >
    <div align="center"><div id="map_canvas" style="width: 400px; height: 400px"></div></div>
    <!--You can reduce the size of map by decreasing the height and width value of <div> tag-->
</body>
</html>