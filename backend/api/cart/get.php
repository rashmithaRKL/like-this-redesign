<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';
require_once '../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError("Invalid request method", 405);
}

// Get user ID from URL parameter
if (!isset($_GET['user_id']) || empty($_GET['user_id'])) {
    sendError("User ID is required", 400);
}

$userId = (int)sanitizeInput($_GET['user_id']);

$db = new Database();
$conn = $db->getConnection();

try {
    // Get cart items with product details
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

        // Check if quantity exceeds current stock
        if ($item['quantity'] > $item['stock']) {
            $item['stock_warning'] = true;
        }
    }

    sendSuccess([
        'cart_items' => $cartItems,
        'total' => $total,
        'item_count' => count($cartItems)
    ]);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
