var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

var User = require('../models/user');
var List = require('../models/list');
var Item = require('../models/item')

//Middleware for jsonwebtoken auth. Verifies the user token sent in as a param.
router.use('/', function (req, res, next) {
  jwt.verify(req.query.token, 'secret', function (err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: err
      });
    }
    next();
  })
});

//Every other route uses said middleware, for the most part.
router.get('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Item.find({ user: decoded.user._id })
    .populate('lists')
    .exec(function (err, items) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: items
      });
    });
});

//We look up a user first to ensure we can associate a created list item with a user.
router.post('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function (err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var item = new Item({
      title: req.body.itemTitle,
      time: req.body.itemTime,
      bpm: req.body.itemBpm,
      user: decoded.user._id
    });
    item.save(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(201).json({
        message: 'Saved message',
        obj: result
      });
    });
  });
});

router.get('/:itemid', (req, res, next) => {
  var decoded = jwt.decode(req.query.token);
  Item.findById(req.params.itemid, (err, theItem) => {
    if (err) {
      res.status(500).json({ message: "Item database search was bad." })
      return;
    }
    res.status(200).json({
      message: 'Success',
      obj: theItem
    });
  })
})

//Just realized I never actually used the edit routes, but they're there.
router.patch('/:id', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Item.findById(req.params.id, (err, item) => {
    console.log(item);
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!item) {
      return res.status(500).json({
        title: 'No Item Found!',
        error: { message: 'Item not found' }
      });
    }
    if (item.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: { message: 'Users do not match' }
      });
    }
    const updates = {
      title: req.body.itemTitle,
      time: req.body.itemTime,
      bpm: req.body.itemBpm
    }
    item.update(updates, (err, result) => {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated item',
        obj: result
      });
    });
  });
});

//Adds a reference to an item id to a list and vice versa.  Used for populating lists.
router.patch('/add/:listid/:itemid', (req, res, next) => {
  var decoded = jwt.decode(req.query.token);

  List.findByIdAndUpdate(req.params.listid, { '$push': { 'items': req.params.itemid } }, err => {
    if (err) {
      res.status(500).json({ message: 'Error adding item to list db array' })
      return;
    };

    Item.findByIdAndUpdate(req.params.itemid, { '$push': { 'lists': req.params.listid } }, err => {
      if (err) {
        res.status(500).json({ message: err })
        return;
      };
      res.status(200).json('Item added to list!');
    })
  })
})

//Removes a reference to a list id from an item and vice versa. Used for populating lists.
router.patch('/remove/:listid/:itemid', (req, res, next) => {
  var decoded = jwt.decode(req.query.token);

  List.findByIdAndUpdate(req.params.listid, { '$pull': { 'items': req.params.itemid } }, err => {
    if (err) {
      res.status(500).json({ message: 'Error removing item from list db array' })
      return;
    };

    Item.findByIdAndUpdate(req.params.itemid, { '$pull': { 'lists': req.params.listid } }, err => {
      if (err) {
        res.status(500).json({ message: err })
        return;
      };
      res.status(200).json('Item removed from list!');
    })
  })
})

router.delete('/:id', (req, res, next) => {
  var decoded = jwt.decode(req.query.token);
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!item) {
      return res.status(500).json({
        title: 'No Item Found!',
        error: { message: 'Item not found' }
      });
    }
    if (item.user != decoded.user._id) {
      return res.status(401).json({
        title: 'Not Authenticated',
        error: { message: 'Users do not match' }
      });
    }
    item.remove(function (err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      //We have to search for lists including the item to make sure they lose the item id.
      List.updateMany({ items: req.params.id }, { '$pull': { 'items': req.params.id } }, err => {
        if (err) { res.status(500).json({ message: 'Error deleting list item from list db array' }) };
        res.json({
          message: "Item has been removed."
        });
      });
    });
  });
});

//Stat tracking route. Right now uses default values server-side, but this could
//easily be configurable. Bumps item BPM by one on a successful 
router.put('/:itemid/track/:completed/:itemBpm', (req, res, next) => {
  var decoded = jwt.decode(req.query.token);

  if (!mongoose.Types.ObjectId.isValid(req.params.itemid)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  var itemBpm = req.params.itemBpm;
  console.log(req.params.completed);
  if (req.params.completed == 1) {
    itemBpm++;
  } else if (req.params.completed == 0) {
    itemBpm = Math.round(itemBpm * 0.9);
  } else {
    res.status(400).json({ message: "Complete variable is broken. " })
    return;
  }

  const updates = {
    bpm: itemBpm
  }

  const stats = {
    bpm: itemBpm,
    date: new Date()
  }

  Item.findByIdAndUpdate(req.params.itemid, { '$push': { 'stats': stats } }, err => {
    if (err) {
      res.json(err);
      return;
    }

    Item.findByIdAndUpdate(req.params.itemid, updates, err => {
      if (err) {
        res.json(err);
        return;
      }

      res.json({
        message: "List item updated successfully!"
      })
    })
  })
})

module.exports = router;