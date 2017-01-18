<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/taskDAO.php";

$dbmanager   = new pdoDbManager ();
$taskDAO  = new taskDAO ( $dbmanager );
$dbmanager->openConnection();

$paramArr = array();

$paramArr["mwl_mental"]      = htmlspecialchars($_POST['dit-mwl-mental']);
$paramArr["mwl_physical"]    = htmlspecialchars($_POST['dit-mwl-physical']);
$paramArr["mwl_temporal"]    = htmlspecialchars($_POST['dit-mwl-temporal']);
$paramArr["mwl_performance"] = htmlspecialchars($_POST['dit-mwl-performance']);
$paramArr["mwl_effort"]      = htmlspecialchars($_POST['dit-mwl-effort']);
$paramArr["mwl_frustration"] = htmlspecialchars($_POST['dit-mwl-frustration']);
$paramArr["mwl_mwl"]         = htmlspecialchars($_POST['dit-mwl-mwl']);
$paramArr["mwl_parallelism"] = htmlspecialchars($_POST['dit-mwl-parallelism']);
$paramArr["mwl_manualact"]   = htmlspecialchars($_POST['dit-mwl-manualact']);
$paramArr["mwl_visualact"]   = htmlspecialchars($_POST['dit-mwl-visualact']);
$paramArr["mwl_solvedec"]    = htmlspecialchars($_POST['dit-mwl-solvedec']);
$paramArr["mwl_context"]     = htmlspecialchars($_POST['dit-mwl-context']);
$paramArr["mwl_motivation"]  = htmlspecialchars($_POST['dit-mwl-motivation']);
$paramArr["mwl_skill"]       = htmlspecialchars($_POST['dit-mwl-skill']);
$paramArr["mwl_knowledge"]   = htmlspecialchars($_POST['dit-mwl-knowledge']);
$paramArr["mwl_alertness"]   = htmlspecialchars($_POST['dit-mwl-alertness']);
$paramArr["mwl_taskspace"]   = htmlspecialchars($_POST['dit-mwl-taskspace']);
$paramArr["mwl_verbalmat"]   = htmlspecialchars($_POST['dit-mwl-verbalmat']);
$paramArr["mwl_auditoryatt"] = htmlspecialchars($_POST['dit-mwl-auditoryatt']);
$paramArr["mwl_speechresp"]  = htmlspecialchars($_POST['dit-mwl-speechresp']);
$paramArr["mwl_responsesel"] = htmlspecialchars($_POST['dit-mwl-responsesel']);

$results = $taskDAO->updateMWL( $paramArr, $_SESSION['id']  );


?>