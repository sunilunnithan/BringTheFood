<?php
define("MAPS_HOST", "maps.google.com");
define("KEY", 'ABQIAAAA0rgRviA_63qGVWEKdx8ZOxRYrjFVhF5kx3H2A1TMuRZMY43TWRR7RygmrBmV4H-NDeem5LnW9Lo_Cw');

// 
// ---------------------------------------------------------------------------
// 	  uManagement - An all in one authentication system PHP class based on
// 	  uFlex <http://sourceforge.net/projects/uflex/support>, by Pablo Tejada:
//    Copyright (C) 2011  
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

class uManagement {
    //Constants
    const debug = true;   //Logs extra bits of errors for developers
    const version = 0.1;
    const salt = "ks5a4"; //IMPORTANT: Please change this value as it will make this copy unique and secured
    //End of constants\\\\
    var $id;        //Signed user ID
    var $sid;       //Current User Session ID
    var $name;  //Signed name
    var $pass;      //Holds the user password hash
    var $signed;    //Boolean, true = user is signed-in
    var $data;      //Holds entire user database row
    var $console;   //Cotainer for errors and reports
    var $log;       //Used for traking errors and reports
    var $confirm;   //Holds the hash for any type of comfirmation
    var $tmp_data;  //Holds the temporary user information during registration
    var $opt = array( //Array of Internal options
        "table_name" => "users",
        "cookie_time" => "+30 days",
        "cookie_name" => "demo_auto",
        "cookie_path" => "/",
        "cookie_host" => false,
        "user_session" => "demo",
        "default_user" => array(
                "name" => "Guest",
                "user_id" => 0,
                "password" => 0,
                "role" => 0,
                "signed" => false
                )
        );
    var $validations = array( //Array for default field validations
            "name" => array(
                    "limit" => "3-15",
                    "regEx" => '#^[a-z\s\.]+$#i'//"/^([a-zA-Z0-9_])+$/"
                    ),
            "password" => array(
                    "limit" => "3-15",
                    "regEx" => false
                    ),

            "role" => array(
                    "limit" => "3-10",
                    "regEx" => false
                    ),
            "email" => array(
                    "limit" => "4-45",
                    "regEx" => "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/"
                    )
            //"address" => array(
              //      "limit" => "10-45",
                //     "regEx" => "/^([a-zA-Z0-9_])+$/"
                  //  )

        );
        
	var $encoder = array(
			"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
			"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
			0,2,3,4,5,6,7,8,9
		);
    
