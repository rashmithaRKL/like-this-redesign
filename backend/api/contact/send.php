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
validateRequiredFields($data, ['name', 'email', 'message']);

// Sanitize input
$name = sanitizeInput($data['name']);
$email = sanitizeInput($data['email']);
$subject = isset($data['subject']) ? sanitizeInput($data['subject']) : '';
$message = sanitizeInput($data['message']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendError("Invalid email format");
}

// Validate message length
if (strlen($message) < 10) {
    sendError("Message must be at least 10 characters long");
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Insert contact message
    $stmt = $conn->prepare("
        INSERT INTO contact_messages (
            name,
            email,
            subject,
            message,
            status
        ) VALUES (
            :name,
            :email,
            :subject,
            :message,
            'unread'
        )
    ");

    $stmt->bindParam(":name", $name);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":subject", $subject);
    $stmt->bindParam(":message", $message);
    
    $stmt->execute();
    $messageId = $conn->lastInsertId();

    // Optional: Send email notification to admin
    // This is a basic example - in production, use a proper email service
    $adminEmail = "admin@example.com"; // Replace with actual admin email
    $emailSubject = "New Contact Form Submission";
    $emailBody = "
        New contact form submission received:\n
        From: $name ($email)\n
        Subject: $subject\n
        Message: $message
    ";
    
    // Uncomment to enable email notification
    // mail($adminEmail, $emailSubject, $emailBody);

    sendSuccess([
        'message_id' => $messageId,
        'timestamp' => date('Y-m-d H:i:s')
    ], "Message sent successfully", 201);

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
