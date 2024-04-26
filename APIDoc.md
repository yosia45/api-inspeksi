# Inspection API Documentation

## Endpoints

List of available endpoints:

- `GET /categories`
- `GET /categories/:id`
- `POST /categories`
- `PUT /categories/:id`
- `PATCH /categories/:id`
- `GET /questions`
- `GET /questions/:id`
- `POST /questions`
- `PUT /questions/:id`
- `PATCH /questions/:id`
- `GET /locations`
- `GET /locations/:id`
- `POST /locations`
- `PUT /locations/:id`
- `PATCH /locations/:id`
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `GET /inspections`
- `GET /inspections/:id`
- `POST /inspections`
- `PUT /inspections/:id`
- `PATCH /inspections/:id`
- `POST /inspectionfiles`
- `GET /logs`
- `GET /answers`
- `GET /answers/:id`
- `POST /answers`
- `PUT /answers/:id`
- `PATCH /answers/:id`
- `GET /inspectors`
- `GET /inspectors/:id`
- `POST /inspectors`
- `PUT /inspectors/:id`
- `PATCH /inspectors/:id`

&nbsp;

## 1. GET /categories

#### Descriptions:

- Get all question categories.

#### Request

- Query (Not Required)

```json
{
    "name": String,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "categories": [
            {
                "id": Integer,
                "name": String,
                "isDeleted": Integer,
            },
            ...
        ]
    }
}
```

## 2. GET /categories/:id

#### Descriptions:

- Get question category based on id.

#### Request

- Params:

```json
{
    "id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "categoryById": {
            "id": Integer,
            "name": String,
            "createdBy": String,
            "modifiedBy": String,
            "isDeleted": Integer,
            "createdAt": Date,
            "updatedAt": Date,
        }
    }
}
```

OR

_404 - Not Found_

```json
{
  "message": "Server Violation: Category not found"
}
```

## 3. POST /categories

#### Descriptions:

- Add new question category.

#### Request

- Body:

```json
{
    "name": String,
}
```

#### Response

_201 - Created_

- Body:

```json
{
    "status": "success",
    "message": "New category success to add",
    "data": {
        "createdCategory": Integer,
    }

}
```

_400 - Bad Request_

```json
{
  "message": "Server Violation: Category name is required"
}
```

## 4. PUT /categories/:id

#### Descriptions:

- Edit question category based on id.

#### Request

- Params

```json
{
    "id": Integer,
}
```

- Body:

```json
{
    "name": String,
}
```

#### Response

_200 - OK_

- Body:

```json
{
  "status": "success",
  "message": "Category editing success"
}
```

_400 - Bad Request_

- Body:

```json
{
  "message": "Server Violation: Category name is required"
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Category not found"
}
```

## 5. PATCH /categories/:id

#### Description

- Delete (Soft) category based on id.

#### Request

- Params

```json
{
    "id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
  "status": "success",
  "message": "Category deleting success"
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Category not found"
}
```

## 6. GET /questions

#### Descriptions:

- Get all question questions.

#### Request

- Query (Not Required)

```json
{
    "name": String,
    "question_category_id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "questions": [
            {
                "id": Integer,
                "name": String,
                "question_category_id": Integer,
                "isDeleted": Integer,
            },
            ...
        ]
    }
}
```

## 7. GET /questions/:id

#### Descriptions:

- Get an question based on id.

#### Request

- Params

```json
{
    "id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "questionById": {
            "id": Integer,
            "name": String,
            "question_category_id": Integer,
            "createdBy": String,
            "modifiedBy": String,
            "isDeleted": Integer,
            "createdAt": Date,
            "updatedAt": Date,
        }
    }
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Question not found"
}
```

## 8. POST /questions

#### Descriptions:

- Add new questions.

#### Request

- Body:

```json
{
    "name": String,
    "question_category_id": Integer,
}
```

#### Response

_201 - Created_

- Body:

```json
{
    "status": "success",
    "message": "New question success to add",
    "data":{
        "createdQuestion": Integer,
    }
}
```

_400 - Bad Request_

- Body:

```json
{
  "message": "Server Violation: Question is required"
}
```

OR

```json
{
  "message": "Server Violation: Question Category is required"
}
```

## 9. PUT /questions/:id

#### Descriptions:

- Edit an question based on id.

