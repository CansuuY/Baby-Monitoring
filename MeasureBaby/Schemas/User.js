var mongoose = require('mongoose');
var UserBabyInfo = require('../Schemas/UserBabyInfo');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    babyInfo: {type: ObjectId, ref: 'babyInfoSchema' }
})

var User = mongoose.model('users', userSchema);
module.exports = User;