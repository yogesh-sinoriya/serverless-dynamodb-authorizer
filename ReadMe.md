<!--
title: 'AWS Serverless offline REST API with DynamoDB and Authorization support example in NodeJS'
description: 'This example demonstrates how to run a service locally, using the ''serverless-offline'' plugin. It provides a REST API to manage Todos stored in DynamoDB.'
layout: Doc
platform: AWS
language: nodeJS
authorLink: 'https://github.com/yogesh-sinoriya'
authorName: 'Yogesh Sinoriya'
authorAvatar: 'https://avatars3.githubusercontent.com/u/31385457?s=460&v=4'
-->

# Offline serverless REST API with DynamoDB and Authorization support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage Todos stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Setup

```bash
npm install
```

## Run service offline

```bash
npm start
```

## Usage

We have setup the custom authorizer on request. So need to add valid auth tokens in header as:
Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a

```bash
Authorized Token  : Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a
Unauthorized Token: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50b
```

You can create, retrieve, update, or delete todos with the following commands:

### Create a Todo

```bash
curl -X POST \
  http://localhost:3000/todos \
  -H 'Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a' \
  -d '{ "text":"My Todo Task"}' | json_pp
```

Example Result:

```bash
{
   "message" : "todos created succefully.",
   "data" : {
      "checked" : false,
      "id" : "29d0ab90-b452-11e9-83cc-9b716201579f",
      "text" : "My Todo Task",
      "createdAt" : 1564660951016,
      "updatedAt" : 1564660951016
   }
}
```

### List all Todos

```bash
curl -X GET \
  http://localhost:3000/todos \
  -H 'Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a'
```

Example output:

```bash
{
   "data" : [
      {
         "checked" : false,
         "text" : "My Todo Task",
         "id" : "29d0ab90-b452-11e9-83cc-9b716201579f",
         "updatedAt" : 1564660059337,
         "createdAt" : 1564660059337
      }
   ],
   "message" : "todos fethed succefully."
}

```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X GET \
  http://localhost:3000/todos/<id> \
  -H 'Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a' \
```

Example Result:

```bash
{
    "data": {
        "checked": false,
        "createdAt": 1564660059337,
        "text": "My Todo Task",
        "id": "29d0ab90-b452-11e9-83cc-9b716201579f",
        "updatedAt": 1564660059337
    },
    "message": "todos fethed succefully."
}
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT \
  http://localhost:3000/todos/<id> \
  -H 'Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a' \
  -d '{ "text": "My Todo Task update", "checked": true}'
```

Example Result:

```bash
{
    "data": {
        "Attributes": {
            "checked": true,
            "id": "246d4690-b452-11e9-83cc-9b716201579f",
            "text": "My Todo Task update",
            "updatedAt": 1564661297180
        }
    },
    "message": "todos updated succefully."
}
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE \
  http://localhost:3000/todos/<id> \
  -H 'Authorization: Bearer 4674cc54-bd05-11e7-abc4-cec278b6b50a' \
```

Example Result:

```bash
{
    "message": "todos deleted succefully."
}
```
