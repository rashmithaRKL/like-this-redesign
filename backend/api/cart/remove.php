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
validateRequiredFields($data, ['user_id', 'cart_item_id']);

// Sanitize input
$userId = (int)sanitizeInput($data['user_id']);
$cartItemId = (int)sanitizeInput($data['cart_item_id']);

$db = new Database();
$conn = $db->getConnection();

try {
    // Start transaction
    $conn->beginTransaction();

    // Debug input values
    error_log("Removing from cart - User ID: " . $userId . ", Cart Item ID: " . $cartItemId);

    // Verify cart item belongs to user
    $stmt = $conn->prepare("SELECT * FROM cart_items WHERE id = ? AND user_id = ?");
    $stmt->execute([$cartItemId, $userId]);
    
    $cartItem = $stmt->fetch(PDO::FETCH_ASSOC);
    error_log("Cart item query result: " . print_r($cartItem, true));

    if (!$cartItem) {
        $conn->rollBack();
        sendError("Cart item not found", 404);
    }

    // Delete cart item
    $stmt = $conn->prepare("DELETE FROM cart_items WHERE id = ? AND user_id = ?");
    $stmt->execute([$cartItemId, $userId]);
    
    error_log("Deleted cart item. Rows affected: " . $stmt->rowCount());

    // Get updated cart items
    $stmt = $conn->prepare("
        SELECT 
            ci.id as cart_item_id,
            ci.quantity,
            p.id as product_id,
            p.name,
            p.price,
            p.image_url,
            p.stock
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.user_id = :user_id
        ORDER BY ci.created_at DESC
    ");
    
    $stmt->bindParam(":user_id", $userId);
    $stmt->execute();

    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate subtotals and total
    $total = 0;
    foreach ($cartItems as &$item) {
        // Convert price to float and quantity to int
        $item['price'] = (float)$item['price'];
        $item['quantity'] = (int)$item['quantity'];
        $item['stock'] = (int)$item['stock'];
        
        // Calculate subtotal
        $item['subtotal'] = $item['price'] * $item['quantity'];
        
        // Add to total
        $total += $item['subtotal'];
    }

    // Commit transaction
    $conn->commit();

    sendSuccess([
        'cart_items' => $cartItems,
        'total' => $total,
        'item_count' => count($cartItems)
    ], "Item removed from cart successfully");

} catch (PDOException $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
