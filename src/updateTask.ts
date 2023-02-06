
const AWS  = require('aws-sdk');

const middy  = require('@middy/core');
const jsonBodyParser = require("@middy/http-json-body-parser");
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { TaskWithOutId } from './types/Task';

const updateTask = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const id: string | null = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;

    if(!id || !event.body || typeof event.body === 'string'){
        return {
            statusCode: 404,
            body: JSON.stringify({ error: true }),
        };
    }

    const updateTask: TaskWithOutId = event.body
    const {done, title, description } = updateTask

    await dynamodb.update({
        TableName: 'TaskTable',
        Key: {id},
        UpdateExpression: 'set done = :done, title = :title, description = :description',
        ExpressionAttributeValues: {
            ':done': done,
            ':title': title,
            ':description': description
        },
        ReturnValues: 'ALL_NEW'
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'update successfully'})
    }

}

module.exports = {
    updateTask: middy(updateTask).use(jsonBodyParser())
}