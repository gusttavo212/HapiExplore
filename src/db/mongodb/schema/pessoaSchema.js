const mongoose = require('mongoose');

const PessoaSchema = new mongoose.Schema({
    name: String,
    sex: String,
    age: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,        
    },
});

module.exports = mongoose.model('Pessoa', PessoaSchema)