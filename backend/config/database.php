<?php
require_once 'config.php';

class Database {
    private $connection;

    public function getConnection() {
        try {
            $this->connection = new PDO(
                "sqlite:" . DB_FILE,
                null,
                null,
                array(
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                )
            );
            
            // Enable foreign key support for SQLite
            $this->connection->exec('PRAGMA foreign_keys = ON');
            return $this->connection;
        } catch(PDOException $exception) {
            http_response_code(500);
            echo json_encode(array(
                "status" => "error",
                "message" => "Database connection error: " . $exception->getMessage()
            ));
            exit();
        }
    }
}
?>
