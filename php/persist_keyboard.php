<?php
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/keyboardDAO.php";

$dbmanager   = new pdoDbManager ();
$keyboardDAO  = new keyboardDAO ( $dbmanager );
$dbmanager->openConnection();

$data = json_decode(stripslashes($_POST['data']),true);

for( $idx =0 ; $idx < count( $data ) ; $idx ++ ){
  $keyboardDAO->insert($data[$idx]);
}

?>