var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var List = require('../models/list');
var Item = require('../models/item')

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

router.get('/', function (req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Item.find()
    .populate('List')
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
      List.updateMany({ items: req.params.id }, { '$pull': { 'items': req.params.id } }, err => {
        if (err) { res.status(500).json({ message: 'Error deleting list item from list db array' }) };
        res.json({
          message: "Item has been removed."
        })
      })
    });
  });
});

module.exports = router;