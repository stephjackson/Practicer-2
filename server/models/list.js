const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//I think the models are mostly pretty self-explanatory, but I tried to make everything
//possible reference everything else as an array of IDs, as that created issues
//on the last project. Doing it this way on this project turned a couple of
//90 minute issues into 5 minute ones.
const ListSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
},
  {
    timestamps: true
  }
)

const List = mongoose.model('List', ListSchema);
module.exports = List;