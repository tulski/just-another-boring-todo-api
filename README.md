# tudoku API

REST API made with Node.js, express, jwt and mongoose.<br>A back-end service of [tudoku](https://github.com/tulski/tudoku) app.<br>
Tbh it's just another boring todo API. 🤫<br>

[https://tudoku-api.herokuapp.com/](https://tudoku-api.herokuapp.com/)

## Open Endpoints

Open endpoints require no Authentication. Both of these endpoints returns valid api token.

* Sign in : `PUT  /auth/`
* Sign up : `POST /auth/`

| User Model  |        |
|-------------|--------|
| username    | string |
| email       | string |
| password    | string |

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the *Sign in* or *Sign up* endpoints above.

### Items controllers

CRUD endpoints for viewing and manipulating items.

* Get many : `GET /api/item/`
* Create one : `POST /api/item/`
* Get one : `GET /api/item/:id/`
* Update one : `PUT /api/item/:id/`
* Delete one : `DELETE /api/item/:id/`

| Item Model   |                           |
|--------------|---------------------------|
| title        | string                    |
| description  | string                    |
| status       | 'todo' │ 'doing' │ 'done' |
| categories   | string[]                  |
