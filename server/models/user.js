var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

//I think the models are mostly pretty self-explanatory, but I tried to make everything
//possible reference everything else as an array of IDs, as that created issues
//on the last project. Doing it this way on this project turned a couple of
//90 minute issues into 5 minute ones.
var schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);