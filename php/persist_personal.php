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

$paramArr["gender"]       = htmlspecialchars($_POST['gender']);
$paramArr["age"]          = htmlspecialchars($_POST['age']);
$paramArr["nationality"]  = htmlspecialchars($_POST['nationality']);
$paramArr["expertise"]    = htmlspecialchars($_POST['expertise']);
$paramArr["education"]    = htmlspecialchars($_POST['education']);

$_SESSION['id'] = $taskDAO->insert( $paramArr );

print_r ($_SESSION['id']);

?>