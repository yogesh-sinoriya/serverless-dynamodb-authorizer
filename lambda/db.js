"use strict";

const AWS = require("aws-sdk");

module.exports = class DB {
  constructor(table) {
    this.table = table;
    this.client = new AWS.DynamoDB.DocumentClient({
      region: process.env.DYNAMODB_REGION,
      endpoint: process.env.DYNAMODB_ENDPOINT
    });
  }

  create(data) {
    return new Promise(resolve => {
      this.client.put(
        {
          TableName: this.table,
          Item: data
        },
        (error, result) => {
          if (error) {
            console.log(`create ${this.table} ERROR=${error.stack}`);
            resolve({
              statusCode: 400,
              error: `Could not create ${this.table}`
            });
          } else {
            // console.log(`create${this.table} result=${JSON.stringify(result)}`);
            resolve({
              statusCode: 200,
              data: result,
              message: `${this.table} created succefully.`
            });
          }
        }
      );
    });
  }

  find(query = null) {
    return new Promise(resolve => {
      this.client.scan(
        {
          TableName: this.table,
          Key: query
        },
        (error, result) => {
          if (error) {
            console.log(`fetch ${this.table} ERROR=${error.stack}`);
            resolve({
              statusCode: 400,
              error: `Could not fetch ${this.table}`
            });
          } else {
            // console.log(`fetch ${this.table} result=${JSON.stringify(result)}`);
            resolve({
              statusCode: 200,
              data: result.Items,
              message: `${this.table} fethed succefully.`
            });
          }
        }
      );
    });
  }

  findOne(query) {
    console.log({
      TableName: this.table,
      Key: query
    });

    return new Promise(resolve => {
      this.client.get(
        {
          TableName: this.table,
          Key: query
        },
        (error, result) => {
          if (error) {
            console.log(`fetch ${this.table} ERROR=${error.stack}`);
            resolve({
              statusCode: 400,
              error: `Could not fetch ${this.table}`
            });
          } else {
            // console.log(`fetch ${this.table} result=${JSON.stringify(result)}`);
            resolve({
              statusCode: 200,
              data: result.Item || {},
              message: `${this.table} fethed succefully.`
            });
          }
        }
      );
    });
  }

  update(key, data) {
    const timestamp = new Date().getTime();
    let params = {
      TableName: this.table,
      Key: key,
      ExpressionAttributeNames: {},
      ExpressionAttributeValues: {},
      ReturnValues: "ALL_NEW"
    };

    let updateExp = "SET";
    for (let k in data) {
      params.ExpressionAttributeNames[`#new_${k}`] = k;
      params.ExpressionAttributeValues[`:${k}`] = data[k];
      updateExp += ` #new_${k} = :${k},`;
    }
    params.UpdateExpression = updateExp.slice(0, updateExp.length - 1);

    return new Promise(resolve => {
      this.client.update(params, (error, result) => {
        if (error) {
          console.log(`create ${this.table} ERROR=${error.stack}`);
          resolve({
            statusCode: 400,
            error: `Could not update ${this.table}`
          });
        } else {
          // console.log(`update ${this.table} result=${JSON.stringify(result)}`);
          resolve({
            statusCode: 200,
            data: result || {},
            message: `${this.table} updated succefully.`
          });
        }
      });
    });
  }

  delete(query) {
    return new Promise(resolve => {
      this.client.delete(
        {
          TableName: this.table,
          Key: query
        },
        (error, result) => {
          if (error) {
            console.log(`delete ${this.table} ERROR=${error.stack}`);
            resolve({
              statusCode: 400,
              error: `Could not delete ${this.table}`
            });
          } else {
            // console.log(`delete ${this.table} result=${JSON.stringify(result)}`);
            resolve({
              statusCode: 200,
              message: `${this.table} deleted succefully.`
            });
          }
        }
      );
    });
  }
};
