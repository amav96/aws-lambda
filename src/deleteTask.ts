const AWS  = require('aws-sdk');

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";


const deleteTask = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id: string | null = event.pathParameters && event.pathParameters.id ? event.pathParameters.id : null;

    if(!id){
        return {
            statusCode: 404,
            body: JSON.stringify({ error: true }),
        };
    }

    await dynamodb.delete({
        TableName: 'TaskTable',
        Key: {
            id
        }
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Task deleted'
        })
    }
}

module.exports = {
    deleteTask
}