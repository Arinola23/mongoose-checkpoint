const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
     name: {
        type: String,
        required: true
     },
     age: {
        type: Number,
        required:[true, 'enter age ']
     },
     favoriteFoods: {
        type: [String],
        required: true
     }
},{
    timestamps: true
})

module.exports = mongoose.model('Person', personSchema);