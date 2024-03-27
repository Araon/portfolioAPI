### Endpoints

#### 1. Add Trade

* **URL:** `/addTrade`
* **Method:** POST
* **Request Body:**
```json
{
  "stockId": "string",
  "type": "string",
  "quantity": integer,
  "price": number,
  "date": "string",
  "username": "string"
}
```
* **Success Response:**
	* Code: 201 Created
	* Content: `{ "success": true, "data": { "transactionId": "string" } }`
* **Error Response:**
	* Code: 400 Bad Request
	* Content: `{ "success": false, "message": "string" }`

#### 2. Get Portfolio

* **URL:** `/portfolio`
* **Method:** GET
* **Success Response:**
	* Code: 200 OK
	* Content: `{ "success": true, "data": [ { "username": "string", "stocks": [ { "id": "string", "name": "string", "trades": [ { "date": "string", "type": "string", "quantity": integer, "price": number } ] } ], "portfolioDetails": { "total_stocks": integer } } ] }`
* **Error Response:**
	* Code: 400 Bad Request
	* Content: `{ "success": false, "message": "string" }`

#### 3. Get Holdings

* **URL:** `/portfolio/holdings`
* **Method:** GET
* **Success Response:**
	* Code: 200 OK
	* Content: `{ "success": true, "data": [ { "stockId": "string", "quantity": integer, "avg_buy_price": number } ] }`
* **Error Response:**
	* Code: 400 Bad Request
	* Content: `{ "success": false, "message": "string" }`

#### 4. Update Trade

* **URL:** `/updateTrade`
* **Method:** PUT
* **Request Body:**
```json
{
  "transactionId": "string",
  "quantity": integer,
  "price": number
}
```
* **Success Response:**
	* Code: 200 OK
	* Content: `{ "success": true, "data": { "transactionId": "string", "updatedTrade": { "date": "string", "type": "string", "quantity": integer, "price": number } } }`
* **Error Response:**
	* Code: 400 Bad Request
	* Content: `{ "success": false, "message": "string" }`

#### 5. Remove Trade

* **URL:** `/removeTrade`
* **Method:** DELETE
* **Request Body:**
```json
{
  "transactionId": "string",
  "quantity": integer,
  "price": number
}
```
* **Success Response:**
	* Code: 200 OK
	* Content: `{ "success": true, "data": { "transactionId": "string", "removedTrade": { "date": "string", "type": "string", "quantity": integer, "price": number } } }`
* **Error Response:**
	* Code: 400 Bad Request
	* Content: `{ "success": false, "message": "string" }`

### Notes

* All dates should be in ISO 8601 format (e.g. "2024-03-27T00:00:00.000Z").
* The `type` field for trades should be either "buy" or "sell".
* The `stockId` field should be a unique identifier for each stock (e.g. a ticker symbol).
* The `username` field should be a unique identifier for each user.
* The `transactionId` field should be a unique identifier for each trade.
* The `avg_buy_price` field in the holdings response should be calculated as the average of all buy trades for that stock.
* The `total_stocks` field in the portfolio response should be the total number of unique stocks in the portfolio.

