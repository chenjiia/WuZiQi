<?php
// This file accesses
//
// SESSION
// $_SESSION['account'];
// $_SESSION['username'];
//
// POST
// change
// password
// passwordNew
// passwordNewAgain
// (needed to change password)

session_start();
if (($_SESSION['account'] != 'guide' )&& ($_SESSION['account'] != 'admin')){
	header("location:loginPage.php");
	exit;
}

//INCLUDE VALIDATORS
include "account_validator.php";

//INCLUDE THE COMBINATION CHECKER
include "account_combination_check.php";

$change = $_POST["change"];

echo 'Validation results:';
echo '</br>';
echo validator_change($change)? 'change OK' : 'change not OK';
echo '</br>';

if(validator_change($change) == false){
		echo "Validation failure invalid variable name";
		return;
}

switch ($change){
	case 'password':
		changePassword();
		break;
	case 'username':
		break;
}

function changePassword(){
	session_start();
	$account = $_SESSION['account'];
	$username = $_SESSION['username'];		
	
	$password = $_POST["password"];
	$passwordNew = $_POST["passwordNew"];
	$passwordNewAgain = $_POST["passwordNewAgain"];

	echo validator_password($password)? 'password OK' : 'password not OK';
	echo '</br>';
	echo validator_password($passwordNew)? 'new password OK' : 'new password not OK';
	echo '</br>';
	echo validator_password($passwordNewAgain)? 'new password again OK' : 'new password again not OK';
	echo '</br>';
	echo ($passwordNew == $passwordNewAgain)? 'new password repeat OK' : 'new password repeat not OK';
	echo '</br>';
	echo (strlen($passwordNew) >= 6)? 'new password length OK' : 'new password too short';
	echo '</br>';

	if((validator_password($password)&&validator_password($passwordNew)&&validator_password($passwordNewAgain) && ($passwordNew == $passwordNewAgain)&& (strlen($passwordNew) >= 6))== false){
		echo "Change password failed validation failure";
		return;
	}

	$status = combinationCheck($account, $username, $password);
	
	if(!$status){
		echo 'Change password failed wrong password';
		return;
	}
	
	include "connect.php";
	//get authentication_id
	$query = "SELECT authentication_id FROM TTA.$account WHERE {$account}_username = '$username'";
	$result = pg_query($conn, $query);
	if(!$result){
		print "error executing query";
	}
	$authentication_id_array = pg_fetch_assoc($result);
	$authentication_id = $authentication_id_array['authentication_id'];
	
	$good_hash = create_hash($passwordNew);

	$query = "UPDATE TTA.shadow SET hashsalt = '$good_hash' WHERE authentication_id = $authentication_id";
	$result = pg_query($conn, $query);
	if(!$result){
		print "error executing query";
	}
	echo 'Change password successful';
}
?>