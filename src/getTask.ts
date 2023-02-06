const AWS  = require('aws-sdk');

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Task } from './types/Task';

const getTask = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const id: string | null = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;

        if(!id){
            return {
                statusCode: 404,
                body: JSON.stringify({ error: true }),
            };
        }

        const result = await dynamodb.get({
            TableName: 'TaskTable',
            Key: {
                id
            }
        }).promise()

        const task: Task = result.Item as Task;

        return {
            statusCode: 200,
            body: JSON.stringify({task})
        }
}

module.exports = {
    getTask
}