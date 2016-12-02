<?php
class mousePosDAO {

	private $dbManager;
	
	function mousePosDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}

	public function insert($parametersArray) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO mouse_pos (timeStamp, x, y, height, width) ";
		$sql .= "VALUES (?,?,?,?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
        
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["timeStamp"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 2, $parametersArray ["xPos"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 3, $parametersArray ["yPos"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 4, $parametersArray ["yHeight"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 5, $parametersArray ["xWidth"], $this->dbManager->INT_TYPE );
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
