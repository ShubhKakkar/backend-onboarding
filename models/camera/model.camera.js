const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const cameraSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        default: uuidv4,
    },
    userId: {
        type: String,
        required: true,
        index: {
            global: true,
            project: true,
            name: 'UserIdIndex',
            unique: true,
        }
    },
    storeId: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        default: 'test-camera'
    },
    url: {
        type: String,
    },
    features: {
        type: Array,
        schema: [String],
    },
}, {
    timestamps: true,
});

module.exports = dynamoose.model('Camera', cameraSchema);