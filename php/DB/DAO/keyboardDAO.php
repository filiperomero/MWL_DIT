<?php
class keyboardDAO {

	private $dbManager;
	
	function keyboardDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}

	public function insert($parametersArray) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO keyboard (timeStamp, keyPressed) ";
		$sql .= "VALUES (?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
        
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["timeStamp"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 2, $parametersArray ["keyPressed"], $this->dbManager->INT_STRING);
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
