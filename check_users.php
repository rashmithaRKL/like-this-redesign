<?php
require_once 'backend/config/config.php';

try {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $db->query('SELECT id, username, email, password FROM users');
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Users in database:\n";
    echo "----------------\n";
    foreach ($users as $user) {
        echo "ID: " . $user['id'] . "\n";
        echo "Username: " . $user['username'] . "\n";
        echo "Email: " . $user['email'] . "\n";
        echo "Password Hash: " . $user['password'] . "\n";
        echo "----------------\n";
    }
    
} catch(PDOException $e) {
    die("Database error: " . $e->getMessage() . "\n");
}
?>
