<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/scrollingDAO.php";

$dbmanager   = new pdoDbManager ();
$scrollingDAO  = new scrollingDAO ( $dbmanager );
$dbmanager->openConnection();

$data = json_decode($_POST['data'],true);

for( $idx =0 ; $idx < count( $data ) ; $idx ++ ){
  $scrollingDAO->insert($data[$idx],$_SESSION['id']);
}

?>