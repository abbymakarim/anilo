# Kanban Board 

_To Run_
```
    npm install & npx nodemon app.js
```

## Available endpoints
- `POST /login`
- `POST /order`
- `PATCH /confrim`
- `PATCH /cancel`
- `GET /customer/check`
- `GET /admin/check`

## RESTful endpoints

### POST /login
_Request Header_
```
    not needed
```
_Request Body_
```
{
    username : "user1",
}
```
_Response (200 - OK)_
```
{
    "access_token" : "<access_token>"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid Username"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /order
_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
  "product_id": 1,
  "product": "product A",
  "quantity": 5,
  "user_data": {
    "name": "user",
    "phone_number": "08123456789",
    "email": "user@mail.com",
    "address": "Jl.User 13"
  }
}
```
_Response (201 - OK)_
```
{
    "message" : "Order Created"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### PATCH /confrim
_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
  "order_id": 1,
}
```
_Response (200 - OK)_
```
{
    "message" : "Order Shipped"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### PATCH /cancel
_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
  "order_id": 1,
}
```
_Response (200 - OK)_
```
{
    "message" : "Order Canceled"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### GET /customer/check
_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
  "order_id": 1,
}
```
_Response (200 - OK)_
```
{
  "status": "canceled"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### GET /admin/check
_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
  "order_id": 1,
}
```
_Response (200 - OK)_
```
{
  "id": 2,
  "userId": "7",
  "status": "canceled",
  "user_data": {
    "name": "user",
    "phone_number": "08123456789",
    "email": "user@mail.com",
    "address": "Jl.User 13"
  },
  "createdAt": "2021-07-30T03:54:59.645Z",
  "updatedAt": "2021-07-30T04:15:27.932Z"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```