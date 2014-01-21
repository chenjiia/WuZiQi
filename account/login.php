<?php
// This file accesses

// POST
// username

// This file does

// 1,Validation
// 2,check if username is in use
// 3,Add him to the lobby

//INCLUDE VALIDATORS
include "account_validator.php";

//INCLUDE THE USERNAME CHECKER
include "account_combination_check.php";

//read login info from POST
$username = $_POST["username"];

echo 'Validation results:';
echo '</br>';
echo validator_username($username)? 'username OK' : 'username not OK';
echo '</br>';

if(validator_account($account) == false){
		echo "Login failed validation failure";
		return;
}

$status = combinationCheck($account, $username, $password);

echo $status? 'Login successful' : 'Login failed wrong username or password';

if($status){
	//use php sessions
	session_start();
	$_SESSION['username']=$username;
	echo "<SCRIPT LANGUAGE='javascript'>";
	echo "location.href='admin_utility_main.php'";
	echo "</SCRIPT>";
	exit;
}
?>