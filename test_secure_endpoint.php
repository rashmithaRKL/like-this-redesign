<?php
echo "Testing secure contact list endpoint...\n";
echo "-----------------------------------\n\n";

// Generate test admin token
$adminPayload = [
    'user_id' => 1,
    'role' => 'admin',
    'exp' => time() + 3600 // Valid for 1 hour
];
$adminToken = base64_encode(json_encode($adminPayload));

// Generate test user token
$userPayload = [
    'user_id' => 2,
    'role' => 'user',
    'exp' => time() + 3600
];
$userToken = base64_encode(json_encode($userPayload));

// Generate expired token
$expiredPayload = [
    'user_id' => 3,
    'role' => 'admin',
    'exp' => time() - 3600 // Expired 1 hour ago
];
$expiredToken = base64_encode(json_encode($expiredPayload));

// Test cases
$tests = [
    [
        'name' => '1. No authentication',
        'token' => null
    ],
    [
        'name' => '2. Invalid token format',
        'token' => 'invalid-token'
    ],
    [
        'name' => '3. Expired token',
        'token' => $expiredToken
    ],
    [
        'name' => '4. Non-admin user token',
        'token' => $userToken
    ],
    [
        'name' => '5. Valid admin token',
        'token' => $adminToken
    ]
];

// Run tests
foreach ($tests as $test) {
    echo "\n{$test['name']}:\n";
    
    $ch = curl_init('http://localhost:8000/backend/api/contact/list_secure.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $headers = ['Content-Type: application/json'];
    if ($test['token']) {
        $headers[] = "Authorization: Bearer {$test['token']}";
    }
    
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    echo "Status Code: $httpCode\n";
    echo "Response:\n$response\n";
    echo "------------------------\n";
}

// Test rate limiting
echo "\nTesting rate limiting:\n";
echo "Making rapid requests with valid admin token...\n";

// Make 10 rapid requests
for ($i = 0; $i < 10; $i++) {
    $ch = curl_init('http://localhost:8000/backend/api/contact/list_secure.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        "Authorization: Bearer $adminToken"
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $responseData = json_decode($response, true);
    curl_close($ch);
    
    echo "Request " . ($i + 1) . " - Status Code: $httpCode\n";
    if ($httpCode === 429) {
        echo "Rate limit exceeded as expected!\n";
        if ($responseData && isset($responseData['retry_after'])) {
            echo "Retry after: {$responseData['retry_after']} seconds\n";
        }
        break;
    }
    
    // No delay between requests to trigger rate limiting
}

// Wait for rate limit to reset
echo "\nWaiting 10 seconds for rate limit to reset...\n";
sleep(10);

// Try one more request after waiting
echo "\nTrying one more request after rate limit reset:\n";
$ch = curl_init('http://localhost:8000/backend/api/contact/list_secure.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    "Authorization: Bearer $adminToken"
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "Final request - Status Code: $httpCode\n";

echo "\nAll tests completed.\n";
?>
