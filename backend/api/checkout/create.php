<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';
require_once '../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError("Invalid request method", 405);
}

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
validateRequiredFields($data, [
    'user_id',
    'shipping_address',
    'payment_method'
]);

// Sanitize input
$userId = (int)sanitizeInput($data['user_id']);
$shippingAddress = sanitizeInput($data['shipping_address']);
$paymentMethod = sanitizeInput($data['payment_method']);

$db = new Database();
$conn = $db->getConnection();

try {
    // Start transaction
    $conn->beginTransaction();

    // Debug input values
    error_log("Creating order - User ID: " . $userId . ", Payment Method: " . $paymentMethod);

    // Get cart items with current prices
    $stmt = $conn->prepare("
        SELECT 
            ci.id as cart_item_id,
            ci.product_id,
            ci.quantity,
            p.price,
            p.stock,
            p.name
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = ?
    ");
    
    $stmt->execute([$userId]);
    
    // Debug cart items
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    error_log("Cart items found: " . print_r($cartItems, true));

    if (empty($cartItems)) {
        $conn->rollBack();
        sendError("Cart is empty", 400);
    }

    // Calculate total and verify stock
    $total = 0;
    $stockErrors = [];

    foreach ($cartItems as $item) {
        // Check stock availability
        if ($item['quantity'] > $item['stock']) {
            $stockErrors[] = "Not enough stock for {$item['name']}. Available: {$item['stock']}";
            continue;
        }

        $total += $item['price'] * $item['quantity'];
    }

    if (!empty($stockErrors)) {
        $conn->rollBack();
        sendError("Stock availability issues: " . implode(", ", $stockErrors), 400);
    }

    // Create order
    $stmt = $conn->prepare("
        INSERT INTO orders (
            user_id, 
            total_amount, 
            status, 
            shipping_address,
            payment_method
        ) VALUES (?, ?, 'pending', ?, ?)
    ");

    $stmt->execute([$userId, $total, $shippingAddress, $paymentMethod]);
    error_log("Order created with total amount: " . $total);

    $orderId = $conn->lastInsertId();

    // Create order items and update stock
    foreach ($cartItems as $item) {
        // Insert order item
        $stmt = $conn->prepare("
            INSERT INTO order_items (
                order_id, 
                product_id, 
                quantity, 
                price_at_time
            ) VALUES (?, ?, ?, ?)
        ");

        $stmt->execute([
            $orderId,
            $item['product_id'],
            $item['quantity'],
            $item['price']
        ]);

        // Update product stock
        $stmt = $conn->prepare("
            UPDATE products 
            SET stock = stock - ? 
            WHERE id = ?
        ");

        $stmt->execute([$item['quantity'], $item['product_id']]);
        error_log("Updated stock for product ID: " . $item['product_id'] . ", New quantity: " . $item['quantity']);
    }

    // Clear user's cart
    $stmt = $conn->prepare("DELETE FROM cart_items WHERE user_id = ?");
    $stmt->execute([$userId]);
    error_log("Cleared cart for user ID: " . $userId);

    // Get order details
    $stmt = $conn->prepare("
        SELECT 
            o.*,
            oi.product_id,
            oi.quantity,
            oi.price_at_time,
            p.name as product_name,
            p.image_url
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN products p ON oi.product_id = p.id
        WHERE o.id = ?
    ");
    
    $stmt->execute([$orderId]);
    error_log("Fetching details for order ID: " . $orderId);

    $orderItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Format order details
    $orderDetails = [
        'order_id' => $orderId,
        'total_amount' => $total,
        'status' => 'pending',
        'shipping_address' => $shippingAddress,
        'payment_method' => $paymentMethod,
        'created_at' => date('Y-m-d H:i:s'),
        'items' => $orderItems
    ];

    // Commit transaction
    $conn->commit();

    sendSuccess([
        'order' => $orderDetails
    ], "Order created successfully", 201);

} catch (PDOException $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
