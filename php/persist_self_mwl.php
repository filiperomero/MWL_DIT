<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/taskDAO.php";

$dbmanager   = new pdoDbManager ();
$taskDAO  = new taskDAO ( $dbmanager );
$dbmanager->openConnection();

$paramArr = array();

// dit-mwl-mwl
$paramArr["mwl_mental"]      = htmlspecialchars($_POST['dit-mwl-mental']);
$paramArr["mwl_physical"]    = htmlspecialchars($_POST['dit-mwl-physical']);
$paramArr["mwl_temporal"]    = htmlspecialchars($_POST['dit-mwl-temporal']);
$paramArr["mwl_performance"] = htmlspecialchars($_POST['dit-mwl-performance']);
$paramArr["mwl_effort"]      = htmlspecialchars($_POST['dit-mwl-effort']);
$paramArr["mwl_frustration"] = htmlspecialchars($_POST['dit-mwl-frustration']);
// dit-mwl-parallelism
// dit-mwl-manualact
// dit-mwl-visualact
// dit-mwl-solvedec
// dit-mwl-context
// dit-mwl-motivation
// dit-mwl-skill
// dit-mwl-knowledge
// dit-mwl-alertness

$results = $taskDAO->updateMWL( $paramArr, $_SESSION['id']  );


?>