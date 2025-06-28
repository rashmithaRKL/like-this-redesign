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

// Get search parameters
$query = isset($_GET['q']) ? sanitizeInput($_GET['q']) : '';
$status = isset($_GET['status']) ? sanitizeInput($_GET['status']) : '';
$dateFrom = isset($_GET['date_from']) ? sanitizeInput($_GET['date_from']) : '';
$dateTo = isset($_GET['date_to']) ? sanitizeInput($_GET['date_to']) : '';
$page = isset($_GET['page']) ? (int)sanitizeInput($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? (int)sanitizeInput($_GET['limit']) : 10;
$offset = ($page - 1) * $limit;

$db = new Database();
$conn = $db->getConnection();

try {
    // Build query conditions
    $conditions = [];
    $params = [];
    
    if ($query) {
        $conditions[] = "(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)";
        $searchTerm = "%$query%";
        $params = array_merge($params, [$searchTerm, $searchTerm, $searchTerm, $searchTerm]);
    }
    
    if ($status) {
        $conditions[] = "status = ?";
        $params[] = $status;
    }
    
    if ($dateFrom) {
        $conditions[] = "created_at >= ?";
        $params[] = $dateFrom;
    }
    
    if ($dateTo) {
        $conditions[] = "created_at <= ?";
        $params[] = $dateTo . ' 23:59:59';
    }
    
    $whereClause = $conditions ? 'WHERE ' . implode(' AND ', $conditions) : '';

    // Get total count
    $countQuery = "SELECT COUNT(*) as total FROM contact_messages " . $whereClause;
    $stmt = $conn->prepare($countQuery);
    $stmt->execute($params);
    $totalMessages = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get messages
    $query = "
        SELECT id, name, email, subject, message, status, created_at 
        FROM contact_messages 
        " . $whereClause . "
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
    ";

    $stmt = $conn->prepare($query);
    
    // Bind all parameters
    foreach ($params as $index => $param) {
        $stmt->bindValue($index + 1, $param);
    }
    $paramCount = count($params);
    $stmt->bindValue($paramCount + 1, $limit, PDO::PARAM_INT);
    $stmt->bindValue($paramCount + 2, $offset, PDO::PARAM_INT);
    
    $stmt->execute();
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate pagination info
    $totalPages = ceil($totalMessages / $limit);

    error_log("Search query: " . ($query ? $query : 'none') . ", Found: $totalMessages messages");

    sendSuccess([
        'messages' => $messages,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_messages' => $totalMessages,
            'limit' => $limit
        ],
        'filters' => [
            'query' => $query,
            'status' => $status,
            'date_from' => $dateFrom,
            'date_to' => $dateTo
        ]
    ]);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
