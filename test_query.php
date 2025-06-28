<?php
require_once 'backend/config/config.php';

try {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $productId = 1;
    
    // Try different query variations
    echo "Testing different query variations:\n";
    echo "--------------------------------\n\n";
    
    // Test 1: Using string ID
    $stmt = $db->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$productId]);
    echo "Test 1 (parameter binding): " . $stmt->rowCount() . " rows\n";
    var_dump($stmt->fetch(PDO::FETCH_ASSOC));
    echo "\n";
    
    // Test 2: Direct query
    $result = $db->query("SELECT * FROM products WHERE id = 1");
    echo "Test 2 (direct query): " . $result->rowCount() . " rows\n";
    var_dump($result->fetch(PDO::FETCH_ASSOC));
    echo "\n";
    
    // Test 3: List all products
    $result = $db->query("SELECT * FROM products");
    echo "Test 3 (all products): " . $result->rowCount() . " rows\n";
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo "ID: " . $row['id'] . ", Name: " . $row['name'] . "\n";
    }
    
} catch(PDOException $e) {
    die("Database error: " . $e->getMessage() . "\n");
}
?>
