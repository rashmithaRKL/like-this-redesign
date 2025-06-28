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
validateRequiredFields($data, ['message_id', 'status']);

// Sanitize input
$messageId = (int)sanitizeInput($data['message_id']);
$status = sanitizeInput($data['status']);

// Validate status
$validStatuses = ['unread', 'read', 'replied'];
if (!in_array($status, $validStatuses)) {
    sendError("Invalid status. Must be one of: " . implode(', ', $validStatuses));
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Check if message exists
    $stmt = $conn->prepare("SELECT id FROM contact_messages WHERE id = ?");
    $stmt->execute([$messageId]);
    
    if (!$stmt->fetch()) {
        sendError("Message not found", 404);
    }

    // Update message status
    $stmt = $conn->prepare("UPDATE contact_messages SET status = ? WHERE id = ?");
    $stmt->execute([$status, $messageId]);

    error_log("Updated message $messageId status to: $status");

    // Get updated message
    $stmt = $conn->prepare("
        SELECT id, name, email, subject, message, status, created_at 
        FROM contact_messages 
        WHERE id = ?
    ");
    $stmt->execute([$messageId]);
    $message = $stmt->fetch(PDO::FETCH_ASSOC);

    sendSuccess([
        'message' => $message
    ], "Message status updated successfully");

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
