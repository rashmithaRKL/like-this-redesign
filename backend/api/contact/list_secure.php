<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

require_once '../../config/database.php';
require_once '../../helpers/response.php';
require_once '../../middleware/auth.php';

// Handle CORS
handleCors();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError("Invalid request method", 405);
}

try {
    // Require admin authentication
    requireAdmin();

    // Get authenticated user info
    $user = $_REQUEST['auth_user'];

    // Apply rate limiting
    checkRateLimit($user['user_id']);

    // Get pagination parameters
    $page = isset($_GET['page']) ? (int)secureSanitize($_GET['page']) : 1;
    $limit = isset($_GET['limit']) ? (int)secureSanitize($_GET['limit']) : 10;
    $offset = ($page - 1) * $limit;

    $db = new Database();
    $conn = $db->getConnection();

    // Get total count
    $stmt = $conn->query("SELECT COUNT(*) as total FROM contact_messages");
    $totalMessages = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    // Get messages with pagination
    $stmt = $conn->prepare("
        SELECT id, name, email, subject, message, status, created_at 
        FROM contact_messages 
        ORDER BY created_at DESC 
        LIMIT ? OFFSET ?
    ");
    
    $stmt->execute([$limit, $offset]);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Calculate pagination info
    $totalPages = ceil($totalMessages / $limit);

    // Log access
    error_log("Admin user {$user['user_id']} accessed contact messages list");

    sendSuccess([
        'messages' => $messages,
        'pagination' => [
            'current_page' => $page,
            'total_pages' => $totalPages,
            'total_messages' => $totalMessages,
            'limit' => $limit
        ],
        'user' => [
            'id' => $user['user_id'],
            'role' => $user['role']
        ]
    ]);

} catch (PDOException $e) {
    error_log("Database error in contact list: " . $e->getMessage());
    sendError("Database error: " . $e->getMessage(), 500);
} catch (Exception $e) {
    error_log("Authentication error: " . $e->getMessage());
    sendError($e->getMessage(), 401);
}
?>
