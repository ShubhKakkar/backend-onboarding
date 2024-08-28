const dynamoose = require('dynamoose');
const { v4: uuidv4 } = require('uuid');

const businessSchema = new dynamoose.Schema({
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
    type: {
        type: String,
        required: true,
    },
    locations: {
        type: Array,
        schema: [String],
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = dynamoose.model('Business', businessSchema);