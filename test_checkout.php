<?php
echo "Testing checkout endpoints...\n";
echo "-------------------------\n\n";

// Test data
$userId = 1;
$shippingAddress = "123 Test St, Test City, 12345";
$paymentMethod = "credit_card";

// 1. Create an order
echo "1. Creating order:\n";
$orderData = array(
    'user_id' => $userId,
    'shipping_address' => $shippingAddress,
    'payment_method' => $paymentMethod
);

$ch = curl_init('http://localhost:8000/backend/api/checkout/create.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($orderData));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n\n";

// 2. Get order history
echo "2. Getting order history:\n";
$ch = curl_init('http://localhost:8000/backend/api/checkout/orders.php?user_id=' . $userId);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n";
?>
