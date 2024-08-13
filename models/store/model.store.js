const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const storeSchema = new dynamoose.Schema({
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
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = dynamoose.model('Store', storeSchema);