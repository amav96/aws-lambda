
const AWS  = require('aws-sdk');
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Task } from './types/Task';

const getTasks = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
 
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb.scan({
        TableName: 'TaskTable',
    }).promise()

    const tasks : Task[] = result.Items as Task[];

    return {
        statusCode: 200,
        body: JSON.stringify(tasks)
    }
}

module.exports = {
    getTasks
}