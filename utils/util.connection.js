const AWS = require('aws-sdk');

const initializeDynamoDB = () => {
    try {
        if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            throw new Error('AWS Credentials missing!');
        }

        AWS.config.update({
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        console.log('DynamoDB client initialized successfully');
        return dynamoDb;
    } catch (error) {
        console.error('Failed to initialize DynamoDB client:', error);
        throw error;
    }
};

const dynamoDb = initializeDynamoDB();
