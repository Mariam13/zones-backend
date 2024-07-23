# Zone Backend API

`NOTE: In this project, I didn't use a database. Instead, I manipulated data using a CSV file. Please let me know if it's necessary to connect a database to this project. Thanks!`

## Overview

The Zone Backend API is a Node.js application that provides endpoints to manage zones in a CSV file. Each zone is an entity that has the following attributes `id`, `name`, and `points`. This API allows users to create, delete, and fetch zones.

## Features
* **Fetch Zones** - Retrieve all zones in a standardized format
* **Create Zone** - Add a new zone with a unique ID
* **Delete Zone** - Remove an existing zone by its ID

## Technologies
* **Node.js**
* **Express**
* **fast-csv** - CSV parsing and formatting library
* **csv-parser** - CSV parsing library for reading CSV files
* **http-errors** - To create HTTP errors for Express

## Installation
### Prerequisites
* [Node.js](https://nodejs.org/en/download/) (version >= 22)
* [npm](https://www.npmjs.com/get-npm) (version >= 10)

### Steps
1. **Clone the repository:**
    ```
    git clone https://github.com/Mariam13/zones-backend.git
    cd ./zones-backend
    ```
2. **Install dependencies**
    ```
    npm install
    ```
3. **Run the application**
* Via nodemon
    ```
    npm start
    ```
* Via node
    ```
    node app
    ```

    `The application will be available at - http://localhost:3000`

    `The server will start on port 3000 by default. You can change the port by setting the 'port' environment variable.`

# API Endpoints
1. **Fetch All Zones**
   * **Endpoint:** `GET /zones`
   * **Description:** Retrieves a list of all zones
   * **Response:**
       ```
        {
            "success": true,
            "data": [
                {
                    "id": "1",
                    "name": "zone 1",
                    "points": [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
                },
            ...
            ]
        }
       ```
2. **Create a New Zone**
   * **Endpoint:** `POST /zones`
   * **Description:** Adds a new zone
   * **Request Body:**
     ```
     {
        "name": "zone 1",
        "points": [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
     }
     ```
   * **Response:**
     ```
     {
        "success": true,
        "data": {
            "id": "1",
            "name": "zone 1",
            "points": [[12.3, 12.0], [16.3, 12.0], [16.3, 8.0], [11.4, 8.7]]
        }
     }
     ```
2. **Delete a Zone**
    * **Endpoint:** `DELETE /zones/:id`
    * **Description:** Removes a zone by its ID
    * **Response Success:**
        ```
        {
           "success": true
        }
        ```
   * **Response Error:**
      ```
      {
         "error": {
            "message": "No zones were found with id ${id} to delete."
         }
      }
      ```

# Testing
The project includes unit tests for the API endpoints. The tests use Jest and Supertest.
### To run the tests
```
npm test
```

# Error Handling
All the errors besides status code will have the structure below
```
{
    "error": {
        "message": ...
    }
}
```
