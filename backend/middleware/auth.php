<?php
// Basic authentication middleware
function requireAuth() {
    // Get authorization token from headers
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : null;

    if (!$authHeader || !preg_match('/^Bearer\s+(.*)$/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'No authorization token provided'
        ]);
        exit();
    }

    $token = $matches[1];

    try {
        // Decode token (simple base64 for demo)
        $payload = json_decode(base64_decode($token), true);
        
        if (!isset($payload['user_id']) || !isset($payload['exp'])) {
            throw new Exception('Invalid token format');
        }

        if ($payload['exp'] < time()) {
            throw new Exception('Token has expired');
        }

        // Add user info to request
        $_REQUEST['auth_user'] = $payload;
        return true;

    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid authorization token: ' . $e->getMessage()
        ]);
        exit();
    }
}

// Admin role check
function requireAdmin() {
    requireAuth();
    $user = $_REQUEST['auth_user'];
    
    if (!isset($user['role']) || $user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode([
            'status' => 'error',
            'message' => 'Admin access required'
        ]);
        exit();
    }
    return true;
}

// Rate limiting
function checkRateLimit($userId, $limit = 5, $period = 10) {
    $cacheFile = sys_get_temp_dir() . "/rate_limit_{$userId}.json";
    
    $rateData = [];
    if (file_exists($cacheFile)) {
        $rateData = json_decode(file_get_contents($cacheFile), true);
    }

    $now = time();
    $rateData = array_filter($rateData, function($timestamp) use ($now, $period) {
        return ($now - $timestamp) < $period;
    });

    if (count($rateData) >= $limit) {
        http_response_code(429);
        echo json_encode([
            'status' => 'error',
            'message' => 'Rate limit exceeded. Please try again later.',
            'retry_after' => $period - ($now - min($rateData))
        ]);
        exit();
    }

    $rateData[] = $now;
    file_put_contents($cacheFile, json_encode($rateData));
    return true;
}

// CORS handling
function handleCors() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    }

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
}

// Enhanced input sanitization
function secureSanitize($data) {
    if (is_array($data)) {
        return array_map('secureSanitize', $data);
    }
    $data = strip_tags($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return trim($data);
}
?>
