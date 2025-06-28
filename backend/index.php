<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$apiInfo = [
    "name" => "Like This Redesign API",
    "version" => "1.0.0",
    "description" => "Backend API for Like This Redesign e-commerce platform",
    "endpoints" => [
        "Authentication" => [
            [
                "path" => "/api/auth/register.php",
                "method" => "POST",
                "description" => "Register a new user",
                "params" => ["username", "email", "password"]
            ],
            [
                "path" => "/api/auth/login.php",
                "method" => "POST",
                "description" => "Login user",
                "params" => ["email", "password"]
            ]
        ],
        "Products" => [
            [
                "path" => "/api/products/list.php",
                "method" => "GET",
                "description" => "Get list of products",
                "params" => ["page (optional)", "limit (optional)", "category (optional)"]
            ],
            [
                "path" => "/api/products/single.php",
                "method" => "GET",
                "description" => "Get single product details",
                "params" => ["id"]
            ]
        ],
        "Cart" => [
            [
                "path" => "/api/cart/add.php",
                "method" => "POST",
                "description" => "Add item to cart",
                "params" => ["user_id", "product_id", "quantity"]
            ],
            [
                "path" => "/api/cart/get.php",
                "method" => "GET",
                "description" => "Get user's cart items",
                "params" => ["user_id"]
            ],
            [
                "path" => "/api/cart/remove.php",
                "method" => "POST",
                "description" => "Remove item from cart",
                "params" => ["user_id", "cart_item_id"]
            ]
        ],
        "Checkout" => [
            [
                "path" => "/api/checkout/create.php",
                "method" => "POST",
                "description" => "Create a new order",
                "params" => ["user_id", "shipping_address", "payment_method"]
            ],
            [
                "path" => "/api/checkout/orders.php",
                "method" => "GET",
                "description" => "Get user's order history",
                "params" => ["user_id", "page (optional)", "limit (optional)"]
            ]
        ],
        "Contact" => [
            [
                "path" => "/api/contact/send.php",
                "method" => "POST",
                "description" => "Send contact message",
                "params" => ["name", "email", "subject (optional)", "message"]
            ]
        ]
    ],
    "requirements" => [
        "PHP" => ">=7.4",
        "MySQL" => ">=5.7",
        "Extensions" => ["pdo", "pdo_mysql", "json"]
    ],
    "setup" => [
        "1. Configure database credentials in config/config.php",
        "2. Import database schema from sql/database.sql",
        "3. Ensure proper permissions on uploads directory (if used)",
        "4. Configure CORS headers if needed"
    ]
];

echo json_encode($apiInfo, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
