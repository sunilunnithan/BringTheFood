<?php
define("MAPS_HOST", "maps.google.com");
define("KEY", 'ABQIAAAA0rgRviA_63qGVWEKdx8ZOxRYrjFVhF5kx3H2A1TMuRZMY43TWRR7RygmrBmV4H-NDeem5LnW9Lo_Cw');

// ---------------------------------------------------------------------------
//    Copyright (C) 2011  Komminist Weldemariam
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see http://www.gnu.org/licenses/gpl-3.0.html.
// ---------------------------------------------------------------------------

class geoCode {
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
        //echo 'Address received '.$addr."<br />";
        $geocodeInfo = null;
        $delay = 0;
        $base_url = "http://" . MAPS_HOST . "/maps/geo?output=xml" . "&key=" . KEY;

        $geocode_pending = true;

        while ($geocode_pending) {

            $request_url = $base_url . "&q=" . urlencode($addr);
            $xml = simplexml_load_file($request_url) or die("url not loading");

            $status = $xml->Response->Status->code;
            //echo 'status: ' . $status . "<br />";
            if (strcmp($status, "200") == 0) {
                // Successful geocode
                $geocode_pending = false;
                $coordinates = $xml->Response->Placemark->Point->coordinates;
                $coordinatesSplit = split(",", $coordinates);
                // Format: Longitude, Latitude, Altitude
                $lat = $coordinatesSplit[1];
                $lng = $coordinatesSplit[0];
                $geocodeInfo = array("addr" => $addr, "lat" => $lat, "lng" => $lng, "status" => $status);

                //echo 'lat : ' . $lat . " and lng: " . $lng . "<br />";
            } else if (strcmp($status, "620") == 0) {
                // sent geocodes too fast
                $delay += 100000;
            } else {
                // failure to geocode
                $geocode_pending = false;
                $geocodeInfo = array("addr" => $addr, "lat" => NULL, "lng" => NULL, "status" => $status);
                //echo "Address " . $addr . " failed to geocoded. ";
                //echo "Received status " . $status . "<br />";
            }
            usleep($delay);
        }
        return ($geocodeInfo);
    }
    
}
?>