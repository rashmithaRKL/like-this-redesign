<?php
function sendResponse($data, $status = 200) {
    http_response_code($status);
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    echo json_encode($data);
    exit();
}

function sendError($message, $status = 400) {
    sendResponse([
        "status" => "error",
        "message" => $message
    ], $status);
}

function sendSuccess($data = null, $message = "Success", $status = 200) {
    $response = [
        "status" => "success",
        "message" => $message
    ];
    
    if ($data !== null) {
        $response["data"] = $data;
    }
    
    sendResponse($response, $status);
}

// Validate required fields in request data
function validateRequiredFields($data, $required_fields) {
    foreach ($required_fields as $field) {
        if (!isset($data[$field])) {
            sendError("Missing required field: {$field}");
        }
        
        // Handle array values differently
        if (is_array($data[$field])) {
            if (empty($data[$field])) {
                sendError("Field {$field} cannot be empty");
            }
        } else {
            if (empty(trim($data[$field]))) {
                sendError("Field {$field} cannot be empty");
            }
        }
    }
}

// Sanitize input data
function sanitizeInput($data) {
    if (is_array($data)) {
        return array_map('sanitizeInput', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)));
}
?>
