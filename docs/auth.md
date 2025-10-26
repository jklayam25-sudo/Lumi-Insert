# Auth API Spec

## Login User

Endpoint : POST /authentications

Request Body :

```json
{
  "username" : string,
  "password" : string,
}
```

Response Success (200):

```json
{
  "success": "true"
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Logout User

Endpoint : DELETE /authentications

Request Header :

- Cookie : Requester credential

Response Success (203):

```json
{
  "success": "true"
}
```

Response Failed :

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```
