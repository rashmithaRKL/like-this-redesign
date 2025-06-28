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

// Get product ID from URL parameter
if (!isset($_GET['id']) || empty($_GET['id'])) {
    sendError("Product ID is required", 400);
}

$productId = sanitizeInput($_GET['id']);

// Validate product ID is numeric
if (!is_numeric($productId)) {
    sendError("Invalid product ID", 400);
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Get product details
    // Debug: Log the product ID we're looking for
    error_log("Looking for product ID: " . $productId);

    // Debug: Log the SQL query
    $sql = "SELECT * FROM products WHERE id = ?";
    error_log("SQL Query: " . $sql . " with ID: " . $productId);
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([$productId]);
    
    // Fetch the product
    $product = $stmt->fetch(PDO::FETCH_ASSOC);
    error_log("Fetched product: " . print_r($product, true));

    if (!$product) {
        sendError("Product not found", 404);
    }

    // Format price as float
    $product['price'] = (float)$product['price'];
    $product['stock'] = (int)$product['stock'];

    // Get related products in the same category (optional)
    $relatedStmt = $conn->prepare("
        SELECT id, name, price, image_url 
        FROM products 
        WHERE category = :category 
        AND id != :id 
        LIMIT 4
    ");

    $relatedStmt->bindParam(":category", $product['category']);
    $relatedStmt->bindParam(":id", $productId);
    $relatedStmt->execute();

    $relatedProducts = $relatedStmt->fetchAll(PDO::FETCH_ASSOC);

    // Format response
    $response = [
        'product' => $product,
        'related_products' => $relatedProducts
    ];

    sendSuccess($response);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
