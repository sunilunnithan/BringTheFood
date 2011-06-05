<?php
include('functions.php');

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

$tmpData = supplier_JSON($recID);

$tmpData = substr($tmpData,1,strlen($tmpData)-2); // strip the [ and ]
$tmpData = str_replace("\\/","/",'{"data": [{'.$tmpData.'}]}'); // unescape the slashes

$result = $tmpData;

echo $result;
?>