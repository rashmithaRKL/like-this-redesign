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

// Get pagination parameters
$page = isset($_GET['page']) ? (int)sanitizeInput($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? (int)sanitizeInput($_GET['limit']) : 10;
$offset = ($page - 1) * $limit;

// Get filter parameters
$status = isset($_GET['status']) ? sanitizeInput($_GET['status']) : null;

$db = new Database();
$conn = $db->getConnection();

try {
    // Build query based on filters
    $whereClause = "";
    $params = [];
    
    if ($status) {
        $whereClause = "WHERE status = ?";
        $params[] = $status;
    }

    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM contact_messages " . $whereClause;
    $stmt = $conn->prepare($countQuery);
    $stmt->execute($params);
    $totalMessages = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get messages with pagination
    $query = "
        SELECT id, name, email, subject, message, status, created_at 
        FROM contact_messages 
        " . $whereClause . "
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
    ";

    $stmt = $conn->prepare($query);
    
    // Bind parameters for filters and pagination
    foreach ($params as $index => $param) {
        $stmt->bindValue($index + 1, $param);
    }
    $stmt->bindValue(count($params) + 1, $limit, PDO::PARAM_INT);
    $stmt->bindValue(count($params) + 2, $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate pagination info
    $totalPages = ceil($totalMessages / $limit);

    sendSuccess([
        'messages' => $messages,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_messages' => $totalMessages,
            'limit' => $limit
        ]
    ]);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
