<?php
// Database configuration - Using SQLite
define('DB_TYPE', 'sqlite');
define('DB_FILE', __DIR__ . '/../database.sqlite');

// Other configuration constants
define('JWT_SECRET', 'your-secret-key'); // For JWT token generation
define('UPLOAD_DIR', __DIR__ . '/../uploads/'); // For file uploads
?>
