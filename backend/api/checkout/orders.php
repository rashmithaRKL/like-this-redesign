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

// Get pagination parameters
$page = isset($_GET['page']) ? (int)sanitizeInput($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? (int)sanitizeInput($_GET['limit']) : 10;
$offset = ($page - 1) * $limit;

$db = new Database();
$conn = $db->getConnection();

try {
    // Get total count of orders
    $countStmt = $conn->prepare("
        SELECT COUNT(*) as total 
        FROM orders 
        WHERE user_id = :user_id
    ");
    $countStmt->bindParam(":user_id", $userId);
    $countStmt->execute();
    $totalOrders = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get orders with pagination
    $stmt = $conn->prepare("
        SELECT 
            o.id as order_id,
            o.total_amount,
            o.status,
            o.shipping_address,
            o.payment_method,
            o.created_at,
            COUNT(oi.id) as total_items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        WHERE o.user_id = :user_id
        GROUP BY o.id
        ORDER BY o.created_at DESC
        LIMIT :limit OFFSET :offset
    ");

    $stmt->bindParam(":user_id", $userId);
    $stmt->bindParam(":limit", $limit, PDO::PARAM_INT);
    $stmt->bindParam(":offset", $offset, PDO::PARAM_INT);
    $stmt->execute();

    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get order items for each order
    foreach ($orders as &$order) {
        $stmt = $conn->prepare("
            SELECT 
                oi.product_id,
                oi.quantity,
                oi.price_at_time,
                p.name as product_name,
                p.image_url
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = :order_id
        ");

        $stmt->bindParam(":order_id", $order['order_id']);
        $stmt->execute();
        $order['items'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Format numbers
        $order['total_amount'] = (float)$order['total_amount'];
        foreach ($order['items'] as &$item) {
            $item['price_at_time'] = (float)$item['price_at_time'];
            $item['quantity'] = (int)$item['quantity'];
            $item['subtotal'] = $item['price_at_time'] * $item['quantity'];
        }
    }

    // Calculate pagination info
    $totalPages = ceil($totalOrders / $limit);

    sendSuccess([
        'orders' => $orders,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_orders' => $totalOrders,
            'limit' => $limit
        ]
    ]);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
