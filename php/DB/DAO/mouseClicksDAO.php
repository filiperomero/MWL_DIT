<?php
class mouseClicksDAO {

	private $dbManager;
	
	function mouseClicksDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}

	public function insert($parametersArray) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO mouse_clicks (timeStamp, x, y, vizElement) ";
		$sql .= "VALUES (?,?,?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
        
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["timeStamp"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 2, $parametersArray ["x"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 3, $parametersArray ["y"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 4, $parametersArray ["vizElement"], $this->dbManager->STRING_TYPE );
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
