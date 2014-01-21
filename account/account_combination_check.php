<?php
//This file contains a function

//validation should be done before calling this function

//check password username account combination 
//return a bool
function combinationCheck($account, $username, $password){
	//INCLUDE CONNECTION DETAILS FROM FILE
	include "connect.php";
	//INCLUDE HASHSALT FUNCTIONS
	include "account_pbkdf2.php";

	$query = "SELECT authentication_id FROM TTA.$account WHERE {$account}_username = '$username'";
	$result = pg_query($conn, $query);
	if(!$result){
		print "error executing query";
	}
	$authentication_id_array = pg_fetch_assoc($result);
	$authentication_id = $authentication_id_array['authentication_id'];
	if ($authentication_id == NULL){
		//echo "Login failed no such username";
		return false;
	}
	
	$query = "SELECT hashsalt FROM TTA.shadow WHERE authentication_id = '$authentication_id'";
	$result = pg_query($conn, $query);
	if(!$result){
		print "error executing query";
	}
	$authentication_array = pg_fetch_assoc($result);
	$authentication = $authentication_array['hashsalt'];

	return validate_password($password, $authentication);
}
?>