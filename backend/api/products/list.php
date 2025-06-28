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

$db = new Database();
$conn = $db->getConnection();

try {
    // Handle pagination
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;
    $offset = ($page - 1) * $limit;

    // Handle category filter
    $categoryFilter = "";
    $params = [];
    if (isset($_GET['category']) && !empty($_GET['category'])) {
        $categoryFilter = "WHERE category = :category";
        $params[':category'] = sanitizeInput($_GET['category']);
    }

    // Get total count for pagination
    $countQuery = "SELECT COUNT(*) as total FROM products " . $categoryFilter;
    $countStmt = $conn->prepare($countQuery);
    if (!empty($params)) {
        $countStmt->execute($params);
    } else {
        $countStmt->execute();
    }
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get products with pagination
    $query = "SELECT id, name, description, price, image_url, stock, category 
             FROM products 
             $categoryFilter 
             ORDER BY created_at DESC 
             LIMIT :limit OFFSET :offset";

    $stmt = $conn->prepare($query);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    
    if (!empty($params)) {
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
    }

    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate total pages
    $totalPages = ceil($totalCount / $limit);

    sendSuccess([
        'products' => $products,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_items' => $totalCount,
            'limit' => $limit
        ]
    ]);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
