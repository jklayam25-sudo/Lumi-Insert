# Customer API Spec

## Get All Active Customer

Endpoint : GET /customers?last={customer_id}&limit={limit}

Response Success (200):

```json
{
  "data" : {
    "customer_data": [
      {
        "customer_id" : string,
        "customer_name" : string,
        "customer_contact" : string,
        "customer_address" : string,
        "customer_status" : string
      },
      {
        "customer_id" : string,
        "customer_name" : string,
        "customer_contact" : string,
        "customer_address" : string,
        "customer_status" : string
      },
    ],
    "total_rows": number
  } 
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Get All Inactive Customer

Endpoint : GET /customers/inactive?last={customer_id}&limit={limit}

Response Success (200):

```json
{
  "data" : {
    "customer_data": [
      {
        "customer_id" : string,
        "customer_name" : string,
        "customer_contact" : string,
        "customer_address" : string,
        "customer_status" : string
      },
      {
        "customer_id" : string,
        "customer_name" : string,
        "customer_contact" : string,
        "customer_address" : string,
        "customer_status" : string
      },
    ],
    "total_rows": number
  } 
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Search Active Customer Name by query

Endpoint : GET /customers/search?name={cust name}

Response Success (200):

```json
{
  "data" : [
    {
      "customer_name" : string,
    },
    {
      "customer_name" : string,
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

## Register Customer

Endpoint : POST /customers

Request Body :

```json
{
  "customer_name" : string,
  "customer_contact" : string,
  "customer_address" : string
}
```

Response Success (201):

```json
{
  "data" : {
      "customer_id" : string,
      "customer_name" : string,
      "customer_contact" : string,
      "customer_address" : string,
      "customer_status" : string
    },
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Update Customer

Endpoint : PUT /customers/{customer_id}

Request Body :

```json
{
  "customer_name" : string,
  "customer_contact" : string,
  "customer_address" : string,
  "customer_status" : ACTIVE/SUSPENDED,
  "customer_lat" : float,
  "customer_lng" : float
}
```

Response Success (200):

```json
{
  "data" : {
      "customer_id" : string,
      "customer_name" : string,
      "customer_contact" : string,
      "customer_address" : string,
      "customer_status" : string
    },
}
```

Response Failed (Client):

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Delete Customer

### Depreceated Endpoint

Endpoint : DELETE /customers/{customer_id}

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