    //Array of errors
    var $errorList = array(
            1   => "New User Registration Failed", //Database Error while caling register functions
            2   => "The Changes Could not be made", //Database Error while calling update functions
            3   => "Account could not be activated", //Database Error while calling activate function
            4   => "We don't have an account with this email", //When calling pass_reset and the given email doesn't exist in database
            5   => "Password could not be changed. The request can't be validated", //When calling new_pass, the confirmation hash did not match the one in database
            6   => "Logging with cookies failed",
            7   => "No Email or Password provided",
            8   => "Your Account has not been Activated. Check your Email for instructions",
            9   => "Your account has been deactivated. Please contact Administrator",
            10  => "Either Email or Password does not match",
            11  => "Confirmation hash is invalid", //When calling check_hash with invalid hash
            12  => "Your identification could not be confirmed", //Calling check_hash hash failed database match test
            13  => "Failed to save confirmation request", //When saving hash to database fails
            14 	=> "You need to reset your password to login",
            15 	=> "New Address Registration Failed",
            16  => "Address Change Could not be made", //Address Database Error while calling update functions
            17  => "Query Faild to for the geocode, Check the SQL",
            18  => "There are no avaliable offers",
            19  => "Aaron put here your no 19",
            20  => "Something is wrong in your current password"
        );
        
///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Register A New User
-Takes two parameters, the first being required
	@info = array object (takes an associatve array, 
				the index being the fieldname(column in database) 
				and the value its content(value)
	+optional second parameter
	@activation = boolean(true/false)
		default = false 
Returns activation hash if second parameter @activation is true
Returns true if second parameter @activation is false
Returns false on Error
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
    function register($info,$activation = false){
        $this->logger("registration"); //Index for Errors and Reports

        //Saves Registration Data in Class
        $this->tmp_data = $info;

        //Validate All Fields
        if(!$this->validateAll()) return false; //There are validations error

        //Built in actions for special fields
        //Hash Password
        if(isset($info['password'])){
            $this->hash_pass($info['password']);
            $info['password'] = $this->pass;
        }
        //Check for Email in database, allow duplication if a user is registering for different role.
        if(isset($info['email']))
            if($this->check_field('email',$info['email'],"This Email is Already in Use"))
                return false;

        //Check for name in database
        if(isset($info['name']))
            if($this->check_field('name',$info['name'], "This Name is Already in Use"))
                return false;

            

        //Check for Street Address in database
        if(isset($info['street']))
            if($this->check_field('street',$info['street'], "This Street Address is Already in Use"))
                return false;

        //Check for errors
        if($this->has_error()) return false;

        //Set Registration Date
        $info['reg_date'] = time();

        //User Activation
        if(!$activation){ //Activates user upon registration
            $info['activated'] = 1;
        }

        //Prepare Info for SQL Insertion
        foreach($info as $index => $val){
            if(!preg_match("/2$/",$index) ){ //Skips double fields
                if (strcmp($index, "street")== 0
                        || strcmp($index, "zip") == 0
                        || strcmp($index, "city")== 0
                        || strcmp($index, "country")== 0
                        || strcmp($index, "phone")== 0) {
                    $into_tbladdress[] = $index;
                    $values_tbladdress[] = "'" . mysql_real_escape_string($val) . "'";

                }else if (strcmp($index, "type")== 0) {
                    //$into_tbltype[] = $index;
                    //$values_tbltype[] = "'" . mysql_real_escape_string($val) . "'";
                    //do nothing!
                }else {
                    if (strcmp($index, "type")!= 0) {
                        $into_tbluser[] = $index;
                        $values_tbluser[] = "'" . mysql_real_escape_string($val) . "'";
                    }
                }
            }
        }

        //Prepare New User	Query
        $into_tbluser = implode(", ",$into_tbluser);
        $values_tbluser = implode(",",$values_tbluser);

        $sql_user = "INSERT INTO {$this->opt['table_name']} ($into_tbluser)
					VALUES($values_tbluser)";

        //Prepare New Address	Query
        $table_name = "address";
        $into_tbladdress = implode(", ",$into_tbladdress);
        $values_tbladdress= implode(",",$values_tbladdress);

        $sql_address1 = "INSERT INTO {$table_name} ($into_tbladdress)
					VALUES($values_tbladdress)";
        //exit($sql);
        //Enter New user to Database
        if ($this->check_sql($sql_user)) {

            $this->report("New User \"{$info['name']}\" has been registered");
            $this->id = mysql_insert_id();

            $user_id = $this->getUserID($info['email']);

           //Preparing address to fetch geocode.
            $complete_address = $info["street"].", ".$info["city"].", ".$info["zip"].", ".$info["country"];
            $geocode_info = $this->grapGeocodeInfo($complete_address);
            $lat = $geocode_info["lat"];
            $lng = $geocode_info["lng"];
            $sql_address = "INSERT INTO {$table_name} (address_type, address_type_id, $into_tbladdress,lat,lng)
					VALUES('user',$user_id,$values_tbladdress,$lat,$lng)";

            //Enter New address to Database
            if ($this->check_sql($sql_address)) {
                $this->report("New Address for \"{$info['name']}\" has been registered");
            } else {
                //$sql_delete = "DELETE FROM {$this->opt['table_name']} WHERE user_id ='$user_id'";
                $this->abortTransaction($user_id);
                $this->error(15);
            }

            if ($activation) {
                //Insert Validation Hash
                $this->make_hash($this->id);
                $this->save_hash();
                return $this->confirm;
            }
            return true;
        } else {
            $this->error(1);
            //echo "here also .. " . "<br />";

            return false;
        }
    }

    
///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Similar to the register method function in structure
This Method validates and updates any field in the database
-Takes one parameter
	@info = array object (takes an associatve array, 
				the index being the fieldname(column in database) 
				and the value its content(value)
On Success returns true
On Failure return false	
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
   function update($info){
        $this->logger("update"); //Index for Errors and Reports
// name , email, street , zip , city , country , phone
        //Saves Updates Data in Class
        $this->tmp_data = $info;

        //Validate All Fields
        if(!$this->validateAll())
            return false; //There are validations error

        //Check for name in database
        //$info['name'] = stripslashes($info['name']);
        
        if(isset($info['name'])) 
                if( $this->check_field('name',$info['name'], "This name is Already in taken."))
                    return false;
        
       
        //Check for Email in database
         if(isset($info['email']))
            if($this->check_field('email',$info['email'],"This Email is Already in Use"))
                return false;
 
        //Check for Street Address in database
        if(isset($info['street']))
            if($this->check_field('street',$info['street'], "This Street Address is Already in Use"))
                return false;
        

        //Check for errors
        if($this->has_error()) return false;

         //Prepare Info for SQL Insertion
        foreach($info as $index => $val){ 
            if  (!preg_match("/2$/", $index)) { //Skips double fields
                if (strcmp($index, "street") == 0
                        || strcmp($index, "zip") == 0
                        || strcmp($index, "city") == 0
                        || strcmp($index, "country") == 0
                        || strcmp($index, "phone") == 0) {
                    $value_tbladdress = "'" . mysql_real_escape_string($val) . "'";
                    $set_tbladdress[] = "{$index}={$value_tbladdress}";
                }else if (strcmp($index, "type")== 0) {
                    $into_tbltype[] ="'" . mysql_real_escape_string($val) . "'";
                    $values_tbltype[] = "{$index}={$value_tbltype}";
                }else {
                    $value_user = "'" . mysql_real_escape_string($val) . "'";
                    $set_user[] = "{$index}={$value_user}";
                }
            }
        }

    
        $set_user = implode(", ", $set_user);
        
        //Prepare User Update	Query
        //echo "checking ... ".$this->id;
        $sql_user = "UPDATE {$this->opt['table_name']} SET $set_user
					WHERE user_id='{$this->id}'";
        
        
        
        
        //Prepare Address Update	Query
        $table_name = "address";
        $complete_address = $info["street"] . ", " . $info["city"] . ", " . $info["zip"] . ", " . $info["country"];

        //Now get the geocode.
        $geocode_info = $this->grapGeocodeInfo($complete_address);
        $lat = $geocode_info["lat"];
        $lng = $geocode_info["lng"];

        $set_tbladdress[] = "lat= $lat";
        $set_tbladdress[] = "lng= $lng";
        $set_tbladdress = implode(", ", $set_tbladdress);
        
        $sql_address = "UPDATE {$table_name} SET {$set_tbladdress}
					WHERE address_type_id='{$this->id}'";
        //exit($sql);
        //Check for Changes
        if ($this->check_sql($sql_user)) {
            $this->report("Information Updated");
            //update session info
                
            if ($this->check_sql($sql_address)) {
                $this->report("Address Information is also Updated");
                
            } else {
                $this->error(17);
            }
            
            $_SESSION['mFood']['update'] = true;
             $update = $this->getRow("SELECT * FROM {$this->opt['table_name']} WHERE user_id='{$this->id}'");
             $this->update_session($update);
             
          
            return true;
        } else {
            $this->error(2);
            return false;
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Adds validation to queue for either the Registration or Update Method
Single Entry:
	Requires the first two parameters
		@name  = string (name of the field to be validated)
		@limit = string (range in the format of "5-10")
			*to make a field optional start with 0 (Ex. "0-10")
	Optional third paramenter
		@regEx = string (Regular Expresion to test the field)
_____________________________________________________________________________________________________

Multiple Entry:
	Takes only the first argument
		@name = Array Object (takes an object in the following format:
			array(
				"name" => array(
						"limit" => "3-15",
						"regEx" => "/^([a-zA-Z0-9_])+$/"
						),
				"password" => array(
						"limit" => "3-15",
						"regEx" => false
						)
				);
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
    function addValidation($name,$limit = "0-1",$regEx = false){
        $this->logger("registration");
        if(is_array($name)){
            if(!is_array($this->validations))
                $this->validations = array(); //If is not an array yet, make it one
            $new = array_merge($this->validations,$name);
            $this->validations = $new;
            $this->report("New Validation Object added");
        }else{
            $this->validations[$name]['limit'] = $limit;
            $this->validations[$name]['regEx'] = $regEx;
            $this->report("The $name field has been added for validation");
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////	
/*
Activates Account with hash
Takes Only and Only the URL c parameter of the comfirmation page
	@hash = string
Returns true on account activation and false on failure
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
    function activate($hash){
        $this->logger("activation");

        if(!$this->check_hash($hash)) return false;

        $sql = "UPDATE {$this->opt['table_name']} SET activated=1, confirmation='' WHERE confirmation='{$hash}' AND user_id='{$this->id}'";

        if($this->check_sql($sql)){
            $this->report("Account has been Activated");
            return true;
        }else{
            $this->error(3);
            return false;
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Method to reset password, sents an email with a confirmation code to reset password
-Takes one parameter and is required
	@email = string(user email to reset password)
On Success it returns a hash which could then be use to construct the confirmation URL
On Failure it returns false
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
    function pass_reset($email){
        $this->logger("pass_reset");
        $sql = "SELECT * FROM {$this->opt['table_name']} WHERE email='{$email}'";

        $user = $this->getRow($sql);

        if($user){
        	if(!$user['activated'] and !$user['confirmation']){
        		//The Account has been manually disabled and can't reset password
        		$this->error(9);
				return false;
        	}
        	
            $this->make_hash($user['user_id']);
            $this->id = $user['user_id'];
            $this->save_hash();

            $data = array("email" => $email,"name" => $user['name'],"user_id" => $user['user_id'],
                "hash" => $this->confirm);
            return $data;
        }else{
            $this->error(4);
            return false;
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Changes a Password with a Confirmation hash from the pass_reset method
*this is for users that forget their passwords to change the signed user password use ->update()
-Takes two parameters
	@hash = string (pass_reset method hash)
	@new = array (an array with indexes 'password' and 'password2')
					Example:
					array(
						[password] => pass123
						[password2] => pass123
					)
					*use ->addValidation('password', ...) to validate password
Returns true on a successfull password change
Returns false on error
*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
    function new_pass($hash,$newPass){
        $this->logger("new_pass");

        if(!$this->check_hash($hash)) return false;
        
        $this->tmp_data = $newPass;
        if(!$this->validateAll()) echo "here "; return false; //There are validations error

        $pass = $this->hash_pass($newPass['password']);

        $sql = "UPDATE {$this->opt['table_name']} SET password='{$pass}', confirmation='', activated=1 WHERE confirmation='{$hash}' AND user_id='{$this->id}'";
        if($this->check_sql($sql)){
            $this->report("Password has been changed");
            return true;
        }else{
            //Error
            $this->error(5);
            return false;
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////
/*Check the active user is the one who logged-in */
    function validate_pass($c_pass){
      $sql = "SELECT * FROM {$this->opt['table_name']} WHERE password='{$this->hash_pass($c_pass)}'";
      if ( $this->getRow($sql) )
           return true;
       else
           return false;
    }

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
    
 /*////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
////////Private and Secondary Methods below this line\\\\\\\\\\\\\
 \*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////*/
/*Object Constructure*/
    function __construct($user = false,$pass = false,$auto = false){
        $this->logger("login"); //Index for Reports and Errors;
        session_start();
        $this->sid = session_id();

        //echo $user." ".$pass;
        $result = $this->login($user,$pass,$auto);
        //echo "Result ".$result;
        if($result == false){
            $_SESSION[$this->opt['user_session']] = $this->opt['default_user'];
            $this->update_from_session();
            $this->report("User is " + $this->name);
        }else{
            if(!$auto and isset($_SESSION['uManagement']['remember'])){
                unset($_SESSION['uManagement']['remember']);
                $this->setCookie();
            }
        }
        return true;
    }

    private function login($user = false,$pass = false,$auto = false){
        //Session Login
        if(@$_SESSION[$this->opt['user_session']]['signed']){
           // echo "User Is signed in from session";
            $this->report("User Is signed in from session");
            $this->update_from_session();
            if(isset($_SESSION['uManagement']['update'])){
                $this->report("Updating Session from database");
                //Get User From database because its info has change during current session
                $update = $this->getRow("SELECT * FROM {$this->opt['table_name']} WHERE user_id='{$this->id}'");
                $this->update_session($update);
                $this->log_login(); //Update last_login
            }
            return true;
        }
        if(isset($_COOKIE[$this->opt['cookie_name']]) and !$user and !$pass){
            //Cookies Login
            $c = $_COOKIE[$this->opt['cookie_name']];
            $this->report("Attemping Login with cookies");
            if($this->check_hash($c,true)){
                //echo ' ---- one:2-1 ----- ';
                $auto = true;
                $cond = "name='{$this->name}'";
            }else{
                $this->error(6);
                $this->logout();
                return false;
            }
        }else{
            //Credentials Login
           // echo ' ---- one:3 ----- ';
            //echo 'user -: '.$user;
            if($user && $pass){
                if(preg_match($this->validations['email']['regEx'],$user)){
                    //Login using email
                    $cond = "email='{$user}'";
                }else{
                    //Login without email is attempted.
                    $this->error(10);
                    return false;
                    ////$cond = "name='{$user}'";                    
                }
                $this->hash_pass($pass);
                $this->report("Credentials received");
            }else{
                $this->error(7);
                return false;
            }
        }

        $this->report("Querying Database to authenticate user");
        //Query Database and check login
        $sql = "SELECT * FROM {$this->opt['table_name']} WHERE {$cond} AND password='{$this->pass}'";
        $userFile = $this->getRow($sql);
        if($userFile){
            //If Account is not Activated
            if($userFile['activated'] == 0){
                if($userFile['last_login'] == 0){
                    //Account has not been activated
                    $this->error(8);
                }else if(!$userFile['confirmation']){
                    //Account has been deactivated
                    $this->error(9);
                }else{
                	//Account deativated due to a password reset or reactivation request
                	$this->error(14);
                }
                return false;
            }
            //Account is Activated and user is logged in
            $this->update_session($userFile);

            //If auto Remember User
            if($auto){
                $this->setCookie();
            }
            $this->log_login(); //Update last_login
            //Done
            $this->report("User Logged in Successfully");
            return true;
        }else{
            if(isset($_COOKIE[$this->opt['cookie_name']])){
                $this->logout();
            }
            $this->error(10);
            return false;
        }
    }

    function logout(){
        $this->logger("login");
        $deleted = setcookie($this->opt['cookie_name'],"",time() - 3600,"/"); //Deletes the Auto Coookie
        $this->signed = 0;
		//Import default user object
		$this->data = $_SESSION[$this->opt['user_session']] = $this->opt['default_user'];
        if(!$deleted){
            $this->report("The Autologin cookie could not be deleted");
        }
       // echo "User Logged out";
        $this->report("User Logged out");
    }

    private function log_login(){
        //Update last_login
        $time = time();
        $sql = "UPDATE {$this->opt['table_name']} SET last_login='{$time}' WHERE user_id='{$this->id}'";
        if($this->check_sql($sql))
            $this->report("Last Login updated");
    }

    function setCookie(){
        if($this->pass and $this->id){

            $code = $this->make_hash($this->id,$this->pass);

            if(!headers_sent()){
                //echo "PHP";
                setcookie($this->opt['cookie_name'],$code,strtotime($this->opt['cookie_time']),
                    $this->opt['cookie_path'],$this->opt['cookie_host']);
            }else{
                //Headers have been sent use JavaScript to set cookie
                $time = intval($this->opt['cookie_time']);
                echo "<script>";
                echo '
          function setCookie(c_name,value,expiredays){
            var exdate=new Date();
            exdate.setDate(exdate.getDate()+expiredays);
            document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toUTCString()); path=escape("'.
                    $this->opt["cookie_path"].'");
          }
        ';
                echo "setCookie('{$this->opt['cookie_name']}','{$code}',{$time})";
                echo "</script>";
            }

            $this->report("Cookies have been updated for auto login");
        }else{
            $this->error("Info required to set the cookie {$this->opt['cookie_name']} is not available");
        }
    }

    private function update_session($d){
        unset($_SESSION['uManagement']['update']);

        $_SESSION[$this->opt['user_session']] = $d;
        $_SESSION[$this->opt['user_session']]['signed'] = 1;

        $this->report("Session updated");
        $this->update_from_session();
    }

    private function update_from_session(){
        $d = $_SESSION[$this->opt['user_session']];

        $this->id = $d['user_id'];
        $this->data = $d;
        $this->name = $d['name'];
        $this->pass = $d['password'];
        $this->signed = $d['signed'];

        $this->report("Session has been imported to the object");
    }

    function hash_pass($pass){
        $salt = uManagement::salt;
        $this->pass = md5($salt.$pass.$salt);
        return $this->pass;
    }

    function logger($log){
        $this->log = $log;
        unset($this->console['errors'][$log]);
        unset($this->console['form'][$log]);
        $this->report(">>Startting new $log request");
    }

    function report($str = false){
        $index = $this->log;
        if($str){
            $str = ucfirst($str);
            $this->console['reports'][$index][] = $str; //Strore Report
        }else{
            if($index){
                return $this->console['reports'][$index]; //Return the $index Reports Array
            }else{
                return $this->console['reports']; //Return the Full Reports Array
            }
        }
    }

    function error($str = false){
        $index = $this->log;
        if($str){
            $err = is_int($str) ? $this->errorList[$str] : $str;
            $this->console['errors'][$index][] = $err; //Store Error
            if(is_int($str)){
            	$this->report("Error[{$str}]: {$err}"); //Report The error
			}else{
            	$this->report("Error: {$str}"); //Report The error				
			}
        }else{
            if($index){
                if(!isset($this->console['errors'][$index]))
                    return false;
                return $this->console['errors'][$index]; //Return the $index Errors Array
            }else{
                return $this->console['errors']; //Return the Full Error Array
            }
        }
    }

    //Adds fields with errors to the console
    function form_error($field = false,$error = false){
        $index = $this->log;
        if($field){
            if($error){
                $this->console['form'][$index][$field] = $error;
                $this->error($error);
            }else{
                $this->console['form'][$index][] = $field;
            }
        }else{
            if($index){
                if(!isset($this->console['form'][$index]))
                    return false;
                return $this->console['form'][$index]; //Return the $index Errors Array
            }else{
                return $this->console['form']; //Return the Full form Array
            }
        }
    }

    //Check for errors in the console
    function has_error($index = false){
        //Check for errors
        $index = $index?$index:$this->log;
        $count = @count($this->console['errors'][$index]);
        if($count){
            $this->report("$count Error(s) Found!");
            return true;
        }else{
            $this->report("No Error Found!");
            return false;
        }
    }

    //Generates a unique comfirm hash
    function make_hash($uid,$hash = false){
        $e_uid = $this->encode($uid);
        $e_uid_length = strlen($e_uid);
        $e_uid_length = str_pad($e_uid_length,2,0,STR_PAD_LEFT);
        $e_uid_pos = rand(10,32 - $e_uid_length - 1);

        if(!$hash){
            $hash = md5(uniqid(rand(),true));
        }
        //$code = substr($code, 0, $length);
        $code = $e_uid_pos.$e_uid_length;
        $code .= substr($hash,0,$e_uid_pos - strlen($code));
        $code .= $e_uid;
        $code .= substr($hash,strlen($code));

        $this->confirm = $code;
        return $code;
    }

    //Validates a confirmation hash
    function check_hash($hash,$bypass = false){
        if(strlen($hash) != 32 || !preg_match("/^[0-9]{4}/",$hash)){
            $this->error(11);
            return;
        }

        $e_uid_pos = substr($hash,0,2);
        $e_uid_length = substr($hash,2,2);
        $e_uid = substr($hash,$e_uid_pos,$e_uid_length);

        $uid = $this->decode($e_uid);

        $sql = "SELECT * FROM {$this->opt['table_name']} WHERE user_id={$uid} AND confirmation='{$hash}'";

        //Bypass hash confirmation and get the user by partially matching its password
        if($bypass){
            preg_match("/^([0-9]{4})(.{2,".($e_uid_pos - 4)."})(".$e_uid.")/",$hash,$exerpt);
            $pass = $exerpt[2];
            $sql = "SELECT * FROM {$this->opt['table_name']} WHERE user_id={$uid} AND password LIKE '{$pass}%'";
        }

        $result = $this->getRow($sql);

        if(!$result){
            $this->report("The user ID and the confirmation hash did not match");
            $this->error(12);
            return false;
        }
        if($this->signed and $this->id == $result['user_id']){
            $this->logout();
        }

        //Hash is valid import user's info to object
        $this->data = $result;
        $this->id = $result['user_id'];
        $this->name = $result['name'];
        $this->pass = $result['password'];
        
        $this->report("Hash successfully validated");
        return true;
    }

    //Saves the confirmation hash in the database
    function save_hash(){
        if($this->confirm and $this->id){
            $sql = "UPDATE {$this->opt['table_name']} SET confirmation='{$this->confirm}', activated=0 WHERE user_id='{$this->id}'";
            if(!$this->check_sql($sql)){
                $this->error(13);
                return false;
            }else{
                $this->report("Confirmation hash has been saved");
            }
        }else{
            $this->report("Can't save Confirmation hash");
            return false;
        }
        return true;
    }
    //Test field in database for a value
    /*function check_field($field,$val,$err = false){
        $query = mysql_query("SELECT {$field} FROM {$this->opt['table_name']} WHERE {$field}='{$val}' ");
        if(mysql_num_rows($query) >= 1){
            if($err){
                $this->form_error($field,$err);
            }else{

                $this->form_error($field,"The $field $val exists in database");
            }
            $this->report("There was a match for $field = $val");
            return true;
        }else{
            $this->report("No Match for $field = $val");
            return false;
        }
    }

*/
    //Test field in database for a value
    function check_field($field,$val,$err = false){
        $query = mysql_query("SELECT {$field} FROM {$this->opt['table_name']} WHERE {$field}='{$val}' ");
        if(mysql_num_rows($query) >= 1){
            if($err){
                $this->form_error($field,$err);
            }else{

                $this->form_error($field,"The $field $val exists in database");
            }
            $this->report("There was a match for $field = $val");
            return true;
        }else{
            $this->report("No Match for $field = $val");
            return false;
        }

    }
    //Executes SQL query and checks for success
    function check_sql($sql,$debug = false){
        $this->report("SQL: {$sql}"); //Log the SQL Query
        //echo ' cheking ...';
        if(!mysql_query($sql)){
            if(self::debug){
                $this->error(mysql_error());
            }
            return false;            
        }else{
            $rows = mysql_affected_rows();
            if($rows > 0){
                //Good, Rows where affected
                $this->report("$rows row(s) where Affected");
                return true;
            }else{
                //Bad, No Rows where Affected
                $this->report("No rows were Affected");
                return false;
            }
        }
    }

    //Executes SQL query and returns an associate array of results
    function getRow($sql){
        $this->report("SQL: {$sql}"); //Log the SQL Query first
        $query = mysql_query($sql);
        if(mysql_error() and self::debug){
            $this->error(mysql_error());
        }

        if(@mysql_num_rows($query)){
            while($row = mysql_fetch_array($query,MYSQL_ASSOC)){
                $rows[] = $row;
            }
        }else{
            $this->report("Query returned empty");
            return false;
        }
        return $rows[0];
    }

//Executes SQL query and returns a user_id
    function getUserID($email) {

        $this->logger("get_userID");

        $sql = "SELECT * FROM {$this->opt['table_name']} WHERE email='{$email}'";

        $user = $this->getRow($sql);

        if ($user) {
            //echo "user_id: " . $user['user_id'];
            return $user['user_id'];
        } else {
            $this->error(16);
            return false;
        }
    }

    //Executes SQL query and returns a user_id
    function abortTransaction($email) {

        $this->logger("Abort Transaction");

        $sql = "DELETE FROM {$this->opt['table_name']} WHERE user_id ='$user_id'";

        //$user = $this->getRow($sql);
        if ($this->check_sql($sql)) {
            //echo "user_id: " . $user['user_id'];
            $this->error("Transaction Successfully Aborted");
            return true;
        } else {
            $this->error("Aboart Failed");
            return false;
        }
    }


   
    //Validates All fields in ->tmp_data array
    private function validateAll(){
        $info = $this->tmp_data;
        foreach($info as $field => $val){
            //Match double fields
            if(isset($info[$field.(2)])){
                if($val != $info[$field.(2)]){
                    $this->form_error($field, ucfirst($field) . "s did not matched");
                    //return false;
                }else{
                    $this->report(ucfirst($field) . "s matched");
                }
            }

            $this->tmp_data[$field] = trim($val); //Trim white spaces at end and start

            //Validate field
            if(!isset($this->validations[$field]))
                continue;
            $opt = $this->validations[$field];
            $this->validate($field,$opt['limit'],$opt['regEx']);
        }
        return $this->has_error() ? false : true;
    } 

    //Validates field($name) in tmp_data
    private function validate($name,$limit,$regEx = false){
        $Name = ucfirst($name);
        $str = $this->tmp_data[$name];
        $l = explode("-",$limit);
        $min = intval($l[0]);
        $max = intval($l[1]);
        $this->report("I am reporting this $name");
        
        if(!$max and !$min){
            $this->error("Invalid second paramater for the $name validation");
            return false;
        }
        if(!$str){
            if(!isset($this->tmp_data[$name])){
                $this->report("missing index $name from the POST array");
            }
            if(strlen($str) == $min){
                $this->report("$Name is blank and optional - skipped");
                return true;
            }
            $this->form_error($name,"$Name is required.");
            return false;
        }
        if(strlen($str) > $max){
            $this->form_error($name,"The $Name is larger than $max characters.");
            return false;
        }
        if(strlen($str) < $min){
            $this->form_error($name,"The $Name is too short. it should at least be $min characters long");
            return false;
        }
        if($regEx){
            preg_match_all($regEx,$str,$match);
            if(count($match[0]) != 1){
                $this->form_error($name,"The $Name \"{$str}\" is not  valid");
                return false;
            }
        }

        $this->report("The $name is Valid");
        return true;
    }

	//Encoder
	function encode($d){
		$k=$this->encoder;preg_match_all("/[1-9][0-9]|[0-9]/",$d,$a);$n="";$o=count($k);foreach($a[0]as$i){if($i<$o){
			$n.=$k[$i];}else{$n.="1".$k[$i-$o];}}
		return $n;
	}
	//Decoder
	function decode($d){
		$k=$this->encoder;preg_match_all("/[1][a-zA-Z]|[2-9]|[a-zA-Z]|[0]/",$d,$a);$n="";$o=count($k);foreach($a[0]as$i){
			$f=preg_match("/1([a-zA-Z])/",$i,$v);if($f==true){	$i=$o+array_search($v[1],$k);}else{$i=array_search($i,$k);}$n.=$i;}
		return $n;
	}


}
?>
