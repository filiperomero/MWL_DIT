<?php
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/mousePosDAO.php";

$dbmanager   = new pdoDbManager ();
$mousePosDAO  = new mousePosDAO ( $dbmanager );
$dbmanager->openConnection();

$data = json_decode(stripslashes($_POST['data']),true);

for( $idx =0 ; $idx < count( $data ) ; $idx ++ ){
  $mousePosDAO->insert($data[$idx]);
}

?>