<?php
/*
Database Connection
*/
    class dbConnect{
        private $servername = 'localhost';
        private $username = "root";
        private $password = "password";
        private $dbname = "users";

        public function connect(){
            try {
                $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->dbname);
                return $conn;
            } catch (\Exception $e) {
                die("Database Error: " . $e->mysqli_connect_error());
            }
        }
    }
    
?>