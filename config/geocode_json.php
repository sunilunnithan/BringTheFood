<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
define("MAPS_HOST", "74.125.232.108");

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Get geocode information given an address and populate into a database.
-Takes one parameter
	@full address = string (an address composed )
					Example:
					via Sommarive 14, 38123, Trento, Italy
Returns the geocode location for that address in terms of lat and lng.
*/
/////////////////////////////////////////////////////////////////////////////////////////////
    function grapGeocodeInfo($addr) {

        // Initialize delay in geocode speed
        $geocodeInfo = null;
        $delay = 0;
        //$base_url = "http://" . MAPS_HOST . "/maps/geo?";
        $base_url = "http://" . MAPS_HOST . "/maps/api/geocode/json?";

        $geocode_pending = true;

        while ($geocode_pending) {

            $request_url = $base_url . "address=" . urlencode($addr) . "&sonsor=false";
            $geocode = file_get_contents($request_url);
            $output= json_decode($geocode);

            $status = $output->status;

            //echo 'status: ' . $status . "<br />";
            if (strcmp($status, "OK") == 0) {
                // Successful geocode
                $geocode_pending = false;
                // Format: Longitude, Latitude, Altitude
                $lat = $output->results[0]->geometry->location->lat;
                $lng = $output->results[0]->geometry->location->lng;

                $geocodeInfo = array("addr" => $addr, "lat" => $lat, "lng" => $lng, "status" => $status);

            }else {
                // A non-existent address or a latlng in a remote location or failure
                $geocode_pending = false;
                $geocodeInfo = array("addr" => $addr, "lat" => NULL, "lng" => NULL, "status" => $status);
            }
            usleep($delay);
        }

       // print_r($geocodeInfo);

        echo json_encode($geocodeInfo);
    }
?>
