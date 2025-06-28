<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';
require_once '../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    sendError("Invalid request method", 405);
}

// Get posted data
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
validateRequiredFields($data, ['message_ids', 'status']);

// Validate message_ids is an array
if (!is_array($data['message_ids']) || empty($data['message_ids'])) {
    sendError("message_ids must be a non-empty array");
}

// Sanitize input
$messageIds = array_map('intval', $data['message_ids']);
$status = sanitizeInput($data['status']);

// Validate status
$validStatuses = ['unread', 'read', 'replied'];
if (!in_array($status, $validStatuses)) {
    sendError("Invalid status. Must be one of: " . implode(', ', $validStatuses));
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Start transaction
    $conn->beginTransaction();

    // Check if all messages exist
    $placeholders = str_repeat('?,', count($messageIds) - 1) . '?';
    $stmt = $conn->prepare("
        SELECT id 
        FROM contact_messages 
        WHERE id IN ($placeholders)
    ");
    $stmt->execute($messageIds);
    
    $foundIds = $stmt->fetchAll(PDO::FETCH_COLUMN);
    $missingIds = array_diff($messageIds, $foundIds);
    
    if (!empty($missingIds)) {
        $conn->rollBack();
        sendError("Some messages not found: " . implode(', ', $missingIds), 404);
    }

    // Update message statuses
    $stmt = $conn->prepare("
        UPDATE contact_messages 
        SET status = ? 
        WHERE id IN ($placeholders)
    ");
    
    $params = array_merge([$status], $messageIds);
    $stmt->execute($params);
    
    error_log("Updated status to '$status' for messages: " . implode(', ', $messageIds));

    // Get updated messages
    $stmt = $conn->prepare("
        SELECT id, name, email, subject, message, status, created_at 
        FROM contact_messages 
        WHERE id IN ($placeholders)
        ORDER BY created_at DESC
    ");
    
    $stmt->execute($messageIds);
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Commit transaction
    $conn->commit();

    sendSuccess([
        'updated_messages' => $messages,
        'message_count' => count($messages)
    ], "Messages status updated successfully");

} catch (PDOException $e) {
    if ($conn->inTransaction()) {
        $conn->rollBack();
    }
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
