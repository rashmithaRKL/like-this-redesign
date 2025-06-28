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
validateRequiredFields($data, ['username', 'email', 'password']);

// Sanitize input
$username = sanitizeInput($data['username']);
$email = sanitizeInput($data['email']);
$password = $data['password'];

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendError("Invalid email format");
}

// Validate password strength
if (strlen($password) < 8) {
    sendError("Password must be at least 8 characters long");
}

// Hash password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$db = new Database();
$conn = $db->getConnection();

try {
    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->bindParam(":email", $email);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        sendError("Email already registered", 409);
    }

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (:username, :email, :password)");
    $stmt->bindParam(":username", $username);
    $stmt->bindParam(":email", $email);
    $stmt->bindParam(":password", $hashedPassword);
    
    if ($stmt->execute()) {
        $userId = $conn->lastInsertId();
        sendSuccess([
            "user" => [
                "id" => $userId,
                "username" => $username,
                "email" => $email
            ]
        ], "Registration successful", 201);
    } else {
        sendError("Registration failed", 500);
    }
} catch (PDOException $e) {
    sendError("Database error: " . $e->getMessage(), 500);
}
?>
