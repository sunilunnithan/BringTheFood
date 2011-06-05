<?php
$include('functions.php');
/*
	Normally you would select a record from your database and then return the json data.
    The code below simulates that process.
	Important: a real application will need to cope with unexpected characters such as embedded
	double or single quotes etc in the JSON. You must pass back to Ext what your reader is expecting.
	The following is NOT a robust example - it is just a simplified example to get the client server interaction happenning.
	You also need to think about the datatypes returned and whether your app will cope or not.
	I strongly suggest you use Firefox and FireBug to monitor the returned data while testing.
*/

if (!isset($_REQUEST['recordID'])) {$_REQUEST['recordID'] = 1;} //Set a url recordID parameter if one isnt passed in

$recID = $_REQUEST['recordID'];

if ($recID == 1) {
    $result = '{success: true, data:{recordid:"1", first:"Jack", last:"Slocum", company:"Ext JS", email:"support@extjs.com", state:"OH", dob:"04/15/2007", fee:"50"} }';
} else if ($recID == 2) {

	// December 28th, 2008: Original test removed. A sample using the slightly more realistic json_encode() added
	//$result = "{success: true, data:{recordid:'2', first:'Murray', last:'Hopkins', company:'Murrah', email:'murray@somedomain.com.au', state:'NSW', dob:'04/26/2002', fee:'20'} }";

	$data[] = array(
			'recordid' => 2,
			'first' => 'Murray',
			'last' => 'Hopkins',
			'company' => 'Murrah Pty Ltd',
			'email' => 'murray@somedomain.com.au',
			'state' => 'NSW',
			'dob' => '04/26/2002',
			'fee' => '20');

						// Note that json_encode() wraps the data in [ ] and escapes slashes in dates, both of
						// which will cause problems in the Ext reader unless you make your own reader
						// The following hack is simply to demonstrate how you could get around this to return
						// the same format as the native reader is expecting.
						// BUT a real example will need to cope with unexpected characters such as embedded
						// double or single quotes etc
	$tmpData = json_encode($data);
	$tmpData = substr($tmpData,1,strlen($tmpData)-2); // strip the [ and ]
	$tmpData = str_replace("\\/","/",'{success:true,data:'.$tmpData.'}'); // unescape the slashes

	$result = $tmpData;

} else {
    $result = '{success: false, msg: "Connected to server but encountered a database error. Record '.$recID.' not found."}';
}
echo $result;
?>