#### Request

- Params:

```json
{
    "id": Integer,
}
```

- Body:

```json
{
    "name": String,
    "question_category_id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
  "status": "success",
  "message": "Question editing success"
}
```

_400 - Bad Request_

- Body:

```json
{
  "message": "Server Violation: Question is required"
}
```

OR

```json
{
  "message": "Server Violation: Question Category is required"
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Question not found"
}
```

## 10. PATCH /questions/:id

#### Descriptions:

- Delete (Soft) question based on id.

#### Request

- Params

```json
{
    "id" : Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
  "status": "success",
  "message": "Question deleting success"
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Question not found"
}
```

## 11. GET /locations

#### Descriptions:

- Get all locations.

#### Request

- Query (Not Required)

```json
{
    "name": String,
}
```

#### Response

- Body:

```json
{
    "status": "success",
    "data": {
        "locations": [
            {
                "id": Integer,
                "name": String,
                "isDeleted": Integer
            },
            ...
        ]
    }
}
```

## 12. GET /locations/:id

#### Descriptions:

- Get a location based on id.

#### Request

- Params

```json
{
    "id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "id": Integer,
        "name": String,
        "createdBy": String,
        "modifiedBy": String,
        "isDeleted": Integer,
        "createdBy": String,
        "ModifiedBy": String
    }
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Location not found"
}
```

## 13. POST /locations

#### Descriptions:

- Add a new location.

#### Request

- Body:

```json
{
    "name": String
}
```

#### Response

_201 - Created_

- Body:

```json
{
    "status": "success",
    "message": "New category success to add",
    "data": {
        "createdLocation": Integer
    }
}
```

_400 - Bad Request_

- Body:

```json
{
  "message": "Server Violation: Location name is required"
}
```

## 14. PUT /locations/:id

#### Descriptions:

- Edit an location based on id.

#### Request

- Params:

```json
{
    "id": Integer
}
```

- Body:

```json
{
    "name": String
}
```

#### Response

_200 - OK_

- Body:

```json
{
  "status": "success",
  "message": "Location editing success"
}
```

_400 - Bad Request_

- Body:

```json
{
  "message": "Server Violation: Location name is required"
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Location not found"
}
```

## 15. PATCH /locations/:id

#### Descriptions:

- Delete (Soft) a location based on id.

#### Request

- Params

```json
{
    "id": Integer
}
```

#### Response

_200 - OK_

- Body:

```json
{
  "status": "success",
  "message": "Location deleting success"
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: Location not found"
}
```

## 16. GET /users (Temporary API)

#### Descriptions:

- Get all users from database.

#### Request

- Query (Not Required)

```json
{
    "name": String,
    "nopeg": String,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "users": [
            {
                "id": Integer,
                "name": String,
                "nopeg": String,
                "isDeleted": Integer,
            }
        ]
    }
}
```

## 17. GET /users/:id (Temporary API)

#### Descriptions:

- Get a user data based on id.

#### Request

- Params

```json
{
    "id": Integer,
}
```

#### Response

_200 - OK_

- Body:

```json
{
    "status": "success",
    "data": {
        "userById": {
            "id": Integer,
            "name": String,
            "isDeleted": Integer,
            "createdAt": Date,
            "updatedAt": Date
        }
    }
}
```

_404 - Not Found_

- Body:

```json
{
  "message": "Server Violation: User not found"
}
```

## 18. POST /users (Temporary API)

#### Descriptions:

- Add a new user.

#### Request

- Body

```json
{
    "name": String,
    "nopeg": String
}
```

#### Response

_201 - Created_

- Body

```json
{
    "status": "success",
    "message": "New user success to add",
    "data":{
        "createdUser": Integer
    }
}
```

_400 - Bad Request_

- Body

```json
{
    "message": "User name is required"
}
```
OR
```json
{
    "message": "Nopeg is required"
}
```

## 19. PUT /users/:id (Temporary API)

#### Descriptions:

- Edit an user data based on id.

#### Request

- Params

```json
{
    "id": Integer
}
```

- Body

```json
{
    "name": String,
    "nopeg": String
}
```

#### Response

_200 - OK_

- Body

```json
{
    "status": "success",
    "message": "User editing success"
}
```

_400 - Bad Request_

- Body

