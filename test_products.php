<?php
echo "Testing products endpoints...\n";
echo "----------------------------\n\n";

// Test getting all products
echo "1. Getting all products:\n";
$ch = curl_init('http://localhost:8000/backend/api/products/list.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n\n";

// Test getting a single product
echo "2. Getting single product (ID: 1):\n";
$ch = curl_init('http://localhost:8000/backend/api/products/single.php?id=1');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n";
?>
