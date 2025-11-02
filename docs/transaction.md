# Transactions API Spec

### Use case for transaction!

## Get All Transactions

Endpoint : GET /transactions?last={id or "first"}&limit={length of row}

Response Success (200):

```json
{
  "data" : {
    "transaction_data" : [
      {
        "transaction_id" : string,
        "transaction_customer" : string,
        "transaction_date" : string,
        "transaction_status" : string,
        "transaction_deliver" : string,
        "transaction_handler" : string,
      },
      {
        "transaction_id" : string,
        "transaction_customer" : string,
        "transaction_date" : string,
        "transaction_status" : string,
        "transaction_deliver" : string,
        "transaction_handler" : string,
      }, ...
    ],
    "total_rows": number
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

## Get specific transaction

Endpoint : GET /transactions/{trx_id}

Response Success (200):

```json
{
  "data" :
    {
      "transaction_id" : string,
      "transaction_customer" : string,
      "transaction_date" : string,
      "transaction_status" : string,
      "transaction_deliver" : string,
      "transaction_handler" : string,
      "transaction_items" : [
        {
          "transaction_id" : string,
          "product_id" : string,
          "product_name" : string,
          "product_quantity" : number,
          "product_price" : number,
        }, ...
      ]
    },
}
```

Response Failed :

```json
{
  "error" : Possible Message,
  "success" : "false"
}
```

## Add Transaction

Endpoint : POST /transactions

Request Body :

```json
{
  "transaction_customer" : string,
}
```

Response Success (201):

```json
{
  "data" : {
    "transaction_id" : string,
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

## Delete Transaction

### Change the status of transaction into cancelled

Endpoint : DELETE /transactions/{transactions_id}

Response Success (200):

```json
{
  "data" : {
      "transaction_id" : string,
      "transaction_customer" : string,
      "transaction_date" : string,
      "transaction_status" : string,
      "transaction_deliver" : string,
      "transaction_handler" : string,
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

## Add Product items to transaction

Endpoint : POST /transactions/{transactions_id}/items

Request Body :

```json
{
  "transaction_items" : [
    {
      "product_id" : string,
      "product_name" : string,
      "product_quantity" : number,
      "product_price" : number,
    }, ...
  ]
}
```

Response Success (201):

```json
{
  "data" : [
    {
      "refTransaction_id": string
    }, ...
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

## Edit Product items

Endpoint : PUT /transactions/{transactions_id}/items/{refTransaction_id}

Request Body :

```json
{
  "transaction_items" : {
      "product_quantity" : number,
    }
}
```

Response Success (200):

```json
{
  "data" : {
    "refTransaction_id" : string,
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

## Delete Product items to transaction

Endpoint : DELETE /transactions/{transactions_id}/items/{refTransaction_id}

Response Success (200):

```json
{
  "data" : {
    "refTransaction_id" : string,
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
