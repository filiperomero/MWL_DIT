<?php
class mousePosDAO {

	private $dbManager;
	
	function mousePosDAO ( $DBMngr ) {
		$this->dbManager = $DBMngr;
	}

	public function insert($parametersArray, $id) {
		// insertion assumes that all the required parameters are defined and set
		$sql = "INSERT INTO mouse_pos (taskId, timeStamp, x, y, height, width) ";
		$sql .= "VALUES (?,?,?,?,?,?) ";
		
		$stmt = $this->dbManager->prepareQuery ( $sql );
        
        $this->dbManager->bindValue ( $stmt, 1, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $parametersArray ["timeStamp"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 3, $parametersArray ["xPos"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 4, $parametersArray ["yPos"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 5, $parametersArray ["yHeight"], $this->dbManager->INT_TYPE );
		$this->dbManager->bindValue ( $stmt, 6, $parametersArray ["xWidth"], $this->dbManager->INT_TYPE );
		$this->dbManager->executeQuery ( $stmt );
		
		return "inseriu!!!";
	}
	
}
?>
