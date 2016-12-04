<?php
session_start();
require_once "conf/config.inc.php";

require_once ROOT_DIR. "/DB/pdoDbManager.php";
require_once ROOT_DIR. "/DB/DAO/GeneralDAO.php";

$dbmanager   = new pdoDbManager ();
$generalDAO  = new generalDAO ( $dbmanager );
$dbmanager->openConnection();

//echo "<h1>Keep rocking in the free world ".$generalDAO->getSomething()[0]["A"]."</h1>";

$data = json_decode(stripslashes($_POST['data']),true);
//$data = json_decode(file_get_contents('php://input'), true);
//print_r($data);
//echo $data;

for( $idx =0 ; $idx < count( $data ) ; $idx ++ ){
  $generalDAO->insert($data[$idx]);
  //echo $data[$idx]["timeStampaa"];
}

//print $data[0]["timeStamp"];
//print $generalDAO->insert($data[0]);
//print implode(",", $data[0]) ;
//print  count( $data[0] );
//print $data[0][0];
//print "##########ola2#########";
//print var_dump(json_decode(file_get_contents('php://input'), true));

?>