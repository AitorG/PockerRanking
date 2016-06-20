# Poker Ranking API

# Index:

1. [UserRoutes](#user-routes)
    * [Create User](#create-user)
    * [Get Users](#get-users)
    * [Delete User](#delete-user)
    * [Change Username](#change-username)
    * [Change Password](#change-password)
    * [Login](#login)

## User Routes
### Create User
```
route: '/user',
method: POST,
auth: false,
input: {
  username: String,
  password: String,
  admin: Boolean
},
output: {
  username: String,
  password: String,
  admin: Boolean
}
```
### Get Users
```
route: '/user',
method: GET,
auth: false,
input: none,
output: [
  {
    id: String,
    username: String,
    admin: Boolean,
    points: Number,
    lastGame: Date
  }
]
```
### Delete User
```
route: '/user',
method: DELETE,
auth: true,
input: none,
output: {
  n: Number,
  ok: Number,
}
```
### Change Username
```
route: '/user/changeusername',
method: PUT,
auth: true,
input: {
  username: String
},
output: {
  _id: String,
  username: String,
  password: String,
  admin: Boolean,
  points: Number,
  lastGame: Date
}
```
### Change Password
```
route: '/user/changepassword',
method: PUT,
auth: true,
input: {
  newPassword: String,
  oldPassword: String,
},
output: {
  _id: String,
  username: String,
  password: String,
  admin: Boolean,
  points: Number,
  lastGame: Date
}
```
### Login
```
route: '/auth',
method: POST,
input: {
  username: String,
  password: String,
},
output: {
  user: {
    _id: String,
    username: String,
    admin: Boolean,
    points: Number,
    lastGame: Date
  },
  token: String
}
```
