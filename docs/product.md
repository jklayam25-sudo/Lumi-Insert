# General Product API Spec

### Use case for storage DB, check transactions.md for transaction purpose!

## Get All Products Pagination

Endpoint : GET /products?last={id or "first"}&limit={length of row}

Response Success (200):

```json
{
  "data" : {
    "product_data": [
      {
        "product_id" : string,
        "product_name" : string,
        "product_quantity" : number,
        "product_price" : number,
      },
      {
        "product_id" : string,
        "product_name" : string,
        "product_quantity" : number,
        "product_price" : number,
      }, ...length of row
    ],
    "total_rows" : number
  }
  
}
```

Response Failed :

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```
## Get Product Stock

Endpoint : GET /products/{product_id}/stock

Response Success (200):

```json
{
  "data" : {
    "product_quantity" : number,
  }
  
}
```

Response Failed :

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Get Products by matching keyword

Endpoint : GET /products/search?keyword={product_name}

Response Success (200):

```json
{
  "data" : [
    {
      "product_id" : string,
      "product_name" : string,
      "product_quantity" : number,
      "product_price" : number,
    },
    {
      "product_id" : string,
      "product_name" : string,
      "product_quantity" : number,
      "product_price" : number,
    }, ...
  ]
}
```

Response Failed :

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Add Product

Endpoint : POST /products

Request Header :

- Cookie : Requester must be **SUPERADMIN**

Request Body :

```json
{
  "product_id" : string,
  "product_name" : string,
  "product_quantity" : number,
  "product_price" : number,
}
```

Response Success (201):

```json
{
  "data" : {
    "product_id" : string,
    "product_name" : string,
    "product_quantity" : number,
    "product_price" : number,
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

## Update Product

Endpoint : PUT /product/{product_id}

Request Header :

- Cookie : Requester must be **SUPERADMIN**

Request Body :

```json
{
  "product_id" : string,
  "product_name" : string,
  "product_quantity" : number,
  "product_price" : number,
}
```

Response Success (200):

```json
{
  "data" : {
    "product_id" : string,
    "product_name" : string,
    "product_quantity" : number,
    "product_price" : number,
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

## Delete Product

Endpoint : DELETE /product/{product_id}

Request Header :

- Cookie : Requester must be **SUPERADMIN**

Response Success (203):

```json
{
  "data": "Success Deleting Product"
}
```

Response Failed (Unauthorize):

```json
{
  "error": "Unauthorize Credential",
  "success": "false"
}
```
