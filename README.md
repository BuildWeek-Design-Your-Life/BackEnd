# Design Your Life - Back-End

Pitch: Based on the Design Your Life course at Standford, this app helps you figure out which activites bring you enjoyment, energy, and engagement. These clues are the first step you need to take to design your ideal ife. The journal includes an activity log and a reflection log. Activity logs record daily your main activities, and a guage to show how engaged and energized you were. Reflection logs are done once a week to record your trends, insights and suprises as to what activities work and don't work for you.

---

## API Documentation

#### NON-AUTH ENDPOINTS

| Links               | Endpoints   |
| ------------------- | ----------- |
| [POST Registration](#post-registration)      | `/api/auth/register` |
| [POST Login](#post-login)                    | `/api/auth/login`    |



### [POST] Registration

#### URL: https://design-bw.herokuapp.com/api/auth/register

Payload: an object with the following, email is optional.
```
{
	"username": "Jane",
	"password": "Doe",
    "email" : "janedoe@gmail.com"
}
```

Returns: an object with user id, username, password, and email. Password will be hashed, ignore it 😄

```
{
    "id": 1,
    "username": "Jane",
    "password": "hashed",
    "email": "janedoe@gmail.com"
}
```

### [POST] Login

#### URL: https://design-bw.herokuapp.com/api/auth/login

Payload: an object with the following, email is optional.
```
{
	"username": "Jane",
	"password": "Doe",
    "email" : "janedoe@gmail.com"
}
```

Returns: an object with a message and authentication token. Save this token to local storage(or similar), this token will be required for all CRUD requests below.

```
{
    "message": "Welcome Jane!",
    "token": "keeping it secret!"
}
```
---
___

#### AUTH ENDPOINTS
#### All EndPoints below require a token!

| Links               | Endpoints   |
| ------------------- | ----------- |
| [GET All Users](#get-users)       | `/api/users` |
| [GET User by ID](#get-user-by-id) | `/api/users/:id` |
| [GET Activity Logs](#get-activity-log)       | `/api/act` |
| [GET Activity Logs by ID](#get-activity-log-by-id)       | `/api/act/:id` |
| [GET Reflect Logs](#get-reflect-log)       | `/api/ref` |
| [GET Reflect Logs by ID](#get-reflect-log-by-id)       | `/api/ref/:id` |
| [POST Activity Logs](#post-activity-log)       | `/api/act` |
| [POST Reflection Logs](#post-reflection-log)       | `/api/ref` |


### [GET] Users

#### URL: https://design-bw.herokuapp.com/api/users

Returns: an array of objects with user id, username, and email. Null means no email for that user, password is hashed.

```
[
    {
        "id": 1,
        "username": "admin",
        "password": "hashed password",
        "email": "admin@gmail.com"
    },
    {
        "id": 2,
        "username": "admin2",
        "password": "hashed password",
        "email": null
    }
]
```
---
### [GET] Users by id

#### URL: https://design-bw.herokuapp.com/api/users/:id

Returns: an object with user id, username, password, and email. Null means no email for that user.

```
    {
        "id": 1,
        "username": "admin",
        "password": "hashed password",
        "email": "admin@gmail.com"
    }
```
---
### [GET] Activity Log

#### URL: https://design-bw.herokuapp.com/api/act

Returns: all activity logs in **an array of objects** with user id, activity, engagement, and energize
> users_act_id means which log the log belongs to, so users_act_id: 1 belongs to a user with id of 1.

```
[
    {
        "id": 1,
        "users_act_id": 1,
        "activity": "exercise",
        "engagement": 8,
        "energize": 10
    },
    {
        "id": 2,
        "users_act_id": 1,
        "activity": "swimming",
        "engagement": 5,
        "energize": 8
    },
        "id": 3,
        "users_act_id": 2,
        "activity": "programming",
        "engagement": 10,
        "energize": 9
    }
]
```
---
### [GET] Activity Log By ID

#### URL: https://design-bw.herokuapp.com/api/act/:id

Returns: all activity logs in **an array of objects** with user id, activity, engagement, and energize for a specific user
> users_act_id should be same for all returned logs as they should belong to one user.

```
[
    {
        "id": 1,
        "users_act_id": 1,
        "activity": "exercise",
        "engagement": 8,
        "energize": 10
    },
    {
        "id": 2,
        "users_act_id": 1,
        "activity": "swimming",
        "engagement": 5,
        "energize": 8
]
```
---
### [GET] Reflect Log

#### URL: https://design-bw.herokuapp.com/api/ref

Returns: all reflection logs in **an array of objects** with user id, trends, insights, and summary
> users_ref_id means which log the log belongs to, so users_ref_id: 1 belongs to a user with id of 1.

```
[
    {
        "id": 1,
        "users_ref_id": 1,
        "trends": "I felt better after exercising",
        "insights": "I feel motivated to do more each day if I exercise",
        "summary": "Based off my trends and insights, I want to keep this routine up!"
    },
    {
        "id": 2,
        "users_ref_id": 1,
        "trends": "I can hold my breath longer",
        "insights": "I like my lungs are getting stronger",
        "summary": "My cardio seems to be improving if I swim everyday"
    },
    {
        "id": 3,
        "users_ref_id": 2,
        "trends": "Getting Better at Coding",
        "insights": "I'm learning the syntax",
        "summary": null
    }
]
```
---
### [GET] Reflect Log By ID

#### URL: https://design-bw.herokuapp.com/api/ref/:id

Returns: all reflection logs in **an array of objects** with user id, trends, insights, and summary for a specified user.
> users_ref_id should be same for all returned logs as they should belong to one user.

```
[
    {
        "id": 1,
        "users_ref_id": 1,
        "trends": "I felt better after exercising",
        "insights": "I feel motivated to do more each day if I exercise",
        "summary": "Based off my trends and insights, I want to keep this routine up!"
    },
    {
        "id": 2,
        "users_ref_id": 1,
        "trends": "I can hold my breath longer",
        "insights": "I like my lungs are getting stronger",
        "summary": "My cardio seems to be improving if I swim everyday"
    },
    {
        "id": 3,
        "users_ref_id": 2,
        "trends": "Getting Better at Coding",
        "insights": "I'm learning the syntax",
        "summary": null
    }
]
```
---
### [POST] Activity Log

#### URL: https://design-bw.herokuapp.com/api/act
Payload: an object with the following, **all are required**.
> the users_act_id is to let the database know who the activity log belongs to. 
```
    {
        "users_act_id": 1,
        "activity": "programming",
        "engagement": 1,
        "energize": 1
    }
```

Returns: 

```
{
    "message": "Post Successful!"
}
```
---

### [POST] Reflect Log

#### URL: https://design-bw.herokuapp.com/api/ref
Payload: an object with the following, **all but summary are required**.
> the users_ref_id is to let the database know who the reflection log belongs to. 
```
    {
        "users_ref_id": 2,
        "trends": "Getting Better at Coding", 
        "insights": "I'm learning the syntax" , 
        "summary": "If I keep this weeks coding up I can be a developer in no time"
    }
```

Returns: 

```
{
    "message": "Post Successful!"
}
```
---
