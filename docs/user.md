# User API Spec

### User API only accessible with **SUPERADMIN** credentials

## Get User

Endpoint : GET /users

Response Success (200):

```json
{
  "data" : [
    {
      "id" : string,
      "username" : string,
      "fullname" : string,
      "role" : ROLES
    },
    {
      "id" : string,
      "username" : string,
      "fullname" : string,
      "role" : ROLES
    },
  ]
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Register User

Endpoint : POST /users

Request Body :

```json
{
  "username" : string,
  "password" : string,
  "fullname" : string
}
```

Response Success (201):

```json
{
  "data": "Success Registering User"
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Update User

Endpoint : PUT /users/{user_id}

Request Body :

```json
{
  "fullname" : string,
  "role" : ROLES
}
```

Response Success (201):

```json
{
  "data": "Success Updating User"
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Delete User

Endpoint : DELETE /users/{user_id}

Response Success (203):

```json
{
  "data": "Success Deleting User"
}
```

Response Failed (Unauthorize):

```json
{
  "error": "Unauthorize Credential",
  "success": "false"
}
```
