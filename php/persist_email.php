<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/taskDAO.php";

$dbmanager   = new pdoDbManager ();
$taskDAO  = new taskDAO ( $dbmanager );
$dbmanager->openConnection();

 //$decBody = json_decode( $body, true ); 

$paramArr = []; 

$paramArr["email"] = htmlspecialchars($_POST['email']);

$results = $taskDAO->updateEmail( $paramArr, $_SESSION['id']  );


?>