```json
{
    "message": "Server Violation: User name is required"
}
```
OR
```json
{
    "message": "Server Violation: Nopeg is required"
}
```

_404 - Not Found_

- Body

```json
{
    "message": "Server Violation: User not found"
}
```

## 20. GET /inspections

#### Descriptions:

- Get all mine-inspections data from database.

#### Request

- Query (Not Required)

```json
{
    "lokasi_id": Integer,
    "group": String,
    "shift": Integer,
}
```

#### Response

_200 - OK_

- Body

```json
{
    "status": "success",
    "data": [
        {
            "id": Integer,
            "nopeg": String,
            "lokasi_id": Integer,
            "group": String,
            "shift": Integer,
            "time": Time,
            "date": Date,
            "isDeleted": Integer
        }
    ]
}
```

## 21. GET /inspections/:id

#### Descriptions

- Get a data from mine-inspection based on Id.

#### Request

- Params

```json
{
    "id": Integer
}
```

#### Response

_200 - OK_

- Body

```json
{
    "status": "success",
    "data": {
        "mineInspectionById": {
            "id": Integer,
            "nopeg": String,
            "lokasi_id": Integer,
            "group": String,
            "shift": Integer,
            "time": Time,
            "date": Date,
            "isDeleted": Integer,
            "createdAt": Date,
            "updatedAt": Date
        }
    }
}
```

_404 - Not Found_

- Body

```json
{
    "message": "Server Violation: Mine Inspection not found"
}
```

## 22. POST /inspections

#### Descriptions:

- Add a new mine-inspection data.

#### Request

- Body

```json
{
    "lokasi_id": Integer, 
    "group": String, 
    "shift": Integer,
    "time": String, 
    "date": String
}
```

#### Note
- Time and date data received sample: Wed Apr 17 2024 11:25:13 GMT+0700 (Western Indonesia Time)

#### Response

_201 - Created_

- Body

```json
{
    "status": "success",
    "message": "New mine inspection success to add",
    "data":{
        "createdMineInspection": Integer
    }
}
```

_400 - Bad Request_

- Body

```json
{
    "message": "Server Violation: Lokasi_Id is required"
}
```
OR
```json
{
    "message": "Server Violation: Group is required"
}
```
OR
```json
{
    "message": "Server Violation: Shift is required"
}
```
OR
```json
{
    "message": "Server Violation: Time is required"
}
```
OR
```json
{
    "message": "Server Violation: Date is required"
}
```

## 23. PUT /inspections/:id

#### Descriptions

- Edit a mine-inspection data based on Id.

#### Request

- Params

```json
{
    "id": Integer
}
```

- Body

```json
{
    "lokasi_id": Integer, 
    "group": String, 
    "shift": Integer,
    "time": String, 
    "date": String
}
```

#### Note
- Time and date data received sample: Wed Apr 17 2024 11:25:13 GMT+0700 (Western Indonesia Time)

#### Response

_200 - OK_

- Body

```json
{
    "status": "success",
    "message": "Mine inspection editing success"
}
```

_400 - Bad Request_

- Body

```json
{
    "message": "Server Violation: Lokasi_Id is required"
}
```
OR
```json
{
    "message": "Server Violation: Group is required"
}
```
OR
```json
{
    "message": "Server Violation: Shift is required"
}
```
OR
```json
{
    "message": "Server Violation: Time is required"
}
```
OR
```json
{
    "message": "Server Violation: Date is required"
}
```

_404 - Not Found_

- Body

```json
{
    "message": "Server Violation: Mine Inspection not found"
}
```

## 24. PATCH /inspections/:id

#### Descriptions:

- Delete (Soft) a mine-inspection data based on id.

#### Request

- Params

```json
{
    "id": Integer
}
```

#### Response

_200 - OK_

- Body

```json
{
    "status": "success",
    "message": "Mine Inspection deleting success"
}
```

_404 - Not Found_

- Body

```json
{
    "message": "Server Violation: Mine Inspection not found"
}
```

## 25. POST /inspectionfiles (Temporary API)

#### Descriptions

- Uploading an file.

#### Request

- Body

```json
{
    "mine_inspection_id": Integer,
    "files": file
}
```

#### Response

_201 - Created_

```json
{
    "status": "success",
    "message": "New Inspection File success to add"
}
```