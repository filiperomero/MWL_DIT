<?php
class GeneralDAO {

	private $dbManager;
	
	function GeneralDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}
	
	public function getSomething() {
		$sql = "SELECT A ";
		$sql .= "FROM Test ";

		$stmt = $this->dbManager->prepareQuery ( $sql );
		$this->dbManager->executeQuery ( $stmt );
		$rows = $this->dbManager->fetchResults ( $stmt );
	
		return ($rows);
	}

	public function insert($parametersArray) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO Test (A, B) ";
		$sql .= "VALUES (?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
		$this->dbManager->bindValue ( $stmt, 1, $parametersArray ["x"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 2, $parametersArray ["y"], $this->dbManager->INT_TYPE );
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
