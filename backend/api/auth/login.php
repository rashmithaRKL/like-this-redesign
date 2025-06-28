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
validateRequiredFields($data, ['email', 'password']);

// Sanitize input
$email = sanitizeInput($data['email']);
$password = $data['password'];

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendError("Invalid email format");
}

$db = new Database();
$conn = $db->getConnection();

try {
    // Get user by email
    $stmt = $conn->prepare("SELECT id, username, email, password FROM users WHERE email = :email");
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    
    if ($stmt->rowCount() === 0) {
        sendError("Invalid email or password", 401);
    }

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // Verify password
    if (!password_verify($password, $user['password'])) {
        sendError("Invalid email or password", 401);
    }

    // Generate JWT token (you'll need to implement this)
    $token = generateToken($user['id']);

    // Remove password from user data
    unset($user['password']);

    sendSuccess([
        "user" => $user,
        "token" => $token
    ], "Login successful");

} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}

// Function to generate JWT token
function generateToken($userId) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 60 * 60 * 24; // 24 hours
    
    $payload = array(
        "user_id" => $userId,
        "iat" => $issuedAt,
        "exp" => $expirationTime
    );
    
    // In a real application, you should use a proper JWT library
    // This is a simplified example
    return base64_encode(json_encode($payload));
}
?>
