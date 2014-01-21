<?php
// This file accesses
//
// SESSION
// $_SESSION['account'];
// $_SESSION['username'];
//
// POST
// family_name
// midle_name
// given_name
// guide_username

$var = 'account';

session_start();
if ($_SESSION[$var] != 'admin'){
	header("location:loginPage.php");
	exit;
}

//INCLUDE VALIDATORS
include "account_validator.php";

$family_name = $_POST["family_name"];
$midle_name = $_POST["midle_name"];
$given_name = $_POST["given_name"];
$guide_username = $_POST["guide_username"];

echo 'Validation results:';
echo '</br>';
echo validator_humanname($family_name)? 'family_name OK' : 'family_name not OK';
echo '</br>';
echo validator_humanname($midle_name)? 'midle_name OK' : 'midle_name not OK';
echo '</br>';
echo validator_humanname($given_name)? 'given_name OK' : 'given_name not OK';
echo '</br>';
echo validator_username($guide_username)? 'guide_username charset OK' : 'guide_username charset not OK';
echo '</br>';
echo (strlen($guide_username) >= 6)? 'guide_username length OK' : 'guide_username length not OK';
echo '</br>';

if((validator_humanname($family_name)&&validator_humanname($midle_name)&&validator_humanname($given_name) && validator_username($guide_username) && (strlen($guide_username) >= 6))== false){
		echo "Create Guide account failed validation failure";
		return;
}

include "connect.php";
$result=pg_query($conn, "SELECT * FROM TTA.guide WHERE guide_username='$guide_username';");
	if  (!$result) {
		echo "query did not execute";
	}
	if (pg_num_rows($result) != 0) {
		echo "Create Guide account failed guide_username already in use";
		return;
}

//create new password
include "account_pbkdf2.php";
$password = create_password(10);

//create new hash
$good_hash = create_hash($password);

//insert into shadow
$query = "INSERT INTO TTA.shadow (hashsalt) VALUES ('$good_hash')";
$result = pg_query($conn, $query);
if(!$result){
	print "error executing query";
}
//get A.I authentication_id
$query = "SELECT authentication_id FROM TTA.shadow WHERE hashsalt = '$good_hash'";
$result = pg_query($conn, $query);
if(!$result){
	print "error executing query";
}
$authentication_id_array = pg_fetch_assoc($result);
$authentication_id = $authentication_id_array['authentication_id'];
//echo $authentication_id;

//insert into admin
$query = "INSERT INTO TTA.guide (guide_username, authentication_id, family_name, midle_name, given_name) VALUES ('$guide_username', $authentication_id, '$family_name', '$midle_name', '$given_name')";
$result = pg_query($conn, $query);
if(!$result){
	print "error executing query";
}
else{
	echo "Guide username is: </br>$guide_username</br>";
	echo "Guide password is: </br>$password</br>";
	echo "Guide account creation completed.";
}
?>