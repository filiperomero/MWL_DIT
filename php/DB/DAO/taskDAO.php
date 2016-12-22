<?php
class taskDAO {

    private $dbManager;

    function taskDAO ( $DBMngr ) {
        $this->dbManager = $DBMngr;
    }

    public function insert($parametersArray) {
        // chech witch interface should be applied
        $sqlFirst  = "select (select count(*) from task where tasktype = ? and interface = 1) as interface1, ";
        $sqlFirst .=        "(select count(*) from task where tasktype = ? and interface = 2) as interface2 ";

        
        $statement = $this->dbManager->prepareQuery ( $sqlFirst );
        $this->dbManager->bindValue ( $statement, 1, $parametersArray ["tasktype"] , $this->dbManager->INT_TYPE ); 
        $this->dbManager->bindValue ( $statement, 2, $parametersArray ["tasktype"] , $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $statement );
        $results = $this->dbManager->fetchResults ( $statement );
        
        $interface = 1;
        
        if ($results[0]["interface2"] < $results[0]["interface1"]) {
           $interface = 2;
        }
        
        // insertion assumes that all the required parameters are defined and set
        $sql = "INSERT INTO task (gender, age, nationality, expertise, education, tasktype, interface) ";
        $sql .= "VALUES (?,?,?,?,?,?,?) ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["gender"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $parametersArray ["age"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 3, $parametersArray ["nationality"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 4, $parametersArray ["expertise"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 5, $parametersArray ["education"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 6, $parametersArray ["tasktype"], $this->dbManager->INT_TYPE );
        $this->dbManager->bindValue ( $stmt, 7, $interface,                    $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return (array($this->dbManager->getLastInsertedID (),$interface));
        //return ($this->dbManager->getLastInsertedID ());
    }
    
    public function setStartDate($id) {
       
        // update assumes that all the required parameters are defined and set
        $sql = "UPDATE task ";
        $sql .= "SET start_time = CURRENT_TIMESTAMP ";
        $sql .= " WHERE id = ? ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return "done!!!";
    }
    
    public function setEndDate($id) {
       
        // update assumes that all the required parameters are defined and set
        $sql = "UPDATE task ";
        $sql .= "SET end_time = CURRENT_TIMESTAMP ";
        $sql .= " WHERE id = ? ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return "done!!!";
    }
    
    public function updateEmail($parametersArray, $id) {
        // Update assumes that all the required parameters are defined and set
        $sql = "UPDATE task  ";
        $sql .= " SET email = ? ";
        $sql .= " WHERE id = ? ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["email"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return "done!!!";
    }
    
    public function updateMWL($parametersArray, $id) {
        // Update assumes that all the required parameters are defined and set
        $sql = "UPDATE task  ";
        $sql .= " SET task.mwl_mental = ? ";
        $sql .= " , task.mwl_physical = ? ";
        $sql .= " , task.mwl_temporal = ? ";
        $sql .= " , task.mwl_performance = ? ";
        $sql .= " , task.mwl_effort = ? ";
        $sql .= " , task.mwl_frustration = ? ";
        $sql .= " WHERE task.id = ? ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["mwl_mental"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $parametersArray ["mwl_physical"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 3, $parametersArray ["mwl_temporal"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 4, $parametersArray ["mwl_performance"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 5, $parametersArray ["mwl_effort"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 6, $parametersArray ["mwl_frustration"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 7, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return "done!!!";
    }
    
    public function updateTask1Survey($parametersArray, $id) {
        // Update assumes that all the required parameters are defined and set
        $sql = "UPDATE task  ";
        $sql .= " SET task1_survey = ? ";
        $sql .= " WHERE id = ? ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["task1survey"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return "done!!!";
    }
    
    public function updateTask2Survey($parametersArray, $id) {
        // Update assumes that all the required parameters are defined and set
        $sql = "UPDATE task  ";
        $sql .= " SET task2_survey_q1 = ? ";
        $sql .= " , task2_survey_q2 = ? ";
        $sql .= " WHERE id = ? ";
        
        $stmt = $this->dbManager->prepareQuery ( $sql );
        $this->dbManager->bindValue ( $stmt, 1, $parametersArray ["task2Q1"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 2, $parametersArray ["task2Q2"], $this->dbManager->STRING_TYPE );
        $this->dbManager->bindValue ( $stmt, 3, $id, $this->dbManager->INT_TYPE );
        $this->dbManager->executeQuery ( $stmt );

        return "done!!!";
    }
}
?>
