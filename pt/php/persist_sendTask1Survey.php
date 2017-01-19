<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/taskDAO.php";

$dbmanager   = new pdoDbManager ();
$taskDAO  = new taskDAO ( $dbmanager );
$dbmanager->openConnection();

$paramArr = array();

/*
$paramArr["task1survey"] = htmlspecialchars($_POST['Question1']) . "/" . htmlspecialchars($_POST['Question2']);

$paramArr["task1survey"] = htmlspecialchars($_POST['dit-task1-survey']);

if(strlen( $paramArr["task1survey"] ) > 4000) {
    $paramArr["task1survey"] = substr($paramArr["task1survey"],4000);
}
*/

$paramArr["task1Q1"] = htmlspecialchars($_POST['Question1']);
$paramArr["task1Q2"] = htmlspecialchars($_POST['Question2']);

$results = $taskDAO->updateTask1Survey($paramArr, $_SESSION['id']);

//print $paramArr["task1Q1"] . "/" . $paramArr["task1Q2"];
//print $results;

?>