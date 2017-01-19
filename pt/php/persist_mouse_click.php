<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/mouseClicksDAO.php";

$dbmanager   = new pdoDbManager ();
$mouseClicksDAO  = new mouseClicksDAO ( $dbmanager );
$dbmanager->openConnection();

$data = json_decode($_POST['data'],true);

for( $idx =0 ; $idx < count( $data ) ; $idx ++ ){
  $mouseClicksDAO->insert($data[$idx],$_SESSION['id']);
}

//print $mouseClicksDAO->insert($data[1],$_SESSION['id']);

?>