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
    
}
?>
