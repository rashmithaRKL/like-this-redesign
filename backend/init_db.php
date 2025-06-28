<?php
require_once 'config/config.php';

try {
    // Remove existing database file if it exists
    if (file_exists(DB_FILE)) {
        unlink(DB_FILE);
        echo "Removed existing database file.\n";
    }

    // Create new SQLite database
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Enable foreign keys
    $db->exec('PRAGMA foreign_keys = ON');
    
    // Read and execute the schema
    $schema = file_get_contents(__DIR__ . '/sql/sqlite_schema.sql');
    $db->exec($schema);
    
    echo "Database initialized successfully!\n";
    echo "Database file created at: " . DB_FILE . "\n";
    
} catch(PDOException $e) {
    die("Database initialization failed: " . $e->getMessage() . "\n");
}
?>
