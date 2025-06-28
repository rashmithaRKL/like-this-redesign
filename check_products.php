<?php
require_once 'backend/config/config.php';

try {
    $db = new PDO('sqlite:' . DB_FILE);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $db->query('SELECT * FROM products');
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Products in database:\n";
    echo "-------------------\n";
    foreach ($products as $product) {
        echo "ID: " . $product['id'] . "\n";
        echo "Name: " . $product['name'] . "\n";
        echo "Price: $" . $product['price'] . "\n";
        echo "Stock: " . $product['stock'] . "\n";
        echo "Category: " . $product['category'] . "\n";
        echo "-------------------\n";
    }
    
    echo "\nTotal products: " . count($products) . "\n";
    
} catch(PDOException $e) {
    die("Database error: " . $e->getMessage() . "\n");
}
?>
