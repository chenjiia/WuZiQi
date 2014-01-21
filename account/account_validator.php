<?php
//This file contains only functions

//'username' has to be alphanumeric
function validator_username($password){
	return !preg_match('/[^a-zA-Z0-9]/', $password) && !empty($password);
}
?>