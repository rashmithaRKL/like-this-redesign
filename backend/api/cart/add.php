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
validateRequiredFields($data, ['user_id', 'product_id', 'quantity']);

// Sanitize and validate input
$userId = (int)sanitizeInput($data['user_id']);
$productId = (int)sanitizeInput($data['product_id']);
$quantity = (int)sanitizeInput($data['quantity']);

// Validate quantity
if ($quantity < 1) {
    sendError("Quantity must be at least 1");
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Start transaction
    $conn->beginTransaction();

    // Debug input values
    error_log("Adding to cart - User ID: " . $userId . ", Product ID: " . $productId . ", Quantity: " . $quantity);

    // Check if product exists and has enough stock
    $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
    $stmt->execute([$productId]);
    
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    error_log("Product query result: " . print_r($product, true));

    if (!$product) {
        $conn->rollBack();
        sendError("Product not found", 404);
    }

    if ((int)$product['stock'] < $quantity) {
        $conn->rollBack();
        sendError("Not enough stock available. Requested: $quantity, Available: " . $product['stock'], 400);
    }

    // Check if item already exists in cart
    $stmt = $conn->prepare("
        SELECT id, quantity 
        FROM cart_items 
        WHERE user_id = :user_id 
        AND product_id = :product_id
    ");
    $stmt->bindParam(":user_id", $userId);
    $stmt->bindParam(":product_id", $productId);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        // Update existing cart item
        $cartItem = $stmt->fetch(PDO::FETCH_ASSOC);
        $newQuantity = $cartItem['quantity'] + $quantity;

        if ($product['stock'] < $newQuantity) {
            $conn->rollBack();
            sendError("Not enough stock available for requested quantity", 400);
        }

        $stmt = $conn->prepare("
            UPDATE cart_items 
            SET quantity = :quantity 
            WHERE id = :id
        ");
        $stmt->bindParam(":quantity", $newQuantity);
        $stmt->bindParam(":id", $cartItem['id']);
        $stmt->execute();
    } else {
        // Insert new cart item
        $stmt = $conn->prepare("
            INSERT INTO cart_items (user_id, product_id, quantity) 
            VALUES (:user_id, :product_id, :quantity)
        ");
        $stmt->bindParam(":user_id", $userId);
        $stmt->bindParam(":product_id", $productId);
        $stmt->bindParam(":quantity", $quantity);
        $stmt->execute();
    }

    // Commit transaction
    $conn->commit();

    // Get updated cart items
    $stmt = $conn->prepare("
        SELECT ci.*, p.name, p.price, p.image_url 
        FROM cart_items ci 
        JOIN products p ON ci.product_id = p.id 
        WHERE ci.user_id = :user_id
    ");
    $stmt->bindParam(":user_id", $userId);
    $stmt->execute();

    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Calculate total
    $total = 0;
    foreach ($cartItems as &$item) {
        $item['subtotal'] = $item['quantity'] * $item['price'];
        $total += $item['subtotal'];
    }

    sendSuccess([
        'cart_items' => $cartItems,
        'total' => $total
    ], "Item added to cart successfully");

} catch (PDOException $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
