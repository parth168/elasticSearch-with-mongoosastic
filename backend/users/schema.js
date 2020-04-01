const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const mongoosastic = require('mongoosastic');
const { models } = require('./constant');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        es_indexed: true
    },
    email: {
        type: String,
        es_indexed: true
    },
    city: {
        type: String,
        es_indexed: true
    },
    __v: {
      type: Number,
      select: false
    }
});

UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

exports.User = mongoose.model(models.user, UserSchema);


