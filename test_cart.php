<?php
echo "Testing cart endpoints...\n";
echo "----------------------\n\n";

// Test data
$userId = 1;
$productId = 1;
$quantity = 2;

// 1. Add item to cart
echo "1. Adding item to cart:\n";
$addData = array(
    'user_id' => $userId,
    'product_id' => $productId,
    'quantity' => $quantity
);

$ch = curl_init('http://localhost:8000/backend/api/cart/add.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($addData));
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n\n";

// 2. Get cart items
echo "2. Getting cart items:\n";
$ch = curl_init('http://localhost:8000/backend/api/cart/get.php?user_id=' . $userId);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n\n";

// 3. Remove item from cart (only if add was successful)
if ($httpCode === 200) {
    $cartData = json_decode($response, true);
    if (isset($cartData['data']['cart_items'][0]['cart_item_id'])) {
        echo "3. Removing item from cart:\n";
        $removeData = array(
            'user_id' => $userId,
            'cart_item_id' => $cartData['data']['cart_items'][0]['cart_item_id']
        );

        $ch = curl_init('http://localhost:8000/backend/api/cart/remove.php');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($removeData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        echo "HTTP Status Code: " . $httpCode . "\n";
        echo "Response:\n" . $response . "\n";
    }
}
?>
