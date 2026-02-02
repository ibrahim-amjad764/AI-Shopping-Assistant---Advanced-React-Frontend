# 🔧 Backend API Documentation - Spring Boot

Complete API documentation for Spring Boot backend implementation.

## 📋 Table of Contents

1. [Authentication APIs](#authentication-apis)
2. [Product APIs](#product-apis)
3. [Search APIs](#search-apis)
4. [Favorites APIs](#favorites-apis)
5. [Database Schema](#database-schema)

---

## 🔐 Authentication APIs

### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### POST /api/auth/login
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### GET /api/auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

---

## 📦 Product APIs

### GET /api/products
Get all products with optional filters.

**Query Parameters:**
- `limit` (optional): Number of products to return
- `featured` (optional): Boolean - return only featured products
- `page` (optional): Page number for pagination
- `sort` (optional): Sort by (price, rating, name)

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "price": 134900,
      "originalPrice": 149900,
      "image": "https://example.com/image.jpg",
      "rating": 4.5,
      "reviewsCount": 1234,
      "description": "Latest iPhone with A17 Pro chip",
      "specs": {
        "ram": "8GB",
        "storage": "256GB",
        "battery": "3279 mAh",
        "camera": "48MP",
        "display": "6.1 inch",
        "processor": "A17 Pro"
      }
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

### GET /api/products/{id}
Get product by ID.

**Response (200):**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "brand": "Apple",
  "price": 134900,
  "originalPrice": 149900,
  "image": "https://example.com/image.jpg",
  "rating": 4.5,
  "reviewsCount": 1234,
  "description": "Latest iPhone with A17 Pro chip",
  "specs": {
    "ram": "8GB",
    "storage": "256GB",
    "battery": "3279 mAh",
    "camera": "48MP",
    "display": "6.1 inch",
    "processor": "A17 Pro"
  }
}
```

---

### GET /api/products/{id}/price-history
Get price history for a product.

**Response (200):**
```json
[
  {
    "date": "2024-01-01",
    "price": 149900
  },
  {
    "date": "2024-01-15",
    "price": 144900
  },
  {
    "date": "2024-02-01",
    "price": 139900
  },
  {
    "date": "2024-02-15",
    "price": 134900
  }
]
```

---

## 🔍 Search APIs

### GET /api/search
Search products with advanced filters.

**Query Parameters:**
- `query` (required): Search query string
- `brand` (optional): Comma-separated brands (e.g., "Apple,Samsung")
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `minRating` (optional): Minimum rating (e.g., 4.0)
- `storage` (optional): Comma-separated storage options (e.g., "128GB,256GB")
- `ram` (optional): Comma-separated RAM options (e.g., "8GB,12GB")
- `battery` (optional): Minimum battery capacity in mAh

**Example:**
```
GET /api/search?query=phone&brand=Apple&minPrice=20000&maxPrice=80000&minRating=4&storage=128GB,256GB&ram=8GB
```

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "price": 134900,
      ...
    }
  ],
  "total": 5
}
```

---

### GET /api/search/suggestions
Get search suggestions for autocomplete.

**Query Parameters:**
- `query` (required): Search query (minimum 2 characters)

**Example:**
```
GET /api/search/suggestions?query=iph
```

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "iPhone 13",
    "brand": "Apple"
  },
  {
    "id": 2,
    "name": "iPhone 14",
    "brand": "Apple"
  },
  {
    "id": 3,
    "name": "iPhone 15",
    "brand": "Apple"
  }
]
```

---

## ❤️ Favorites APIs

All favorites APIs require authentication (JWT token in header).

### GET /api/favorites
Get all favorite products for current user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "iPhone 15 Pro",
      "brand": "Apple",
      "price": 134900,
      ...
    }
  ]
}
```

---

### POST /api/favorites/{productId}
Add product to favorites.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Product added to favorites",
  "productId": 1
}
```

---

### DELETE /api/favorites/{productId}
Remove product from favorites.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "message": "Product removed from favorites",
  "productId": 1
}
```

---

### GET /api/favorites/{productId}/check
Check if product is in favorites.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "isFavorite": true,
  "productId": 1
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100),
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    image_url VARCHAR(500),
    rating DECIMAL(3, 2),
    reviews_count INT DEFAULT 0,
    description TEXT,
    ram VARCHAR(50),
    storage VARCHAR(50),
    battery VARCHAR(50),
    camera VARCHAR(100),
    display VARCHAR(100),
    processor VARCHAR(100),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Price History Table
```sql
CREATE TABLE price_history (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id BIGINT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_product_date (product_id, date)
);
```

### Favorites Table
```sql
CREATE TABLE favorites (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product (user_id, product_id)
);
```

---

## 🔑 JWT Configuration

### Required Dependencies (pom.xml)
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>
```

### JWT Secret Configuration (application.properties)
```properties
jwt.secret=your-secret-key-minimum-256-bits
jwt.expiration=86400000
```

---

## 🛡️ Security Configuration

### CORS Configuration
```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

---

## 📝 Error Responses

All error responses follow this format:

**400 Bad Request:**
```json
{
  "message": "Invalid request parameters",
  "timestamp": "2024-01-01T12:00:00"
}
```

**401 Unauthorized:**
```json
{
  "message": "Unauthorized - Invalid or expired token",
  "timestamp": "2024-01-01T12:00:00"
}
```

**404 Not Found:**
```json
{
  "message": "Product not found",
  "timestamp": "2024-01-01T12:00:00"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Internal server error",
  "timestamp": "2024-01-01T12:00:00"
}
```

---

## 🚀 Implementation Tips

1. **JWT Token**: Generate token on login/register, include user ID and email
2. **Password Hashing**: Use BCryptPasswordEncoder for password hashing
3. **Price History**: Update price history daily via scheduled task
4. **Search**: Use full-text search or Elasticsearch for better performance
5. **Caching**: Implement Redis caching for frequently accessed products
6. **Pagination**: Always paginate large result sets

---

**Ready to implement! 🎉**

