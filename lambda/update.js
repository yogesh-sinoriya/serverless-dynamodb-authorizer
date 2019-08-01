"use strict";

const uuid = require("uuid");
const DB = require("./db");

const db = new DB(process.env.DYNAMODB_TABLE);

module.exports.handle = async event => {
  const timestamp = new Date().getTime();
  let data = JSON.parse(event.body);
  data.updatedAt = timestamp;

  let result = await db.update({ id: event.pathParameters.id }, data);

  if (result.statusCode !== 200) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: result.error })
    };
  }
  const response = {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: result.data, message: result.message })
  };
  return response;
};
