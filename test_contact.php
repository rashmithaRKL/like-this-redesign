<?php
echo "Testing contact form endpoints...\n";
echo "---------------------------\n\n";

// Test cases
$testCases = [
    [
        'name' => '1. Valid contact submission',
        'data' => [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Product Inquiry',
            'message' => 'I would like to know more about your products.'
        ],
        'expected_status' => 201
    ],
    [
        'name' => '2. Missing required fields',
        'data' => [
            'name' => 'John Doe',
            'email' => 'john@example.com'
            // Missing message field
        ],
        'expected_status' => 400
    ],
    [
        'name' => '3. Invalid email format',
        'data' => [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'subject' => 'Test Subject',
            'message' => 'Test message'
        ],
        'expected_status' => 400
    ],
    [
        'name' => '4. Message too short',
        'data' => [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Test',
            'message' => 'Hi'  // Less than 10 characters
        ],
        'expected_status' => 400
    ],
    [
        'name' => '5. Long valid submission',
        'data' => [
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'subject' => 'Detailed Product Feedback',
            'message' => str_repeat('This is a long message with detailed feedback about the products. ', 5)
        ],
        'expected_status' => 201
    ]
];

// Function to test contact form submission
function testContactSubmission($data) {
    $ch = curl_init('http://localhost:8000/backend/api/contact/send.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'status_code' => $httpCode,
        'response' => $response
    ];
}

// Run test cases
foreach ($testCases as $test) {
    echo "\n{$test['name']}:\n";
    echo "Sending data: " . json_encode($test['data'], JSON_PRETTY_PRINT) . "\n";
    
    $result = testContactSubmission($test['data']);
    
    echo "HTTP Status Code: {$result['status_code']} (Expected: {$test['expected_status']})\n";
    echo "Response:\n{$result['response']}\n";
    
    if ($result['status_code'] === $test['expected_status']) {
        echo "✓ Test passed\n";
    } else {
        echo "✗ Test failed - Expected status {$test['expected_status']}, got {$result['status_code']}\n";
    }
    echo "------------------------\n";
}

// Test updating message status
echo "\nTesting message status updates:\n";
echo "--------------------------------\n";

function testUpdateStatus($messageId, $status) {
    $ch = curl_init('http://localhost:8000/backend/api/contact/update-status.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'message_id' => $messageId,
        'status' => $status
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'status_code' => $httpCode,
        'response' => $response
    ];
}

// Test valid status update
echo "1. Marking message as read:\n";
$result = testUpdateStatus(1, 'read');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test invalid status
echo "2. Testing invalid status:\n";
$result = testUpdateStatus(1, 'invalid-status');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test non-existent message
echo "3. Testing non-existent message:\n";
$result = testUpdateStatus(999, 'read');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test marking as replied
echo "4. Marking message as replied:\n";
$result = testUpdateStatus(1, 'replied');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test search functionality
echo "\nTesting search functionality:\n";
echo "----------------------------\n";

function testSearch($params) {
    $queryString = http_build_query($params);
    $ch = curl_init('http://localhost:8000/backend/api/contact/search.php?' . $queryString);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'status_code' => $httpCode,
        'response' => $response
    ];
}

// Test 1: Search by keyword
echo "1. Searching for 'product':\n";
$result = testSearch(['q' => 'product']);
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test 2: Filter by status
echo "2. Filtering by status 'unread':\n";
$result = testSearch(['status' => 'unread']);
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test 3: Search with date range
echo "3. Searching with date range:\n";
$result = testSearch([
    'date_from' => date('Y-m-d'),
    'date_to' => date('Y-m-d')
]);
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test bulk update functionality
echo "\nTesting bulk update functionality:\n";
echo "--------------------------------\n";

function testBulkUpdate($messageIds, $status) {
    $ch = curl_init('http://localhost:8000/backend/api/contact/bulk-update.php');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
        'message_ids' => $messageIds,
        'status' => $status
    ]));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return [
        'status_code' => $httpCode,
        'response' => $response
    ];
}

// Test 1: Bulk update valid messages
echo "1. Bulk updating multiple messages to 'read':\n";
$result = testBulkUpdate([3, 4], 'read');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test 2: Bulk update with invalid message IDs
echo "2. Testing with non-existent message IDs:\n";
$result = testBulkUpdate([999, 1000], 'read');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Test 3: Bulk update with invalid status
echo "3. Testing with invalid status:\n";
$result = testBulkUpdate([3, 4], 'invalid-status');
echo "HTTP Status Code: {$result['status_code']}\n";
echo "Response:\n{$result['response']}\n\n";

// Get final list of all messages
echo "Final list of all messages:\n";
$ch = curl_init('http://localhost:8000/backend/api/contact/list.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo "HTTP Status Code: " . $httpCode . "\n";
echo "Response:\n" . $response . "\n";
?>
