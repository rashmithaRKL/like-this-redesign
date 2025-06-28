<?php
echo "Testing authentication middleware...\n";
echo "--------------------------------\n\n";

// Function to generate a test token
function generateTestToken($userId, $role = 'user', $expireIn = 3600) {
    $payload = [
        'user_id' => $userId,
        'role' => $role,
        'exp' => time() + $expireIn
    ];
    return base64_encode(json_encode($payload));
}

// Function to make authenticated request
function makeAuthRequest($endpoint, $token = null, $method = 'GET') {
    $ch = curl_init("http://localhost:8000/backend/api/{$endpoint}");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $headers = ['Content-Type: application/json'];
    if ($token) {
        $headers[] = "Authorization: Bearer {$token}";
    }
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    if ($method !== 'GET') {
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'status_code' => $httpCode,
        'response' => $response
    ];
}

// Test cases
echo "1. Access without token:\n";
$result = makeAuthRequest('contact/list.php');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

echo "2. Access with invalid token:\n";
$result = makeAuthRequest('contact/list.php', 'invalid-token');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

echo "3. Access with expired token:\n";
$expiredToken = generateTestToken(1, 'admin', -3600); // Token expired 1 hour ago
$result = makeAuthRequest('contact/list.php', $expiredToken);
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

echo "4. Access with user role (non-admin):\n";
$userToken = generateTestToken(1, 'user');
$result = makeAuthRequest('contact/list.php', $userToken);
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

echo "5. Access with admin role:\n";
$adminToken = generateTestToken(1, 'admin');
$result = makeAuthRequest('contact/list.php', $adminToken);
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test rate limiting
echo "6. Testing rate limiting:\n";
echo "Making multiple requests in quick succession...\n";
$token = generateTestToken(1, 'admin');
for ($i = 0; $i < 5; $i++) {
    $result = makeAuthRequest('contact/list.php', $token);
    echo "Request " . ($i + 1) . " - Status Code: {$result['status_code']}\n";
    if ($result['status_code'] === 429) {
        echo "Rate limit exceeded as expected\n";
        break;
    }
    // Small delay to simulate realistic requests
    usleep(100000); // 100ms delay
}

echo "\nAll authentication tests completed.\n";
?>
