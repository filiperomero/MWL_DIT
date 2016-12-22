<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/taskDAO.php";

$dbmanager   = new pdoDbManager ();
$taskDAO  = new taskDAO ( $dbmanager );
$dbmanager->openConnection();

$paramArr = []; 

$paramArr["task2Q1"] = htmlspecialchars($_POST['Question1']);
$paramArr["task2Q2"] = htmlspecialchars($_POST['Question2']);

$results = $taskDAO->updateTask2Survey($paramArr, $_SESSION['id']);

?>