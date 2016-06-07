# Poker Ranking API

# Index:

1. [UserRoutes](#user-routes)
    * [Create User](#create-user)

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
