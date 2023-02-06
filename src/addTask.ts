
const AWS  = require('aws-sdk');
const middy  = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");
import { v4 } from "uuid";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Task } from './types/Task';


const addTask = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
   
    if(!event.body || typeof event.body === 'string'){
        return {
            statusCode: 404,
            body: JSON.stringify({ error: true }),
        };
    }

    const dynamodb = new AWS.DynamoDB.DocumentClient();
   
    const { title, description } = event.body;

    const newTask: Task = {
        id: v4(),
        title,
        description,
        createdAt: new Date().toString(),
        done: false,
    }
    console.log(newTask);
    await dynamodb.put({
        TableName: 'TaskTable',
        Item: newTask
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newTask)
    }

}

module.exports = {
    addTask: middy(addTask).use(jsonBodyParser())
}