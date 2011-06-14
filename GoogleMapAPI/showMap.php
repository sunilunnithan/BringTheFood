<?php
mysql_connect("localhost","root","root");
mysql_select_db("food_db") || die("Unable to connect to food_db");
?>

<script type="text/javascript">

var newpoints = new Array();

//set The marker size and image
icon0 = new GIcon();
icon0.image = "http://www.google.com/mapfiles/marker.png";
icon0.shadow = "http://www.google.com/mapfiles/shadow50.png";
icon0.iconSize = new GSize(20, 34);
icon0.shadowSize = new GSize(100, 100);
icon0.iconAnchor = new GPoint(100, 100);
icon0.infoWindowAnchor = new GPoint(9, 2);
icon0.infoShadowAnchor = new GPoint(18, 25);

<?php
//This value should come from the caller.
$stak_id = 4;
$status ="open";

//Fire queries to retrive the location data for database
$gmap_city_sql = "SELECT * FROM map_data WHERE stak_id='$stak_id'";
$gmap_city_result = mysql_query($gmap_city_sql) or die(mysql_error());
$row = mysql_fetch_object($gmap_city_result);

//$open_offer_address_sql = "SELECT * FROM map_data";// WHERE status='$status'";
//$open_offer_address_result = mysql_query($open_offer_address_sql) or die(mysql_error());
//$row = mysql_fetch_object($open_offer_address_result);
$open_offer_address_result = mysql_query("SELECT * FROM map_data") or die ("Unable to fetch map_data:".  mysql_error());

//active suppliers
if ($open_offer_address_result){
            
    //$PHP_directive_objects = array();
    $num_rows = mysql_num_rows($open_offer_address_result);
    for ($row_num = 0;$row_num<$num_rows;$row_num++) {
        mysql_result($open_offer_address_result, $row_num, 'latitude');
        $lat = mysql_result($open_offer_address_result, $row_num, "latitude");
        $long = mysql_result($open_offer_address_result, $row_num, "longitude");
        $via = mysql_result($open_offer_address_result, $row_num, "via");
        $country = mysql_result($open_offer_address_result, $row_num, "country");
        $province = mysql_result($open_offer_address_result, $row_num, "province");
        $zipcode  = mysql_result($open_offer_address_result, $row_num, "zipcode");
        //echo '"Row_data '.$row_data
   

//Set the Map Lat and Log that is retrieved from database
$i = 0;

echo "newpoints[{$i}] = new Array ({$row->latitude},{$row->longitude},icon0,'','<b> ".addslashes($row->via). ", {$zipcode->zipcode} $province->province </b><br>".addslashes($country->country)."');\n";
    //}}
    ?>

    //Initilize the Map layout
    function load() {
      if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById("map_canvas"),{ size: new GSize(720,720) } );
        map.setCenter(new GLatLng(37.4419, -122.1419), 13);
        map.addControl(new GLargeMapControl()); //add Map Movement control
        map.addControl(new GMapTypeControl()); //Add MapType Control in Our MAP
        map.addMapType(G_SATELLITE_3D_MAP); // Set Default MapType
        
        var point = new GPoint(newpoints[0][1],newpoints[0][0]);
        var popuphtml = newpoints[0][4] ;
        var marker = createMarker(point,newpoints[0][2],popuphtml);
        map.addOverlay(marker);

      }
      
    }
    //function to create Marker
    function createMarker(point, icon, popuphtml) {
        var popuphtml = '<div id="popup">' + popuphtml + '</div>';
        var marker = new GMarker(point, icon);

         marker.openInfoWindowHtml(popuphtml); //Display Marker on Map


        GEvent.addListener(marker, "click", function() {
            marker.openInfoWindowHtml(popuphtml);
        });
        return marker;
    }
<?php }} ?>
</script>
