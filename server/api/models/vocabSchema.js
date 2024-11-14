const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,  // Corrected typo here
            required: [true, 'English word cannot be blank']  // Corrected 'required' here
        },
        german: {
            type: String,  // Corrected typo here
            required: [true, 'German word cannot be blank']  // Corrected 'required' here
        }
    },
    { collection: 'vocab' }
);

module.exports = mongoose.model('Vocab', VocabSchema);
