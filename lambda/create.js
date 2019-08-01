"use strict";

const uuid = require("uuid");
const DB = require("./db");

const db = new DB(process.env.DYNAMODB_TABLE);

module.exports.handle = async event => {
  const timestamp = new Date().getTime();
  let data = JSON.parse(event.body);

  data.id = uuid.v1();
  data.checked = false;
  data.createdAt = timestamp;
  data.updatedAt = timestamp;

  let result = await db.create(data);

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
    body: JSON.stringify({ data: data, message: result.message })
  };
  return response;
};
