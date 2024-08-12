const dynamoose = require('dynamoose');

const initializeDynamoDB = () => {
    try {
        if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
            throw new Error('AWS Credentials missing!');
        }

        const dynamoDb = new dynamoose.aws.ddb.DynamoDB({
            "credentials": {
                "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
                "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
            },
            "region": process.env.AWS_REGION
        });

        dynamoose.aws.ddb.set(dynamoDb);

        console.log('DynamoDB client initialized successfully');
        return dynamoDb;
    } catch (error) {
        console.error('Failed to initialize DynamoDB client:', error);
        throw error;
    }
};

const dynamoDb = initializeDynamoDB();
