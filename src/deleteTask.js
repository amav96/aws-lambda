const AWS = require('aws-sdk');

const deleteTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const {id} = event.pathParameters;

        const result = await dynamodb.delete({
            TableName: 'TaskTable',
            Key: {
                id
            }
        }).promise()

        const task = result.Item

        return {
            status: 200,
            body: {
                message: 'Task deleted'
            }
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    deleteTask
}