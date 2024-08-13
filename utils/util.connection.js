const dynamoose = require('dynamoose');

const initializeDynamoDB = async () => {
    try {
        if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            throw new Error('AWS Credentials missing!');
        }

        // Uncomment and use the following to connect to a real AWS DynamoDB instance
        // const dynamoDb = new dynamoose.aws.ddb.DynamoDB({
        //     credentials: {
        //         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        //         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        //     },
        //     region: process.env.AWS_REGION,
        // });

        // dynamoose.aws.ddb.set(dynamoDb);

        dynamoose.aws.ddb.local();

        const AWS = require('aws-sdk');
        const ddbClient = new AWS.DynamoDB({
            endpoint: 'http://localhost:8000',
            region: process.env.AWS_REGION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        // const response = await ddbClient.listTables().promise();
        console.log('Connected to DynamoDB');
    } catch (error) {
        console.error('Failed to initialize DynamoDB client:', error);
        throw error;
    }
};

initializeDynamoDB();
