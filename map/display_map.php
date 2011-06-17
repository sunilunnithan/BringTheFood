<?php
 include("prepareMapInfo.php");
?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
  <title> Offer Map (Powered by Google Map)</title>
  <script src="http://maps.google.com/maps/api/js?sensor=false"
          type="text/javascript"></script>
</head>
<body>
  <div id="map" style="width: 720px; height: 300px;"></div>
  
   <script language="javascript" type="text/javascript">

    var desc = ["<?php echo implode ('","', $description); ?>"];
    var aval_date = ["<?php echo implode ('","',  $available_date); ?>"];
    var aval_time = ["<?php echo implode ('","',  $available_time); ?>"];
    var expire_date = ["<?php echo implode ('","',  $expire_date); ?>"];
    var status = ["<?php echo implode ('","',  $status); ?>"];
    
    var num_location = '<?php echo $num_rows?>';
    var streets = ["<?php echo implode ('","', $gstreet); ?>"];
    var lats = ["<?php echo implode ('","', $glat); ?>"];
    var lngs = ["<?php echo implode ('","', $glng); ?>"]

    //alert (streets + " " + lats + " " + lngs);
    
    var locations = new Array ();
    var latlng = new Array();
    var contentString = new Array();

    for (i = 0; i < streets.length; i++)
     {
       locations[i]  = streets[i];
       latlng[i] = new google.maps.LatLng(lats[i], lngs[i]);
      // alert(status1);
       contentString[i] = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h2 id="firstHeading" class="firstHeading">Offer Detail</h2>'+
            '<div id="bodyContent">'+
            '<p><b>Description: </b>'+desc[i]+'.</p>'+
            '<p><b>Avaliable date: </b>'+aval_date[i]+'.</p>'+
            '<p><b>Avaliable time: </b>'+aval_time[i]+'.</p>'+
            '<p><b>Expire Date: </b>'+expire_date[i]+'.</p>'+
            '<p><b>Current Status: </b>'+status[i]+'.</p>'+
            '</div>'+
            '</div>';
            }

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(46.0683846,11.1197605),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    var infowindow = new google.maps.InfoWindow({
        content: contentString[0]
        });

    var marker, i;

    
    for (i = 0; i < streets.length; i++) {
      //alert(i);
      marker = new google.maps.Marker({
        position: latlng[i],
        map: map
      });

      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infowindow.setContent(contentString[i]);
          infowindow.open(map, marker);
          
        }
      })(marker, i));
    }
  </script>
 
</body>
</html>