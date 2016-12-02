<?php
class scrollingDAO {

	private $dbManager;
	
	function scrollingDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}

	public function insert($parametersArray) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO scrolling (timeStamp, scrollTop) ";
		$sql .= "VALUES (?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
        
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["timeStamp"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 2, $parametersArray ["scrollTop"], $this->dbManager->INT_TYPE );
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
