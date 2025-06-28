# Like This Redesign API Documentation

## Base URL
All API endpoints are relative to: `http://your-domain/backend/api/`

## Authentication
Currently, the API uses simple user ID-based authentication. In a production environment, you should implement proper JWT or session-based authentication.

## Response Format
All endpoints return JSON responses in the following format:

### Success Response
```json
{
    "status": "success",
    "message": "Operation successful",
    "data": {
        // Response data specific to the endpoint
    }
}
```

### Error Response
```json
{
    "status": "error",
    "message": "Error description"
}
```

## HTTP Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 405: Method Not Allowed
- 500: Internal Server Error

## Endpoints

### Contact Form Management

#### 1. Submit Contact Message
```
POST /contact/send.php
```

Submit a new contact form message.

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Product Inquiry",
    "message": "I would like to know more about your products."
}
```

**Validation:**
- name: Required
- email: Required, valid email format
- message: Required, minimum 10 characters
- subject: Optional

**Success Response (201):**
```json
{
    "status": "success",
    "message": "Message sent successfully",
    "data": {
        "message_id": "1",
        "timestamp": "2025-06-28 07:40:10"
    }
}
```

#### 2. List Contact Messages
```
GET /contact/list.php
```

Get a paginated list of contact messages.

**Query Parameters:**
- page: (optional) Page number, default: 1
- limit: (optional) Items per page, default: 10

**Success Response:**
```json
{
    "status": "success",
    "message": "Success",
    "data": {
        "messages": [
            {
                "id": "1",
                "name": "John Doe",
                "email": "john@example.com",
                "subject": "Product Inquiry",
                "message": "Message content",
                "status": "unread",
                "created_at": "2025-06-28 07:40:10"
            }
        ],
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_messages": 1,
            "limit": 10
        }
    }
}
```

#### 3. Search Messages
```
GET /contact/search.php
```

Search and filter contact messages.

**Query Parameters:**
- q: (optional) Search query
- status: (optional) Filter by status (unread/read/replied)
- date_from: (optional) Start date (YYYY-MM-DD)
- date_to: (optional) End date (YYYY-MM-DD)
- page: (optional) Page number
- limit: (optional) Items per page

**Success Response:**
```json
{
    "status": "success",
    "message": "Success",
    "data": {
        "messages": [...],
        "pagination": {
            "current_page": 1,
            "total_pages": 1,
            "total_messages": 5,
            "limit": 10
        },
        "filters": {
            "query": "search term",
            "status": "unread",
            "date_from": "2025-06-28",
            "date_to": "2025-06-28"
        }
    }
}
```

#### 4. Update Message Status
```
PUT /contact/update-status.php
```

Update the status of a single message.

**Request Body:**
```json
{
    "message_id": 1,
    "status": "read"
}
```

**Valid Status Values:**
- unread
- read
- replied

**Success Response:**
```json
{
    "status": "success",
    "message": "Message status updated successfully",
    "data": {
        "message": {
            "id": "1",
            "name": "John Doe",
            "email": "john@example.com",
            "subject": "Product Inquiry",
            "message": "Message content",
            "status": "read",
            "created_at": "2025-06-28 07:40:10"
        }
    }
}
```

#### 5. Bulk Update Message Status
```
PUT /contact/bulk-update.php
```

Update the status of multiple messages at once.

**Request Body:**
```json
{
    "message_ids": [1, 2, 3],
    "status": "read"
}
```

**Success Response:**
```json
{
    "status": "success",
    "message": "Messages status updated successfully",
    "data": {
        "updated_messages": [...],
        "message_count": 3
    }
}
```

## Error Handling

### Common Error Responses

1. Invalid Request Method
```json
{
    "status": "error",
    "message": "Invalid request method"
}
```

2. Missing Required Field
```json
{
    "status": "error",
    "message": "Missing required field: field_name"
}
```

3. Invalid Email Format
```json
{
    "status": "error",
    "message": "Invalid email format"
}
```

4. Message Not Found
```json
{
    "status": "error",
    "message": "Message not found"
}
```

5. Invalid Status
```json
{
    "status": "error",
    "message": "Invalid status. Must be one of: unread, read, replied"
}
```

## Best Practices

1. **Rate Limiting**
   - Consider implementing rate limiting in production
   - Recommended: 100 requests per minute per IP

2. **Authentication**
   - Implement proper authentication in production
   - Use JWT or session-based authentication
   - Secure all sensitive endpoints

3. **Input Validation**
   - All inputs are sanitized
   - Email format is validated
   - Message length is checked
   - Status values are validated

4. **Error Handling**
   - All errors return appropriate HTTP status codes
   - Error messages are clear and actionable
   - Sensitive information is never exposed in errors

## Testing

A comprehensive test suite is provided in `test_contact.php`. Run the tests using:
```bash
php test_contact.php
```

The test suite covers:
- Message submission
- Input validation
- Status updates
- Search functionality
- Bulk operations
- Error cases

## Future Enhancements

Potential improvements that could be added:

1. **Authentication**
   - JWT implementation
   - Role-based access control
   - API key support

2. **Message Management**
   - Message categories
   - Priority levels
   - Auto-responder
   - Email notifications

3. **Search & Filter**
   - Advanced search operators
   - Custom date ranges
   - Multiple status filters
   - Sort options

4. **Performance**
   - Response caching
   - Query optimization
   - Batch processing

5. **Analytics**
   - Message statistics
   - Response time tracking
   - User engagement metrics
