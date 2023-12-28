# REST API for CRUD Application without API frameworks (express, hapi.js, etc)  

This is a simple REST API that handles simple CRUD operation for a user data. The data is stored in a **runtime database** in `data/db.ts`. This program also used typescript. Below is the model for user.

```
export interface User {
    id: number;
    name: string;
    email: string;
    dob: string;
}
```

# Usage

1. **Get All user**  
- URL: `/users`  
- Method: `GET`  
- Description: Retrieves all users.

example: `GET` on `localhost:8080/users`
```
[
    {
        "id": 1,
        "name": "Intial User",
        "email": "user@test.com",
        "dob": "01/01/2001"
    },
    {
        "id": 2,
        "name": "bram",
        "email": "user@test.com",
        "dob": "19/19/1999"
    }
]
```

2. **Get User By Id**  
- URL: `/users/{id}`  
- Method: `GET`  
- Description: Retrieves user with specified id.

example: `GET` on `localhost:8080/users/2`
```
{
    "id": 2,
    "name": "bram",
    "email": "user@test.com",
    "dob": "19/19/1999"
}
```
or If the User doesn't exist. ex: `localhost:8080/user/99`
```
{
    "error": "User Not Found"
}
```

3. **Create User**
URL: `/user`  
Method: `POST`  
Description: Create a user.

example: `POST` on `localhost:8080/user`
```
{
    "id": 3,
    "name": "data3",
    "email": "user@test.com",
    "dob": "19/19/2000"
}
```
The user data will be shown if created successfuly. Or if the data is not compatible with user model will return:
```
{
    "error": "Invalid User Data "
}
```

4. **Update User**
- URL: `/user/{id}`  
- Method: `PUT`  
- Description: update a user with new user.

example: `PUT` on `localhost:8080/user/1`  
- Request Body:
```
{
    "id": 2,
    "name": "data3",
    "email": "user@test.com",
    "dob": "19/19/2000"
}
```
- Response Body:
```
{
    "id": 2,
    "name": "data3",
    "email": "user@test.com",
    "dob": "19/19/2000"
}
```

5. **Delete User**
- URL: `/user/{id}`  
- Method: `DELETE`  
- Description: Delete a User with specified 1.

example: `DELETE` on `localhost:8080/user/2`  
```
[
    {
        "id": 1,
        "name": "Intial User",
        "email": "user@test.com",
        "dob": "01/01/2001"
    }
]
```
If the id doesn't exist will return:
```
{
    "error": "User Not Found"
}
```