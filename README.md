# Like This Redesign - Full Stack E-commerce Project

A modern e-commerce platform built with React/TypeScript frontend and PHP/MySQL backend.

## Project Structure

```
├── backend/                # PHP Backend API
│   ├── api/               # API endpoints
│   │   ├── auth/         # Authentication endpoints
│   │   ├── products/     # Product endpoints
│   │   ├── cart/         # Shopping cart endpoints
│   │   ├── checkout/     # Order processing endpoints
│   │   └── contact/      # Contact form endpoint
│   ├── config/           # Configuration files
│   ├── helpers/          # Helper functions
│   └── sql/              # Database schema
├── public/               # Static assets
└── src/                  # React/TypeScript frontend
    ├── components/       # React components
    ├── hooks/            # Custom React hooks
    ├── lib/              # Utility functions
    └── pages/            # Page components
```

## Backend Setup

1. Configure Database:
   ```bash
   # Create database and import schema
   mysql -u root -p < backend/sql/database.sql
   ```

2. Configure Database Connection:
   - Edit `backend/config/config.php`
   - Update database credentials:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_NAME', 'like_this_redesign');
     define('DB_USER', 'your_username');
     define('DB_PASS', 'your_password');
     ```

3. Server Requirements:
   - PHP >= 7.4
   - MySQL >= 5.7
   - PHP Extensions: PDO, pdo_mysql, json

4. Configure Web Server:
   - Point document root to project directory
   - Ensure proper permissions on uploads directory (if used)
   - Configure CORS headers if needed

## Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure API endpoint:
   - Update API base URL in your environment configuration

3. Run development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register.php` - Register new user
- POST `/api/auth/login.php` - User login

### Products
- GET `/api/products/list.php` - Get products list
- GET `/api/products/single.php?id={id}` - Get single product

### Cart
- POST `/api/cart/add.php` - Add item to cart
- GET `/api/cart/get.php?user_id={id}` - Get cart items
- POST `/api/cart/remove.php` - Remove item from cart

### Checkout
- POST `/api/checkout/create.php` - Create order
- GET `/api/checkout/orders.php?user_id={id}` - Get order history

### Contact
- POST `/api/contact/send.php` - Send contact message

## API Response Format

Success Response:
```json
{
    "status": "success",
    "message": "Operation successful",
    "data": {
        // Response data
    }
}
```

Error Response:
```json
{
    "status": "error",
    "message": "Error message"
}
```

## Frontend Integration

Example of API integration in React:

```typescript
// src/lib/api.ts

const API_BASE_URL = 'http://your-api-domain/api';

export async function login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

export async function getProducts(page = 1, limit = 10) {
    const response = await fetch(
        `${API_BASE_URL}/products/list.php?page=${page}&limit=${limit}`
    );
    return response.json();
}

// Add more API functions as needed
```

## Security Considerations

1. Input Validation:
   - All user inputs are sanitized and validated
   - Prepared statements used for database queries

2. Authentication:
   - Passwords are hashed using PHP's password_hash()
   - Session management for authenticated users

3. CORS:
   - Proper CORS headers configured for API endpoints

4. Error Handling:
   - Proper error messages without exposing sensitive information
   - All database errors are logged appropriately

## Development Workflow

1. Backend Development:
   - Implement API endpoints
   - Test with Postman or similar tools
   - Document API changes

2. Frontend Development:
   - Implement UI components
   - Integrate with API endpoints
   - Test user flows

3. Testing:
   - Test API endpoints
   - Test frontend integration
   - Cross-browser testing

## Deployment

1. Backend:
   - Configure production database
   - Set up proper error handling
   - Configure secure CORS settings

2. Frontend:
   - Build production bundle:
     ```bash
     npm run build
     ```
   - Deploy static files to web server

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
