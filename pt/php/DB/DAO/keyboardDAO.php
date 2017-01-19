<?php
class keyboardDAO {

	private $dbManager;
	
	function keyboardDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}

	public function insert($parametersArray, $id) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO keyboard (taskId, timeStamp, keyPressed) ";
		$sql .= "VALUES (?,?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
        
        $this->dbManager->bindValue ( $stmt, 1, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $parametersArray ["timeStamp"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 3, $parametersArray ["keyPressed"], $this->dbManager->INT_STRING);
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
