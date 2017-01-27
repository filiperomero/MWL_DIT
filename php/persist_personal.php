<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/taskDAO.php";

$dbmanager   = new pdoDbManager ();
$taskDAO  = new taskDAO ( $dbmanager );
$dbmanager->openConnection();

 //$decBody = json_decode( $body, true ); 

$paramArr = array();

$paramArr["gender"]       = htmlspecialchars($_POST['gender']);
$paramArr["age"]          = htmlspecialchars($_POST['age']);
$paramArr["nationality"]  = htmlspecialchars($_POST['nationality']);
$paramArr["expertise"]    = htmlspecialchars($_POST['expertise']);
$paramArr["education"]    = htmlspecialchars($_POST['education']);
$paramArr["tasktype"]     = htmlspecialchars($_POST['tasktype']);

$paramArr["pre_frustration"] = htmlspecialchars($_POST['dit-pre-frustration']);
$paramArr["pre_motivation"]  = htmlspecialchars($_POST['dit-pre-motivation']);
$paramArr["pre_arousal"]     = htmlspecialchars($_POST['dit-pre-arousal']);
$paramArr["pre_emostate"]    = htmlspecialchars($_POST['dit-pre-emostate']);

$results = $taskDAO->insert( $paramArr );

$_SESSION['id'] = $results[0];

print $results[0] . "/" . $results[1];

?>