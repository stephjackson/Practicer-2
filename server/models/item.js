const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//I think the models are mostly pretty self-explanatory, but I tried to make everything
//possible reference everything else as an array of IDs, as that created issues
//on the last project. Doing it this way on this project turned a couple of
//90 minute issues into 5 minute ones.
const ItemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  bpm: {
    type: Number
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  lists: [{
    type: Schema.Types.ObjectId,
    ref: 'List'
  }],
  stats: [{
    bpm: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    }
  }]
},
  {
    timestamps: true
  }
)

const Item = mongoose.model('Item', ItemSchema);
module.exports = Item;